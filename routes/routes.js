const express = require('express'); 
const router = express.Router();
const { auth } = require('../auth');



const { getContacts, getFavorites, getContact, addContact, updateContact, deleteContact, selectUser, deselectUser, removeUsers, register, login, logout } = require('../controllers/controllers.js')


router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout); 



router.get('/:userid/read', getContacts); 
 
router.get('/read/:id', getContact); 
router.get('/:userid/favorites', getFavorites); 
router.put('/selectuser/:id', selectUser);
router.put('/deselectuser/:id', deselectUser);
router.delete('/removeselectedusers', removeUsers)
router.post('/add', addContact); 
router.put('/update/:id', updateContact); 
router.delete('/delete/:id', deleteContact); 





module.exports = router; 