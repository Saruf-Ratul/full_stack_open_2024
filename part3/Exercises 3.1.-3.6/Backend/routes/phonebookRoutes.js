const express = require('express');
const Phonebook = require('../models/phonebook');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const phonebook = await Phonebook.find();
    res.json(phonebook);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, number } = req.body;
    const phonebook = new Phonebook({ name, number });
    const newEntry = await phonebook.save();
    res.status(201).json(newEntry);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Phonebook.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
