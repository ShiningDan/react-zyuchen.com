let fs = require('fs');
let path = require('path');
let utility = require('utility');

let bundleTag = utility.md5(fs.readFileSync(path.resolve(__dirname, '../../www/static/js/bundle.js'), 'utf-8'));
let vendorTag = utility.md5(fs.readFileSync(path.resolve(__dirname, '../../www/static/js/vendor.js'), 'utf-8'));


exports.checkll = function(req, res, next) {
  if (req.cookies.vendor && req.cookies.vendor === vendorTag) {
    req.vendor = true;
  } else {
    req.vendor = false;
    req.vendorTag = vendorTag;
  }
  if (req.cookies.bundle && req.cookies.bundle === bundleTag) {
    req.bundle = true;
  } else {
    req.bundle = false;
    req.bundleTag = bundleTag;
  }
  next();
}