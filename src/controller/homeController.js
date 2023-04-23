// import connection from "../configs/connetDB"
import pool from "../configs/connetDB"

let getHomepage = async (req,res) => {

//     let data = [];
//     connection.query(
//         'SELECT * FROM `Info_user` ',
//         function (err, results, fields) {
//             results.map((row) => {
//                 data.push({
//                     id: row.id,
//                     email: row.email,
//                     address: row.address,
//                     fistName: row.fistName,
//                     lastName: row.lastName
//                 })

//             });

//     return res.render('index.ejs', { dataUser: data })
//     }
// )

    const [rows, fields] = await pool.execute(`SELECT * FROM Info_user `);
    return res.render('index.ejs', {dataUser: rows})
}

let getDetailpage = async (req,res) => {
    let userId = req.params.id
    const [user] =  await pool.execute(`SELECT * FROM Info_user WHERE id = ?`,[userId]);
    return res.send(JSON.stringify(user))
}

let getCardpage = (req,res) => {
    return res.render('card.ejs')
}

module.exports = {
    getHomepage, getCardpage, getDetailpage
}