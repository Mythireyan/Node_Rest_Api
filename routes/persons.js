const express = require("express");
const Persons = require("../models/persons");
const router = express.Router();

// Get all persons
router.get("/", async (req, res) => {
  try {
    const personsArr = await Persons.find();
    res.json(personsArr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one person
router.get("/:id", getAllPersons, (req, res) => {
  res.send(res.person);
});

// Create a person
router.post("/", async (req, res) => {
  const person = new Persons({
    name: req.body.name,
    age: req.body.age,
  });
  try {
    const newPerson = await person.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a person
router.patch("/:id", getAllPersons, async (req, res) => {
  if (req.body.name != null) {
    res.person.name = req.body.name;
  }
  if (req.body.age != null) {
    res.person.age = req.body.age;
  }

  try {
    const updatedPerson = await res.person.save();
    res.status(401).json(updatedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a person
router.delete("/:id", getAllPersons, async (req, res) => {
  try {
    await res.person.remove();
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getAllPersons(req, res, next) {
  let person;

  try {
    person = await Persons.findById(req.params.id);
    if (person == null) {
      return res.status(404).json({ message: "Cannot find the user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.person = person;
  next();
}

module.exports = router;
