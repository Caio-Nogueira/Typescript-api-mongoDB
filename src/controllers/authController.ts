import { Request, Response } from 'express';
import User, { IUser } from '../models/users'; // Import the User model
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'secret';

export const signin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    // Check if the username and password are present
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const user: IUser | null = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    // const hashPassword = bcrypt.hashSync(password, 10);
    const validPassword = user.comparePassword(password);

    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid password' });
    }
 
    const token = jwt.sign({username: username}, jwtSecret, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });
    
    res.status(200).json({ message: 'User logged in successfully' });

}

