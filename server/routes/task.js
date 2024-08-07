const express = require('express')
const router = express.Router()
const taskController = require('../controllers/TaskController')

router.post('/get',  taskController.get);
router.post('/',  taskController.add);
router.post('/remove',  taskController.remove);
router.post('/check',  taskController.check);




module.exports = router;

