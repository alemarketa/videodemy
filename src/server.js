// modules
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const router = express.Router();

// schemas
const Video = require("../models/video"); 
const Question = require("../models/question")

// db
const API_PORT = 10327;
const dbRoute = "mongodb://" + process.env.REACT_APP_USERNAME + ":" + process.env.REACT_APP_PASSWORD +"@ds229186.mlab.com:29186/videodemy"

// connect db and backend
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

// cross-origin
app.use(cors({
  credentials: true,
  //origin: ['http://localhost:3000']
  origin:true
}));


// parse body to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//get method all videos
 router.get("/getData/videos", (req, res) => {
   Video.find((err, data) => {
     if (err) return res.json({ success: false, error: err });
     return res.json({ success: true, data: data });
   });
 });

 // get method all questions
 router.get("/getData/questions", (req, res) => {
   Question.find((err, data) => {
     if (err) return res.json({ success: false, error: err });
     return res.json({ success: true, data: data });
   });
  })


// get method one video
router.get("/getData/videos/:id", (req, res) => {
  Video.findById(req.params.id, function (err, video) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: video });
  })
});

// get method one question
router.get("/getData/questions/:id", (req, res) => {
  Question.findById(req.params.id, function (err, video) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: video });
  })
});


// add "/api" to the http requests
app.use("/api", router);

// launch backend at port 10327
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));



// @todo: implement!
// error handler
// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ code: 'not-found' });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({ code: 'unexpected' });
  }
});
