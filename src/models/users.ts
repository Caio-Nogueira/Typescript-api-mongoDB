import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the User document interface
export interface IUser extends Document {
  username: string;
  email: string;
  hashPassword: string;
  createdAt: Date
  // Add more fields as needed
  comparePassword(password: string): boolean;
}

// Define the User schema
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Always convert `email` to lowercase
    trim: true // Always trim values for `email`
  },
  hashPassword: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // Define more fields and their types here
});

userSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.hashPassword);
};

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
