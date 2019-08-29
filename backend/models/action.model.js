const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const actionSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  objectif: { type: String, required: true },
  date: { type: Date, required: true },
  statut:{type: Boolean, required: true },
}, {
  timestamps: true,
});

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;