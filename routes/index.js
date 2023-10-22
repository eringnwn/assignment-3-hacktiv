const router = require("express").Router();
const photoRoutes = require("../routes/photo");
const userRoutes = require("../routes/user");
const { authentication } = require("../middlewares/auth");

router.get('/', (req, res) => {
    return res.send("Get");
})

router.use("/photos", authentication, photoRoutes);
router.use("/users", userRoutes);

module.exports = router;