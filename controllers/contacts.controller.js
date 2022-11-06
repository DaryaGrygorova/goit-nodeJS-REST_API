const { Contact } = require("../models");
const { createNotFoundHttpError } = require("../helpers");

const listContacts = async (req, res, next) => {
  const { _id } = req.user;
  const contacts = await Contact.find({ owner: _id }).populate("owner", "_id email");
  return res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const contact = await Contact.find({ _id: contactId, owner: _id }).populate("owner", "_id email");
  if (contact) {
    return res.status(200).json(contact);
  }
  return next(createNotFoundHttpError({ id: contactId }));
};

const addContact = async (req, res, next) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id }).populate("owner", "_id email");
  return res.status(201).json(newContact);
};

const removeContact = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const contact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: _id,
  }).populate("owner", "_id email");
  if (contact) {
    return res.status(200).json(contact);
  }
  return next(createNotFoundHttpError({ id: contactId }));
};

const updateContact = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const newContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    { ...req.body },
    { new: true }
  ).populate("owner", "_id email");
  if (newContact) {
    return res.status(201).json(newContact);
  }
  return next(createNotFoundHttpError({ id: contactId }));
};

const updateStatusContact = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    { favorite },
    { new: true }
  ).populate("owner", "_id email");
  if (contact) {
    return res.status(200).json(contact);
  }
  return next(createNotFoundHttpError({ id: contactId }));
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
