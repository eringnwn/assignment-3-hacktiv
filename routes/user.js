const router = require("express").Router();
const controller = require("../controllers/user.controller");

router.get('/', controller.getAllUser);
router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);

module.exports = router;