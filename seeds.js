var mongoose = require('./config/database');

var User = require('./models/user.js');
var Doc = require('./models/doc.js')

var users = [
  { // 0
    handle: "DunkLord",
    name:   "Bob Neverdunk"
  },
  { // 1
    handle: "MoneyMarge",
    name:   "Margaret Kalanchoe"
  }
];

var docs = [
  {
    title: "RATS",
    subject: "RODENTS",
    location: "Pasadena, CA",
    fileUrl: "http://www.google.com",
    longitude: 34,
    latitude: -118
  }
];

User.remove({}, function(err) {
  if (err) console.log(err);
  User.create(users, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + users.length  + " users.");
    }
  });
});


Doc.remove({}, function(err) {
  if (err) console.log(err);
  Doc.create(docs, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + docs.length  + " docs.");
      mongoose.disconnect();
    }
  });
});
