    import User from '../Model/usermodel.js'
    import jwt from 'jsonwebtoken'
    import bcrypt from 'bcryptjs'

    export const signupUser = async(req,res)=>{
        const {username, email, password} = req.body;
        try{
            const userExists =await User.findOne({email});
            if(userExists){
                return res.status(400).json({message: 'User already exists'});
            }

            const hashedPassword = await bcrypt.hash(password,10);
            const user = new User({username, email, password:hashedPassword});
            await user.save();
            console.log("User Saved: ",user)
            res.status(201).json({message:"User sign up successful" , user: {username, email} });
        }catch(error){
            return res.status(500).json({message: 'Server Error',error:error.message});
        }
    } 

    export const login = async(req,res)=>{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"Email and Password are required"});
        }

        try{
            const user = await User.findOne({email});
            if(!user) return res.status(400).json({message:"Invalid Credentails"});

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({message:'Invalid Credentails'});

            const accessToken = jwt.sign({id:user._id}, "shashank", {expiresIn:"1d"});
            res.json({ message: 'Login successful', token: accessToken, user: { username: user.username, email: user.email } });
        }catch(error){
            res.status(500).json({message:'Error logging in user', error});
        }

    }

    export const authenticateToken = async(req,res,next)=>{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log("Auth Header: ",authHeader);
        console.log("Token: ",token);

        if(!token) return res.status(401).json({message:"Access token is missing or invaild"})

        jwt.verify(token, "shashank", (err,user)=>{
            if(err) {
                console.log("JWT Verification Error: ".err);
                return res.status(403).json({message:'Invalid Token'});
            }
            console.log("Decoded user: ", user);

            req.user = user;
            next();
        })

    }