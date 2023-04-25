import pool from "../configs/connetDB"

let getHomepage = async (req,res) => {

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

let createUserpage = async (req,res) => {
    let {fristName, lastName, email, address} = req.body;
    const [user] = await pool.execute(`insert into info_user (email, address, fistName, lastName) 
    values (?,?,?,?)`, [email, address, fristName, lastName]);

    return res.redirect('/');
}

let getUpdatepage = async (req,res) => {
    let userId = req.params.id;
    const [user] = await pool.execute(`select * from info_user where id=?`, [userId]);
    return res.render('update.ejs', {dataUser: user});
}

let postUpdateuser = async (req,res) => {
    let userId = req.params.id;
    let {fristName, lastName, email, address} = req.body;
    await pool.execute(`update info_user 
    set fistName = ?, lastName = ?, email = ?, address = ? where id=?`, 
    [fristName, lastName, email, address, userId])
    return res.redirect('/');
}

let postDeleteuser = async (req,res) => {
    let userId = req.params.id;
    await pool.execute(`delete from info_user where id = ?`, [userId]);
    return res.redirect('/');
}

module.exports = {
    getHomepage, getCardpage, getDetailpage, createUserpage, getUpdatepage,
    postUpdateuser, postDeleteuser
}