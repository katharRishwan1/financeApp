const { puppeteer, AWS, ejs, axios, moment } = require('../services/imports');
const { awsAccessKey, awsSecretKey, awsRegion } = require('../config/config');
const db = require('../models');
const config = require('../config/config')

// AWS.config.update({
//   accessKeyId: awsAccessKey,
//   secretAccessKey: awsSecretKey,
//   region: awsRegion,
// });
// const s3 = new AWS.S3();
// Conver plain text of string to object https://stackoverflow.com/a/47404106
function strToObj(str) {
  const obj = {};
  if (str && typeof str === 'string') {
    const objStr = str.match(/\{(.)+\}/g);
    eval(`obj =${objStr}`);
  }
  return obj;
}

const formatName = (fullName) => {
  // Split the name into an array of words
  const nameParts = fullName.split(' ');

  // Capitalize the first letter of each word and make the rest lowercase
  const formattedParts = nameParts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());

  // Join the formatted parts back into a single string
  const formattedName = formattedParts.join(' ');

  return formattedName;
};

module.exports = {
  getDurationSplitUp: (start_time, end_time, duration_min) => {
    try {
      const startTime = moment(start_time, 'hh:mm');
      const endTime = moment(end_time, 'hh:mm');
      const duration = moment.duration(parseInt(duration_min), 'minutes');

      const currentTime = moment(startTime);
      const slots = [];

      while (currentTime.isBefore(endTime)) {
        const currentSlot = moment(currentTime);
        slots.push(`${currentTime.format('hh:mm a')} - ${currentSlot.add(duration).format('hh:mm a')}`);
        currentTime.add(duration);
      }
      return slots;
    } catch (error) {
      return error;
    }
  },
  paginationFn: async (
    res,
    model,
    findQuery,
    perPage = 10,
    currentPage = 0,
    populateValues = null,
    sort = null,
    select = null
  ) => {
    console.log('findQuery-----', findQuery);
    try {
      const numOfLessons = await model.find(findQuery).countDocuments();

      console.log('numOfLessons', numOfLessons, sort);
      const data = await model
        .find(findQuery)
        .populate(populateValues)
        .limit(perPage)
        .skip(perPage * currentPage)
        .sort(sort)
        .select(select);
      // console.log('data-------', data);
      return {
        rows: data,
        pagination: {
          currentPage,
          pages: Math.ceil(numOfLessons / perPage),
          total: numOfLessons,
        },
      };
    } catch (error) {
      console.log('error-------', error);
      if (error.status) {
        if (error.status < 500) {
          res.clientError({
            ...error.error,
            statusCode: error.status,
          });
        } else {
          res.internalServerError({ ...error.error });
        }
      } else {
        res.internalServerError({ error });
      }
    }
  },
  findDuplicates: (arr, key) => {
    const duplicates = [];
    const seen = new Set();

    arr.forEach((item) => {
      const value = item[key];

      if (seen.has(value)) {
        duplicates.push(value);
      } else {
        seen.add(value);
      }
    });

    return duplicates;
  },
  paginationArray: async (array, perPage, currentPage) => {
    const itemsPerPage = perPage ? parseInt(perPage) : 10;
    // Get the "page" query parameter from the request
    console.log('items------per page-------', itemsPerPage);
    const page = parseInt(currentPage) || 0;
    console.log('page----------', parseInt(currentPage));
    // Calculate the starting index and ending index for the current page
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(array.length / itemsPerPage);
    const data = array.slice(startIndex, endIndex);
    return {
      rows: data,
      pagination: {
        currentPage: page || 0,
        pages: totalPages,
        total: array.length,
      },
    };
  },
  getUserEmails: async (student, model, name = false) => {
    const findUsers = await model.find({ _id: { $in: student }, isDeleted: false });
    console.log('findUsers.length--------', findUsers.length);
    let userDetails;
    if (name) {
      userDetails = findUsers.map((user) => ({ email: user.email, name: formatName(`${user.firstName} ${user.lastName}`) }));
    } else {
      userDetails = findUsers.map((user) => user.email);
    }
    return userDetails;
  },
  getSingleUserEmails: async (user, model) => {
    const findUsers = await model.findOne({ _id: user, isDeleted: false });
    return findUsers.email;
  },
  // puppeteer
  createPdfBuffer: async (html) => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    // console.log('html------------', html);
    await page.setContent(html);
    // await page.goto('https://devapi.printon.co.in/auth/invoice')
    const pdfBuffer = await page.pdf({
      // '-webkit-print-color-adjust': 'exact',
      format: 'A4',
      margin: {
        top: '50px',
        left: '20px',
        right: '20px',
      },
    });
    await browser.close();
    return pdfBuffer;
  },
 
//   uploadToS3: async (buffer) => {
//     return new Promise((resolve, reject) => {
//       const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
//       const fileName = `feesRecipt/${timestamp}.pdf`;
//       const folderName = 'mgr';
//       const params = {
//         Bucket: 'samsel',
//         Key: `${folderName}/${fileName}`,
//         Body: buffer,
//         ContentType: 'application/pdf',
//         ACL: 'public-read',
//       };
//       s3.upload(params, (err, data) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(data.Location);
//         }
//       });
//     });
//   },
  ejsRender: async (filePath, data) => {
    return new Promise((resolve, reject) => {
      ejs.renderFile(filePath, data, (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });
  },
  getUserEmailAndMobiles: async (userIds) => {
    const users = await db.portalUser.find({ _id: { $in: userIds } });
    const emails = [];
    const mobiles = [];
    users.map((user) => {
      emails.push(user?.email);
      mobiles.push(user.mobile);
    });
    return { emails, mobiles };
  },
  moveValueToFront: (array, valueToMove) => {
    const index = array.indexOf(valueToMove);
    if (index !== -1) {
      array.splice(index, 1); // Remove the value from its current position
      array.unshift(valueToMove); // Add it to the beginning of the array
    }
    return array;
  },
  formatName
};
