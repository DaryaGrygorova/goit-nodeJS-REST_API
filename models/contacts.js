const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");
const textFormat = "utf8";

const listContacts = async () => {
  try {
    const res = await fs.readFile(contactsPath, textFormat);
    return JSON.parse(res);
  } catch (err) {
    return err;
  }
};

const getContactById = async (contactId) => {
  try {
    const res = await fs.readFile(contactsPath, textFormat);
    const data = JSON.parse(res);
    const contact = data.filter((item) => item.id === contactId.toString());
    if (contact.length < 1) {
      return null;
    }
    return contact;
  } catch (err) {
    return err;
  }
};

const removeContact = async (contactId) => {
  try {
    const response = await fs.readFile(contactsPath, textFormat);
    const data = JSON.parse(response);
    const contact = data.find((item) => item.id === contactId.toString());

    if (!contact) {
      return null;
    } else {
      const newData = data.filter((item) => item.id !== contactId.toString());

      await fs.writeFile(contactsPath, JSON.stringify(newData), textFormat);
      return contact;
    }
  } catch (err) {
    return err;
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;

    const res = await fs.readFile(contactsPath, textFormat);
    const data = JSON.parse(res);

    if (data.find((item) => item.name === name)) {
      return null;
    } else {
      const id = (+data[data.length - 1].id + 1).toString();
      const newContact = { id, name, email, phone };

      data.push(newContact);

      await fs.writeFile(contactsPath, JSON.stringify(data), textFormat);
      return newContact;
    }
  } catch (err) {
    return err;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const res = await fs.readFile(contactsPath, textFormat);
    const data = JSON.parse(res);

    const contactIdx = data.findIndex((item) => item.id === contactId);

    if (contactIdx < 0) {
      return null;
    } else {
      const newContact = { id: contactId, name, email, phone };
      data.splice(contactIdx, 1, newContact);

      await fs.writeFile(contactsPath, JSON.stringify(data), textFormat);
      return newContact;
    }
  } catch (err) {
    return err;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
