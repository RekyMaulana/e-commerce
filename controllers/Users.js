import User from "../models/Users.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";

//registrasi
export const register = async (req, res) => {
    const {username, password, email} = req.body
    const user = {
        username,
        email,
        password: await bcrypt.hash(password, 10),
    }
    
    try {
       await User.create(user) 
       res.status(200).json({
           "message": "User Created"
       })
    } catch (error) {
        console.log(error);
    }
}




//login
export const loginUser = async (req, res) => {
    const {username, password} = req.body
    console.log(username);
    const userData = await User.findOne({
        where: {
            username: username
        }
    })
    if (!userData) {
        res.json({
            "message": "user not found"
        })
    }

    const validUser = await bcrypt.compare(password, userData.password)

    if (!validUser) {
        res.json({
            "message": "password incorrect"
        })
    }

    const token = jsonwebtoken.sign({
        id: userData.id,
        username: userData.username,
        email: userData.email
    },"SHSHSHSH",
      {expiresIn: "5m"}
    )

    return res.json({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        token
    })

}

//delete user
export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}

