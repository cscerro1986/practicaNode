let users = require("../db/data")
const { getAllUsers, getUserById } = require("./usersModel")
const findById = require("../util/findById")

//get all users (refactorizado, ver en clase)
const listAll = async(req, res) => {
    const dbResponse = await getAllUsers()
    dbResponse.hasOwnProperty("error") ? res.status(500).json(dbResponse) : res.status(200).json(dbResponse)
};

//get user by id
const listOne = async(req, res, next) => {
    console.log(req.body.id);
    if (isNaN(+req.params.id)) {
        return res.status(400).json({ message: "Debe ingresar un número" })
    }
    const dbResponse = await getUserById(+req.params.id)
    if (dbResponse.hasOwnProperty("error")) {
        return res.status(500).json(dbResponse)
    }
    dbResponse.length ? res.status(200).json(dbResponse) : next()

};
//add new user
const addOne = (req, res) => {
    const { name, username, email } = req.body;
    if (!name || !username || !email && (name === "" || username === "" || email === "")) {
        res.status(400).json({ message: "all fields required" })
    } else {
        users.push(req.body)
        res.status(201).json(req.body)
    }
}

//delete user by id
const removeOne = (req, res, next) => {
    if (isNaN(+req.params.id)) {
        res.status(400).json({ message: "Debe ingresar un número" })
    }
    const userFound = findById(+req.params.id, users)
    if (userFound) {
        users = users.filter((user => user.id !== +req.params.id))
        res.status(200).json(userFound)
    } else {
        next()
    }
}


module.exports = { listAll, listOne, addOne, removeOne }