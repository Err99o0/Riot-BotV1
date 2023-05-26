const { Schema, model } = require("mongoose");

let LogSchema = new Schema({
  Guild: String,
  Channel: String,
});

module.exports = model("logs", LogSchema);