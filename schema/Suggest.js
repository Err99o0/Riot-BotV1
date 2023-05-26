const { Schema, model } = require("mongoose");

let suggest = new Schema({
  Guild: String,
  Channel: String,
});

module.exports = model("suggest", suggest);