const express = require('express')
const router = express.Router()
const taskController = require('../controllers/TaskController')

router.get('/get',  taskController.get);
router.get('/add',  taskController.add);


module.exports = router;

