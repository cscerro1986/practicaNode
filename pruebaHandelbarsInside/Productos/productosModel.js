const async = require("hbs/lib/async")
const connection = require("../db/config")

const getAllProducts = async ()=>{
    const query = `SELECT * FROM producto`
    try {
        return connection.query(query);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAllProducts};