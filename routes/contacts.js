const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

/************************************
 * @route   GET    /api/contacts/
 * @desc    Get all contacts
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.userID}).sort({date: -1});
        res.status(200).json({contacts: contacts});
        res.send('Get all contacts');    
    } catch (error) {
        res.status(500).json({error: "Internal server error"});    
    }   
});

/************************************
 * @route   POST    /api/contacts
 * @desc    Add a contact
 * @access  Private
 */
router.post('/', auth, [
    check('name', 'Name is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const { name, email, phone, type } = req.body;
    try {
        const contact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.userID
        });
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).jason({error: "Internal server error"});
    }
});


/************************************
 * @route   PUT    /api/contacts/:id
 * @desc    Update contact
 * @access  Private
 */
router.put('/:id', auth, [
    check('name', 'Name is required').not().isEmpty()
], async (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    };
    const {name, email, phone, type} = req.body;
    //Build contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;
    try {
        let contact = await Contact.findById(id);
        if(!contact) {
            return res.status(404).json({error: "Contact not found"});
        }
        //make sure the user owns contact
        if(contact.user.toString() !== req.userID) {
            return res.status(401).json({error: "Not authorized"});
        }
        const updateContact = await Contact.findByIdAndUpdate(id,
             {$set: contactFields},
             {new: true}); //create if doesn't exist
        return res.status(201).json(updateContact);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

/************************************
 * @route   DELETE    /api/contacts/:id
 * @desc    Delete contact
 * @access  Private
 */
router.delete('/:id', (req, res) => {
    res.send('Delete Contact');
});


module.exports = router;

