import contactModel from "../models/contactModel.js";

// Create Contact
export const createContact = async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;

    if (!name || !email || !message) {
      return res.status(400).send({
        success: false,
        message: "All fields are required!",
      });
    }
    const contact = await contactModel.create({ name, email, message, phone });
    res.status(200).send({
      success: true,
      message: "Message send successfully.",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in contact controller.",
      error,
    });
  }
};

// Get Contact
export const getContact = async (req, res) => {
  try {
    const contacts = await contactModel.find({});
    res.status(200).send({
      success: true,
      message: "Contact List",
      contacts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get contact controller.",
      error,
    });
  }
};
