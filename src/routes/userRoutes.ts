import express from 'express';
import User, { IUser } from '../models/users'; // Import the User model
import {signin} from '../controllers/authController'

const router = express.Router();
router.use(express.json());

// Define a route to get all users
router.get('/', async (req, res) => {
    try {
        // Get all users from the database
        const users = await User.find();        
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while getting the users.' });
    }
});

// Define a route to sign in
router.post('/signin', signin);


export default router;
