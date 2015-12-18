// Require mongoose to create a model.
var mongoose = require('mongoose');

// Create a schema of your model
var docSchema = new mongoose.Schema({
  title:     String,
  subject:   String,
  location:  String,
  fileUrl:   String,
  latitude:    Number,
  longitude:    Number
});

// Create the model using your schema.
var Doc = mongoose.model('Doc', docSchema);

// Export the model of the Fish.
module.exports = Doc;
