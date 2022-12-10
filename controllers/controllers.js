const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 
//const session = require('express-session'); 


const register = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json({ "msg": "registration successful", newUser })
    } catch (e) {
        console.log(e)
        res.status(500).json({"msg": e })
    }
}


const login = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        console.log(userExists)
        //console.log(userExists._id.toString())
        if (!userExists) {
            return res.status(200).json({ "msg": "user does not exist" })
        } else {
            const isMatch = await bcrypt.compare(req.body.password, userExists.password);
            //console.log(isMatch)
            if (isMatch) {
                req.session.userId = userExists._id.toString();
                console.log(req.session.userId)
                //console.log(req.session.cookie)
                res.status(200).json({ "msg": "login successful", userExists })
            } else {
                return res.status(200).json({ "msg": "passwords do not match" })
            }
        }

    } catch (e) {
        console.log(e)
        res.send({ e })
    }
}




const getContacts = async (req, res) => {
    try {
        console.log(req.params.userid)
        console.log(req.query.sort)
        

        
        if (req.query.sort == 'true') {
            const contacts = await Contact.find({ userId: req.params.userid }).sort([['name', 1]]);
            res.status(200).json({ "msg": "contacts fetched successfully", contacts })
        } else if (req.query.sort == 'false') {
            const contacts = await Contact.find({ userId: req.params.userid }).sort([['name', -1]]);
            res.status(200).json({ "msg": "contacts fetched successfully", contacts })
        } else {
            const contacts = await Contact.find({ userId: req.params.userid });
            res.status(200).json({ "msg": "contacts fetched successfully", contacts })
        }

        
        
    } catch (e) {
        console.log(e)
        res.status(500).json({"msg": "error", e})
    }
}

/* REDUNDANT ROUTES

const ascendingContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({ name: 1 });
        res.status(200).json({ "msg": "contacts fetched successfully", contacts })
    } catch (e) {
        console.log(e)
        res.send({ e })
    }
}

const descendingContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({ name: -1 });
        res.status(200).json({ "msg": "contacts fetched successfully", contacts })
    } catch (e) {
        console.log(e)
        res.send({ e })
    }
}

*/

const getFavorites = async (req, res) => {
    try {
        console.log(req.params.userid)
        const result = await Contact.find({ userId: req.params.userid })
        //console.log(result)
        const favs = result.filter((r) => {
            return r.isFavorite == true;
        })
        console.log(favs)
        //const favoriteContacts = await Contact.find({isFavorite:true});
        res.status(200).json({ "msg": "favorite contacts fetched successfully", favs })
    } catch (e) {
        console.log(e)
        res.send({ e })
    }
}

const selectUser = async (req, res) => {
    try {
        const selectedUser = await Contact.findByIdAndUpdate({ _id: req.params.id },(req.body),{ new:true });
        res.status(200).json({ "msg": "user selected successfully", selectedUser })
    } catch (e) {
        console.log(e)
        res.send({ e })
    }
}


const deselectUser = async (req, res) => {
    try {
        const deselectedUser = await Contact.findByIdAndUpdate({ _id: req.params.id }, (req.body), { new: true });
        res.status(200).json({ "msg": "user deselected successfully", deselectedUser })
    } catch (e) {
        console.log(e)
        res.send({ e })
    }
}

const removeUsers = async (req, res) => {
    try {
        const removedUsers = await Contact.deleteMany({toBeDeleted: true});
        res.status(200).json({ "msg": "bulk deletion successfully", removedUsers })
    } catch (e) {
        console.log(e)
        res.send({ e })
    }
}



const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById({ _id: req.params.id });
        res.status(200).json({ "msg": "contact fetched successfully", contact })
    } catch (e) {
        console.log(e)
        res.send({ e })
    } 
}

const addContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
       
        await contact.save(); 
        res.status(200).json({ "msg": "contact added successfully", contact })
    } catch (e) {
        console.log(e)
        res.send({ e })
    }
}

const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate({ _id: req.params.id }, (req.body), { new: true });
        res.status(200).json({ "msg": "contact updated successfully", contact })
    } catch (e) {
        console.log(e)
        res.send({ e })
    }
}



const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ "msg": "contact deleted successfully", contact })
    } catch (e) {
        console.log(e)
        res.send({ e })
    }
}




const logout =async (req, res) => {
    try {
        await req.session.destroy()
        res.status(200).json({ 'msg': 'user session deleted successfully' });

    } catch (e) {
        console.log(e)
        res.send({ e })
    }
}


module.exports = {
    addContact, 
    getContacts,
    getFavorites,
    selectUser,
    deselectUser,
    getContact, 
    updateContact, 
    deleteContact, 
    removeUsers,  
    register, 
    login, 
    logout
}

