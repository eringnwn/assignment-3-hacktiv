const { Photo, User } = require('../models');

// bisa diakses siapa saja yang sudah login
exports.getAllPhotos = async (req, res) => {
    await Photo.findAll({
        include: User,
    })
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json(e);
        })
}

// hanya bisa diakses jika user id login sama dengan user id photo
exports.getPhotoById = async (req, res) => {
    const id = req.params;
    await Photo.findOne({
        where: {id}
    })
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json(e);
        })
}

exports.deletePhotoById = async (req, res) => {
    res.send("Deteled a photo");
    // await
    //     .then((data) => {

    //     })
    //     .catch((e) => {
    //         res.status(500).json(e);
    //     })
}

exports.updatePhotoById = async (req, res) => {
    res.send("Update by ID");
    // await
    //     .then((data) => {

    //     })
    //     .catch((e) => {
    //         res.status(500).json(e);
    //     })
}

exports.createPhoto = async (req, res) => {
    res.send("Created new photo");
    // await
    //     .then((data) => {

    //     })
    //     .catch((e) => {
    //         res.status(500).json(e);
    //     })
}