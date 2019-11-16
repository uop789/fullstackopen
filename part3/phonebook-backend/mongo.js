const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
} else if (process.argv.length === 3) {
  const password = process.argv[2];
  const url = `mongodb+srv://uop789:${password}@cluster0-oo2ba.mongodb.net/phonebook?retryWrites=true&w=majority`;

  mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  });

  const Person = mongoose.model('Person', personSchema);

  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const password = process.argv[2];
  const url = `mongodb+srv://uop789:${password}@cluster0-oo2ba.mongodb.net/phonebook?retryWrites=true&w=majority`;

  mongoose.connect(url, { useNewUrlParser: true });

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  });

  const Person = mongoose.model('Person', personSchema);

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  // eslint-disable-next-line no-unused-vars
  person.save().then(result => {
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    );
    mongoose.connection.close();
  });
}
