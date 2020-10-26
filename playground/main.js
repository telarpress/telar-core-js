const handlebars = require('handlebars');
const fs = require('fs');

const readHTMLFile = function readHTMLFile(path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
    if (err) {
      throw err;
    } else {
      callback(null, html);
    }
  });
};

readHTMLFile(`${__dirname}/index.html`, (err, html) => {
  const template = handlebars.compile(html);
  const replacements = {
    Hello: 'John Doe',
  };
  const htmlToSend = template(replacements);
  console.log(htmlToSend);
});
