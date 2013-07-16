// Generated by CoffeeScript 1.6.3
var Services, fs, logger, nodprof, path, utils, _;

fs = require("fs");

path = require("path");

_ = require("underscore");

nodprof = require("../..");

utils = require("../common/utils");

logger = require("../common/logger");

Services = require("./services").Services;

exports.run = function(_arg) {
  var arg, args, config, heapFileName, mod, profFileName, services, _i, _len;
  args = _arg.args, config = _arg.config;
  if (args.length === 0) {
    require("./config").help();
  }
  services = new Services(config);
  mod = args.shift();
  process.argv = [process.argv[0]];
  process.argv.push(mod);
  for (_i = 0, _len = args.length; _i < _len; _i++) {
    arg = args[_i];
    process.argv.push(arg);
  }
  mod = path.resolve(mod);
  logger.dlog("profiling module: " + mod);
  logger.dlog("whacked argv:     " + (utils.JS(process.argv)));
  profFileName = utils.formatDate("yy-mh-dd-hh-mn-ss-prof.json");
  heapFileName = utils.formatDate("yy-mh-dd-hh-mn-ss-heap.json");
  profFileName = path.join(config.data, profFileName);
  heapFileName = path.join(config.data, heapFileName);
  if (config.profile) {
    services.profileStart();
  }
  global.nodprofProfiling = true;
  require(mod);
  process.on("exit", function() {
    if (config.profile) {
      return services.profileStop();
    }
  });
};