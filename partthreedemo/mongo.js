const mongoose = require("mongoose");

const password = process.argv[2];
const url = `mongodb+srv://mauricemecke:${password}@cluster0fullstackcourse.bxwatko.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0FullstackCourse`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);
