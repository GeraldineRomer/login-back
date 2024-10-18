const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        if (!password) {
            throw new Error("la contraseña es obligatoria");
        }
        if(!email){
            throw new Error("El email es obligatorio");
        }

        const emailLowerCase = email.toLowerCase();
        const userStore = await User.findOne({ email: emailLowerCase }).exec();

        if (!userStore){
            throw new Error("El usuario no existe");
        }

        const check = await bcrypt.compare(password, userStore.password);
        if (!check){
            throw new Error("Contraseña incorrecta");
        }

        res.status(200).send({
            access: jwt.createAccessToken(userStore),
        })
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
};

const register = async (req, res) => {
    const {  
            email, 
            password, 
        } = req.body;

    if (!email) return res.status(400).send({ msg: "El email es requerido "});
    if (!password) return res.status(400).send({ msg: "La contraseña es requerida "});

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    //const hashPassword = await bcrypt.hash(password,salt);

    const user = new User({
        email: email.toLowerCase(),
        password: hashPassword
    });

    try {
        const userStorage = await user.save();
        res.status(201).send(userStorage);
        
    } catch (error) {
        console.log("error al crear " + error);
        res.status(400).send({ msg: "Error al crear el usuario" + error});
    }
};

module.exports = {
    login,
    register
};
