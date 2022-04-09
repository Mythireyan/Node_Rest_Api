const { default: mongoose } = require("mongoose");

const personsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("persons", personsSchema);
