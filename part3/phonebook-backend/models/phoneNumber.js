const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("Conntecting to", url);
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

const phoneNumberSchema = new mongoose.Schema({
  name: String,
  number: String,
});

phoneNumberSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("PhoneNumber", phoneNumberSchema);
