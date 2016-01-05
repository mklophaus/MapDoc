var Doc = require("../models/doc");

var getKeys = function(req, res, next){
  res.json({
    AMAZON_KEY_ID: process.env.AMAZON_KEY_PUBLIC,
    AMAZON_SECRET: process.env.AMAZON_SECRET_PUBLIC
  });
}

var docShow = function(req, res, next){
  var id = req.params.id;

  Doc.findById(id, function(err, doc){
    if (err) {
      res.send(err);
    }
    res.json(doc);
  });
};

var docIndex = function(req, res) {
  Doc.find({}, function(err, docs) {
    if (err) {
      res.send(err);
    }
    res.json(docs);
  });
}

var docCreate = function(req, res) {
  var doc       = new Doc();   // create a new instance of the Fish model

  doc.title      = req.body.title;
  doc.subject  = req.body.subject;
  doc.location = req.body.location;
  doc.fileUrl = req.body.fileUrl;
  doc.latitude = req.body.latitude;
  doc.longitude = req.body.longitude;
  doc.author = req.body.author;
  doc.user_id = req.body.user_id;

  doc.save(function(err, savedDoc) {
    if (err) {
      res.send(err)
    }

    res.json(savedDoc);
  });
};

var docUpdate = function(req, res) {
  var id = req.params.id;

  Doc.findById(id, function(err, doc) {

    if (err) {
      res.send(err);
    }

    if (req.body.title) doc.title = req.body.title;
    if (req.body.subject) doc.subject = req.body.subject;
    if (req.body.location) doc.location = req.body.location;

    doc.save(function(err, updatedDoc) {
      if (err) {
        res.send(err);
      }

      res.json(updatedDoc);
    });
  });
}

var docDelete = function(req, res) {
  var id = req.params.id;

  Doc.remove({"_id" : id}, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Doc deleted!'});
  });
}

// Export the function/s as JSON
module.exports = {
  getKeys:   getKeys,
  docShow:   docShow,
  docIndex:  docIndex,
  docCreate: docCreate,
  docUpdate: docUpdate,
  docDelete: docDelete
}
