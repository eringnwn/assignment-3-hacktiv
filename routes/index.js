const router = require("express").Router();
const photoRoutes = require("../routes/photo");

router.get('/', (req, res) => {
    return res.send("Get");
})

router.use("/photos", photoRoutes);

module.exports = router;