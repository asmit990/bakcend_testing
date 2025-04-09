const express = require('express');
const hehe = express.Router();

const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

hehe.route('/')
.get(getContacts)
.post(createContact);


hehe.route('/:id')
.get(getContact)
.put(updateContact)
.delete(deleteContact)

module.exports = hehe;




