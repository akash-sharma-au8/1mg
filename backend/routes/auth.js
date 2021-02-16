const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser, getUserProfile,updateProfile,updatePassword,getAllUsers,deleteUser } = require('../controllers/auth')
const { isUserAuthenticated,isUserAuthorized } = require("../Middlewares/auth");

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

router.get('/profile', isUserAuthenticated, getUserProfile)
router.put('/profile/update',isUserAuthenticated, updateProfile)
router.put('/password/update',isUserAuthenticated, updatePassword)

router.get('/admin/users', isUserAuthenticated, isUserAuthorized('seller'), getAllUsers)
router.delete('/admin/user/:id', isUserAuthenticated, isUserAuthorized('seller'), deleteUser)


module.exports = router