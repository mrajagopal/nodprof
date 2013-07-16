// Generated by CoffeeScript 1.6.3
var fs, path, runInner, runOuter;

fs = require("fs");

path = require("path");

exports.run = function(times) {
  var i, _i, _results;
  console.log("running " + __filename);
  _results = [];
  for (i = _i = 0; 0 <= times ? _i <= times : _i >= times; i = 0 <= times ? ++_i : --_i) {
    _results.push(setTimeout((function() {
      return runOuter(times);
    }), 100 * i));
  }
  return _results;
};

runOuter = function(times) {
  return runInner(times);
};

runInner = function(times) {
  var entries, i, _i, _results;
  _results = [];
  for (i = _i = 0; 0 <= times ? _i <= times : _i >= times; i = 0 <= times ? ++_i : --_i) {
    _results.push(entries = fs.readdirSync("."));
  }
  return _results;
};

if (require.main === module || global.nodprofProfiling) {
  exports.run(50);
}
