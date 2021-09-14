const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

morgan.token('body', function (req) {
    return JSON.stringify(req.body);
});

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
);

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
    },
];

const generateId = () => {
    return Math.floor(Math.random() * 10000);
};

app.get('/info', (request, response) => {
    const content = `
		Phonebook has info for ${persons.length} people
		<br/><br/>
		${new Date()}
	`;
    response.send(content);
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const toFind = persons.find((p) => p.id === id);
    if (!toFind) {
        return response.status(404).end();
    }
    response.json(toFind);
});

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing',
        });
    }

    if (persons.find((p) => p.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique',
        });
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    };

    persons = persons.concat(person);

    response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((p) => p.id !== id);
    response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
