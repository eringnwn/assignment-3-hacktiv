const router = require("express").Router();

router.get('/', (req, res) => {
    return res.send("Get");
})

module.exports = router;