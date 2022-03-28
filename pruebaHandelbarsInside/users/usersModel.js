const connection = require("../db/config")

// -------------------------------------------------------------------------
//refactorizado (ver en clase)
const getAllUsers = async() => {
    const query = "SELECT * FROM users" //forzamos error con nombre de tabla
    try {
        return await connection.query(query)
    } catch (error) {
        return { "error": error.code } //cuál de todas las key conviene retornar?
    }
}

const getUserById = async(id) => {
        const query = `SELECT * FROM users WHERE id = ${id}`
        try {
            console.log(query);
            return await connection.query(query)
        } catch (error) {
            return { "error": error.code }
        }
    }
    // -----------------------------------------------------------------------------

module.exports = { getAllUsers, getUserById }