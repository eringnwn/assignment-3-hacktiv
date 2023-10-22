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
    const id = Number(req.params.id);
    const userData = req.userData;

    await Photo.findOne({
        where: {
            id,
            UserId: userData.id,
        }
    })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Data Not Found" });
            }
            res.json(data);
        })
        .catch((e) => {
            res.status(500).json(e);
        })
}

// hanya bisa diakses jika user id login sama dengan user id photo
exports.deletePhotoById = async (req, res) => {
    const id = Number(req.params.id);
    const userData = req.userData;

    await Photo.destroy({
        where: {
            id,
            UserId: userData.id,
        }
    })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Data Not Found" });
            }
            res.status(201).json({ message: "Success Deleted Photo" });
        })
        .catch((e) => {
            res.status(500).json(e);
        })
}

// hanya bisa diakses jika user id login sama dengan user id photo
exports.updatePhotoById = async (req, res) => {
    const body = req.body;
    const title = body.title;
    const caption = body.caption;
    const image_url = body.image_url;
    const id = Number(req.params.id);
    const userData = req.userData;

    await Photo.update({
        title,
        caption,
        image_url
    }, {
        where: {
            id,
            UserId: userData.id,
        },
        returning: true,
    })
        .then((data) => {
            console.log(data);
            if (!data[0]) {
                return res.status(404).json({ message: "Data Not Found" });
            }
            res.status(201).json({ message: "Success Updated Photo", data: data[1] });
        })
        .catch((e) => {
            res.status(500).json(e);
        })
}

// bisa diakses siapa saja yang sudah login
exports.createPhoto = async (req, res) => {
    const body = req.body;
    const title = body.title;
    const caption = body.caption;
    const image_url = body.image_url;
    const userData = req.userData;

    await Photo.create({
        title,
        caption,
        image_url,
        UserId: userData.id
    })
        .then((data) => {
            res.status(201).json({ message: "Created New Photo", data });
        })
        .catch((e) => {
            res.status(500).json(e);
        })
}