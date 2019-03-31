const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId; 

const questionSchema = new Schema({
  _id: ObjectId,
  text: String
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;