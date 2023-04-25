import pool from '../configs/connetDB';

let getUsers = async (req,res) => {
    const [rows, fields] = await pool.execute(`SELECT * FROM Info_user `)
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req,res) => {
    let {fristName, lastName, email, address} = req.body;
    if(!fristName || !lastName || !email || !address){
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    await pool.execute(`insert into info_user (email, address, fistName, lastName) 
    values (?,?,?,?)`, [email, address, fristName, lastName])
    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req,res) => {
    let {fristName, lastName, email, address, id} = req.body;
    if(!fristName || !lastName || !email || !address || !id){
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    await pool.execute(`update info_user 
    set fistName = ?, lastName = ?, email = ?, address = ? where id=?`, 
    [fristName, lastName, email, address, id]);
    return res.status(200).json({
        message: 'ok'
    })
}

let deleteUser = async (req,res) => {
    let userId = req.params.id;
    if(!userId){
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    await pool.execute(`delete from info_user where id = ?`, [userId]);
    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getUsers, createNewUser, updateUser, deleteUser
}