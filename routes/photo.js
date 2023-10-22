const router = require("express").Router();
const controller = require("../controllers/photo.controller");

router.get('/', controller.getAllPhotos);
router.get('/:id', controller.getPhotoById);
router.delete('/:id', controller.deletePhotoById);
router.put('/:id', controller.updatePhotoById);
router.post('/', controller.createPhoto);

module.exports = router;