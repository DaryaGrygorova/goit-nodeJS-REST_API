const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json({ data, message: "Request processed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await getContactById(id);
    if (!data) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ data, message: "Request processed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    if (!body.name) {
      res.status(400).json({
        message: "missing required name field",
      });
    }
    if (!body.email) {
      res.status(400).json({
        message: "missing required email field",
      });
    }
    if (!body.phone) {
      res.status(400).json({
        message: "missing required phone field",
      });
    }

    const data = await addContact(body);

    if (!data) {
      res.status(400).json({
        message: `A contact with name '${body.name}' is already exists!`,
      });
    }
    res.status(201).json({ data, message: "User added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await removeContact(id);

    if (!data) {
      res.status(404).json({ message: `Contact with ID '${id}' not found!` });
    }

    res.status(200).json({ data, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;

    if (!body.name) {
      res.status(400).json({
        message: "missing required name field",
      });
    }
    if (!body.email) {
      res.status(400).json({
        message: "missing required email field",
      });
    }
    if (!body.phone) {
      res.status(400).json({
        message: "missing required phone field",
      });
    }

    const data = await updateContact(id, body);

    if (!data) {
      res.status(404).json({ message: `A contact with ID '${id}' not found!` });
    }

    res.status(200).json({ data, message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: `Server error! ${err.message}` });
  }
});

module.exports = router;
