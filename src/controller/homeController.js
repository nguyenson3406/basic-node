import pool from "../configs/connetDB"
import multer from 'multer';

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

let getUpdateFilepage = (req,res) => {
    return res.render('update-file.ejs')
}


let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form

    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    // });
}

let handleUploadMultipleFiles = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/update-file">Upload more images</a>';
    res.send(result);

}

module.exports = {
    getHomepage, getCardpage, getDetailpage, createUserpage, getUpdatepage,
    postUpdateuser, postDeleteuser, getUpdateFilepage, handleUploadFile,
    handleUploadMultipleFiles
}