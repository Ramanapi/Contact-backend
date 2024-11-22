const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Contact = require('./models/contact');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Replace with your MongoDB_API
mongoose.connect('mongodb+srv://raman:1234@cluster0.0mvhw.mongodb.net/contactsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.put('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(contact);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.delete('/contacts/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
