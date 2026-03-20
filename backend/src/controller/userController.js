import User from "../models/user.model.js ";
import bcrypt from 'bcrypt';
export const registerUser = async function (req, res) {
    try {
        if(!req.body.userName || !req.body.email || !req.body.password) {
            return res.status(400).json({ message: "All fields are required" });
        }       

        const isUserExist = await User.findOne({ 
            $or: [
                { userName: req.body.userName },
                { email: req.body.email }
            ] 
         });

        if(isUserExist) {
            return res.status(400).json({ message: "Username already exists" });
        }
        
        
        
        const { userName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({ userName, email, password: hashedPassword });
        await user.save();

        const token = new jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ user, token });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};