'use strict';
const ip = require('ip');
const envfile = require('envfile');
const fs = require('fs');

module.exports = function () {
  let sourcePath = './docker/apache/ip/ip.env';
  let variables = {
    'XDEBUG_REMOTE_HOST': ip.address()
  };
  // noinspection Annotator
  fs.writeFile(sourcePath, envfile.stringifySync(variables), (err) => {
    if(err) {
      return console.log(err);
    }
    console.log("The env was saved!");
  });
};


