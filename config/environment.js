var _ = require('lodash');

var localEnvVars = {
  TITLE:      'mapdoc',
  SAFE_TITLE: 'mapdoc'
};

var superSecret = "abracadabrabro";

// Merge all environmental variables into one object.
 //module.exports = _.extend(process.env, localEnvVars);

module.exports = {
  localEnvVars: localEnvVars,
  superSecret: superSecret
};
