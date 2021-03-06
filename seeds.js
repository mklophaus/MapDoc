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
    author: "Patti Konlowsky",
    title: "Bananas are dying",
    subject: "Fruit of the earth",
    location: "South America",
    fileUrl: "http://www.google.com",
    longitude: "-55.491477",
    latitude: "-8.783195"
  },
 {
    longitude: "105.318756",
  latitude: "61.524010",
  author: "Martin Finola",
  title: "Vegetation in Moscow",
  subject: "Plants",
  location: "Russia",
  fileUrl: "http://www.google.com"

},

 {
    longitude: "78.962880",
    latitude: "20.593684",
    author: "Dr. Shelly Saturn",
    title: "Marshes",
    subject: "Land",
    location: "India",
    fileUrl: "http://www.google.com"
  },
   {
      longitude: -118.144516,
    latitude: 34.147785,
    author: "Bob Hope Phd",
    title: "Insects getting bigger",
    subject: "World of Insects",
    location: "Pasadena, CA",
    fileUrl: "http://www.google.com"
  },
   {
     longitude: -75.527670,
    latitude: 38.910832,
    author: "Dr. Michelle Luck",
    title: "Rivers",
    subject: "The Delaware River",
    location: "Delaware",
    fileUrl: "http://www.google.com"
  },
   {
    longitude: -122.676482,
    latitude: 45.523062,
    author: "Jennifer James",
    title: "RATS",
    subject: "RODENTS",
    location: "Portland, OR",
    fileUrl: "http://www.google.com",
  },
   {
    author: "Michael Klophaus",
    title: "Clouds",
    subject: "Atmosphere",
    location: "Doylestown, PA",
    fileUrl: "http://www.google.com",
    longitude: -75.129894,
    latitude: 40.310106
  },
   {
    author: "Red Foreman",
    title: "rain",
    subject: "Rain in Mexico",
    location: "Mexico City, Mexico",
    fileUrl: "http://www.google.com",
    longitude: -99.133208,
    latitude: 19.432608
  },
   {
    author: "Amy Good",
    title: "Mice in the cities",
    subject: "Rodents",
    location: "China",
    fileUrl: "http://www.google.com",
    longitude: 104.195397,
    latitude: 35.861660
  },
   {
    author: "Sam Tole",
    title: "Big Oaks",
    subject: "Trees",
    location: "Yosemite",
    fileUrl: "http://www.google.com",
    longitude: -119.538329,
    latitude: 37.865101
  },
  {
    author: "Dr. John Richards",
    title: "Elephants",
    subject: "Wildlife in Africa",
    location: "Nigeria",
    fileUrl: "http://www.google.com",
    longitude: 8.675277,
    latitude: 9.081999
  },
   {
    author: "Dr. John Lennon",
    title: "Deserts",
    subject: "Land",
    location: "Israel",
    fileUrl: "http://www.desserts.com",
    longitude: 34.851612,
    latitude: 31.046051
  },
   {
    author: "Dr. Martin Brody",
    title: "Lions",
    subject: "Evolotion",
    location: "Thailand",
    fileUrl: "http://www.google.com",
    longitude: 100.992541,
    latitude: 15.870032
  },
   {
    author: "Dr. Bobby Darin",
    title: "gardens",
    subject: "gardens",
    location: "France",
    fileUrl: "http://www.google.com",
    longitude: 2.213749,
    latitude: 46.227638
  },
   {
    author: "Mr.Eman",
    title: "the ocean depths",
    subject: "The ocean",
    location: "New Zealand",
    fileUrl: "http://www.google.com",
    longitude: 174.885971,
    latitude: -40.900557
  },
   {
    author: "Jimmy Jordan",
    title: "Pollution",
    subject: "The atmosphere's dirty",
    location: "Houston, Texas",
    fileUrl: "http://www.google.com",
    longitude: -95.369803,
    latitude: 29.760427
  },
   {
    author: "Dr.mike",
    title: "Rain!",
    subject: "Where's it at?",
    location: "Denver, CO",
    fileUrl: "http://www.google.com",
    longitude: -104.990251,
    latitude: 39.739236
  },
   {
    author: "Dr. Jonie Mitchell",
    title: "vineyards",
    subject: "Crops",
    location: "Greenland",
    fileUrl: "http://www.google.com",
    longitude: -42.604303,
    latitude: 71.706936
  },
   {
    author: "Dr. Cheryl Doughty",
    title: "vineyards",
    subject: "Crops",
    location: "Italy",
    fileUrl: "http://www.google.com",
    longitude: 12.567380,
    latitude: 41.871940
  },
   {
    author: "Dr. Cheryl Doughty",
    title: "vineyards",
    subject: "Crops",
    location: "Italy",
    fileUrl: "http://www.google.com",
    longitude: 12.567380,
    latitude: 41.871940
  },
   {
    author: "Amanda Demopoulos",
    title: "Invasive Mangrove Alter Macrofaunal Community Structure",
    subject: "Mangroves",
    location: "Honolulu, Hawaii",
    fileUrl: "https://mapdocapp.s3.amazonaws.com/Demopoulos_2010_invasive%20mangrove%20in%20Hawaii.pdf",
    longitude: -157.85833330000003,
    latitude: 21.3069444
  },
   {
    author: "Dr. Danielson",
    title: "The Asian Tsunami: A Protective Role of Coastal Vegetation",
    subject: "Tsunamis",
    location: "Tamil, Nadu, India",
    fileUrl: "https://mapdocapp.s3.amazonaws.com/Danielsen%202005_tsunami&vegetation.pdf",
    longitude: 78.6568942,
    latitude: 11.1271225
  },
   {
    author: "Rachel Comeaux",
    title: "Mangrove expansion in the Gulf of Mexico",
    subject: "Mangrove Expansion",
    location: "Port Aransas",
    fileUrl: "https://mapdocapp.s3.amazonaws.com/Comeaux2012_Mangrove%20expansion%20GOM.pdf",
    longitude: -97.061099,
    latitude: 27.833916
  },
   {
    author: "Maria F Adame",
    title: "Carbon Stocks of Tropical Coastal Wetlands",
    subject: "Wetlands",
    location: "Punta Gorda",
    fileUrl: "https://mapdocapp.s3.amazonaws.com/Adame2013_Cstocks.pdf",
    longitude: -82.045366,
    latitude: 26.929784
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
