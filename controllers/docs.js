var Doc = require("../models/doc");

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

  doc.title      = req.body.name;
  doc.subject  = req.body.category;
  doc.location = req.body.location;

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
  docShow:   docShow,
  docIndex:  docIndex,
  docCreate: docCreate,
  docUpdate: docUpdate,
  docDelete: docDelete
}
