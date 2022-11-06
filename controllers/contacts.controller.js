const Contact = require("../models/contact.model");
const { createNotFoundHttpError, createValidationError } = require("../helpers/helpers");
const { requestBodyValidation, contactStatusValidation } = require("../validation");

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  return res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  return next(createNotFoundHttpError(id));
};

const addContact = async (req, res, next) => {
  const { value, error } = requestBodyValidation(req.body);
  if (error) {
    return next(createValidationError(error));
  }
  const newContact = await Contact.create(value);
  return res.status(201).json(newContact);
};

const removeContact = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contact.findByIdAndRemove(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  return next(createNotFoundHttpError(id));
};

const updateContact = async (req, res, next) => {
  const id = req.params.contactId;
  const { value, error } = requestBodyValidation(req.body);

  if (error) {
    return next(createValidationError(error));
  }
  const newContact = await Contact.findByIdAndUpdate(
    id,
    { ...value },
    { new: true }
  );
  if (newContact) {
    return res.status(201).json(newContact);
  }
  return next(createNotFoundHttpError(id));
};

const updateStatusContact = async (req, res, next) => {
  const id = req.params.contactId;
  const { value: {favorite}, error } = contactStatusValidation(req.body);

  if (error) {
    return next(createValidationError(error));
  }
  
  const contact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true },
  );
  if (contact) {
    return res.status(200).json(contact);
  }
  return next(createNotFoundHttpError(id));
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
};
