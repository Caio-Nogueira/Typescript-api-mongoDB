import User, { IUser } from '../models/users'; // Import the User model
import bcrypt from 'bcrypt';

const users = [
    {
        username: 'admin',
        email: 'admin@admin.com',
        hashPassword: bcrypt.hashSync('admin', 10)
    },
    {
        username: 'user',
        email: 'user@user.com',
        hashPassword: bcrypt.hashSync('user', 10)
    }  
];

const populateUsers = async () => {
    try {
        await User.deleteMany({});
        await User.insertMany(users);
        console.log('Users added to database');
    } catch (error) {
        console.error(error);
    }
}

export default populateUsers;