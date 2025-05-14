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
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (numberToTest) {
        return /^\d{2,3}-\d+$/.test(numberToTest);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

phoneNumberSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const opts = { runValidators: true };

module.exports = mongoose.model("PhoneNumber", phoneNumberSchema);
