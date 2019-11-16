/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Person = require('./models/person');

app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

morgan.token('data', function(req, res) {
  if (req.method === 'POST') {
    return `{"name":"${req.body.name}","number":"${req.body.number}"}`;
  } else {
    return null;
  }
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

app.use(express.static('build'));

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(result => {
      res.send(`<p>Phonebook has info for ${result} people</p>
              <p>${new Date()}</p>    
    `);
    })
    .catch(error => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => {
      next(error);
    });
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;
  // if (!body.name || !body.number) {
  //   return res.status(400).json({
  //     error: 'name or number missing'
  //   });
  // }

  // Person.find({}).then(persons => {
  //   const nameArr = persons.map(person => person.name);
  //   if (nameArr.indexOf(body.name) !== -1) {
  //     return res.status(400).json({
  //       error: 'name must be unique'
  //     });
  //   } else {
  const person = new Person({
    name: body.name,
    number: body.number
  });
  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson);
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number
  };
  if (person.number.length >= 8) {
    Person.countDocuments({ name: person.name }).then(result => {
      if (result === 0) {
        res.status(400).send({
          error: `Information of ${person.name} has already been removed from server`
        });
      } else {
        Person.findByIdAndUpdate(req.params.id, person, { new: true })
          .then(updatedPerson => res.json(updatedPerson.toJSON()))
          .catch(error => next(error));
      }
    });
  } else {
    res
      .status(400)
      .send({ error: 'Minimum length of number is 8, please change it!' });
  }
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
