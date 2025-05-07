const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config;
const app = express();
app.use(cors());
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

let numbers = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  const now = new Date();
  response.send(`<p>Phonebook has info for ${numbers.length} people</p>
    <p>${now.toDateString()} ${now.toTimeString()}</p>`);
});

app.get("/api/persons", (request, response) => {
  response.json(numbers);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = numbers.find((number) => number.id === id);
  if (person) {
    response.json(person);
  } else {
    response.statusMessage = "Couldn't find Id";
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  numbers = numbers.filter((number) => number.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  } else if (numbers.find((number) => number.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const newNumber = {
    id: Math.floor(Math.random() * 100000),
    name: body.name,
    number: body.number,
  };

  numbers = numbers.concat(newNumber);
  response.json(newNumber);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
