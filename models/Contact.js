const mongoose = require('mongoose'); 

const contactSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    phone: {
        type: String,
        required: true
    },
    alternate_phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    }, 
    isFavorite: {
        type: Boolean, 
        required: false, 
        default:false
    },
    toBeDeleted: {
        type: Boolean,
        required: false,
        default: false
    }, 
    userId: {
        type: String, 
        required: false
    }
})

const Contact = mongoose.model('Contact', contactSchema); 

module.exports = Contact; 
