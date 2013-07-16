// Generated by CoffeeScript 1.6.3
var Debug, Program, Verbose, logger, pkg, utils, _;

_ = require("underscore");

pkg = require("../../package.json");

utils = require("./utils");

logger = exports;

Verbose = false;

Debug = false;

Program = pkg.name;

logger.log = function(message) {
  var date;
  date = utils.formatDate("mh/dd hh:mn:ss");
  console.log("" + Program + ": " + date + " - " + message);
};

logger.vlog = function(message) {
  if (!Verbose && !Debug) {
    return;
  }
  logger.log(message);
};

logger.dlog = function(message) {
  if (!Debug) {
    return;
  }
  logger.log(message);
};

logger.setVerbose = function(verbose) {
  Verbose = !!verbose;
};

logger.setDebug = function(debug) {
  Debug = !!debug;
};