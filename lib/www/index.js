// Generated by CoffeeScript 1.6.3
var amod, controllers, logger, utils;

utils = require("../common/utils");

logger = require("../common/logger");

controllers = require("./controllers");

amod = angular.module("nodprof", []);

controllers(amod);
