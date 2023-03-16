const express = require('express');
const courseRouter = require('./course.routes');
const studentRouter = require('./student.routes');
const router = express.Router();

// colocar las rutas aquí
router.use('/students', studentRouter)
router.use('/courses', courseRouter)


module.exports = router;