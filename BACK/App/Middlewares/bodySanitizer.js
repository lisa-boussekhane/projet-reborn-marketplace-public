const sanitizer = require('sanitizer');

const bodySanitizer = (req, res, next) => {
  if (req.body) {
    for (let property in req.body) {
      console.log('coucou je sanitize les données');
      console.log(property + ' = ' + req.body[property]);
      req.body[property] = sanitizer.escape(req.body[property]);
      console.log(`After sanitization: ${property} = ${req.body[property]}`);
    }
  }
  next();
};

module.exports = bodySanitizer;
