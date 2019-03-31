
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;


const videoSchema = new Schema({
  _id: ObjectId,
  title: String,
  author: String,
  videoId: String,
  questions: [{
    questionId: ObjectId,
    time: Number
  }]
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;