// Generated by CoffeeScript 1.6.3
var Services, express, fs, logger, nodprof, path, services, utils;

fs = require("fs");

path = require("path");

express = require("express");

nodprof = require("../..");

utils = require("../common/utils");

logger = require("../common/logger");

services = exports;

services.Services = Services = (function() {
  function Services(config) {
    this.config = config;
  }

  Services.prototype.getFiles = function(callback) {
    return fs.readdir(this.config.data, function(err, files) {
      return callback(err, files);
    });
  };

  Services.prototype.getFile = function(fileName, callback) {
    var err;
    fileName = path.basename(fileName);
    if (!fileName.match(/.\.json$/)) {
      err = new Error("not a JSON file");
      callback(err, null);
      return;
    }
    fileName = path.join(this.config.data, fileName);
    return fs.exists(fileName, function(exists) {
      if (!exists) {
        err = new Error("file not found");
        callback(err, null);
        return;
      }
      return fs.readFile(fileName, function(err, data) {
        return callback(err, data);
      });
    });
  };

  Services.prototype.profileStart = function() {
    nodprof.profileStart();
    return logger.log("profiling started");
  };

  Services.prototype.profileStop = function() {
    var prof, profFileName;
    prof = nodprof.profileStop();
    if (prof == null) {
      return;
    }
    profFileName = utils.formatDate("yy-mh-dd-hh-mn-ss-prof.json");
    profFileName = path.join(this.config.data, profFileName);
    fs.writeFileSync(profFileName, utils.JS(prof, "utf8"));
    return logger.log("profiling stopped; results written to " + profFileName);
  };

  Services.prototype.heapSnapshot = function() {
    var heap, heapFileName;
    heap = nodprof.heapSnapshot();
    heapFileName = utils.formatDate("yy-mh-dd-hh-mn-ss-heap.json");
    heapFileName = path.join(this.config.data, heapFileName);
    fs.writeFileSync(heapFileName, utils.JS(heap, "utf8"));
    return logger.log("heap snapshot taken; results written to " + heapFileName);
  };

  return Services;

})();
