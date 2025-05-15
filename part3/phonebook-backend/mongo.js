const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Invalid input");
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://mauricemecke:${password}@cluster0fullstackcourse.bxwatko.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0FullstackCourse`;

mongoose.set("strictQuery", false);

mongoose.connect(url);
const phoneNumberSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const PhoneNumber = mongoose.model("PhoneNumber", phoneNumberSchema);

if (process.argv.length === 3) {
  console.log("Phonebook :");

  PhoneNumber.find({}).then((result) => {
    result.forEach((number) => console.log(`${number.name} ${number.number}`));
    mongoose.connection.close();
  });
} else {
  const newNumber = new PhoneNumber({
    name: process.argv[3],
    number: process.argv[4],
  });

  newNumber.save().then(() => {
    console.log(
      `added ${newNumber.name}'s number ${newNumber.number} to the phonebook `
    );
    mongoose.connection.close();
  });
}
