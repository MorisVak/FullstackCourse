const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const PhoneNumber = require("./models/phoneNumber");
const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.req(req, res, "content-lengt"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

app.get("/info", (request, response) => {
  const now = new Date();
  PhoneNumber.find({}).then((numbers) => {
    response.send(`<p>Phonebook has info for ${numbers.length} people</p>
    <p>${now.toDateString()} ${now.toTimeString()}</p>`);
  });
});

app.get("/api/persons", (request, response, next) => {
  PhoneNumber.find({}).then((numbers) => {
    response.json(numbers);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  PhoneNumber.findById(id)
    .then((number) => {
      if (number) {
        response.json(number);
      } else {
        response.statusMessage = "Couldn't find Id";
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  PhoneNumber.findByIdAndDelete(request.params.id)
    .then(response.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const newNumber = new PhoneNumber({
    name: body.name,
    number: body.number,
  });
  newNumber.save().then((savedNumber) => {
    console.log(`Saved ${savedNumber} to Database`);
    response.json(savedNumber);
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  console.log("BODY : ", request.body);

  const { name, number } = request.body;
  PhoneNumber.findByIdAndUpdate(request.params.id)
    .then((numberToUpdate) => {
      if (!numberToUpdate) {
        return response.status(404).end();
      }

      numberToUpdate.name = name;
      numberToUpdate.number = number;

      numberToUpdate
        .save()
        .then((updatedNumber) => response.json(updatedNumber));
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);
