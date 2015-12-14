var _ = require('lodash');

var localEnvVars = {
  TITLE:      'mapdoc',
  SAFE_TITLE: 'mapdoc'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
