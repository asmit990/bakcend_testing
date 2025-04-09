const asyncHandler = require('express-async-handler');

const Contact = require("../models/contactModel")
  // Get all contacts
  const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id}) ;
    res.status(200).json({ message: "Get all the contacts"} , contacts);
  });
  
  // Create a new contact
  const createContact = asyncHandler(async(req, res) => {
    const { name, email, phone } = req.body;
  
    if (!name) return res.status(400).json({ error: "fucker fill up the name" });
    if (!email) return res.status(400).json({ error: "fucker fill up the email" });
    if (!phone) return res.status(400).json({ error: "fucker fill up the phone" });
  
  
    const contact = await Contact.create({
        name, 
        email,
        phone,
        user_id,
    })
    res.status(201).json(contact);
  });
  
  // Get contact by ID
  const getContact = asyncHandler(async(req, res) => {
    const contact = contacts.find(c => c.id === req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json({message: `Get contact for ${req.param.id}`});
  });
  
  // Update contact by ID
  const updateContact = asyncHandler(async(req, res) => {
    const index = contacts.findIndex(c => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Contact not found" });
  
    
    res.status(200).json({ message: "Contact updated" });
  });
  
  // Delete contact by ID
  const deleteContact = asyncHandler(async(req, res) => {
   const contact = await Contact.findById(req.params.id);
   if (!contact) {
    res.status(404)
    throw new Error("contact not found");
   }

   await contact.remove();


   res.status(200).json({messsage: `deleted the contact ${req.params.id}`})
  });
  
  module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
  };
  