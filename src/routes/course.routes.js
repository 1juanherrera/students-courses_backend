const { getAll, create, getOne, remove, update, setCoursesStudents } = require('../controllers/course.controllers');
const express = require('express');

const courseRouter = express.Router();

courseRouter.route('/')
    .get(getAll)
    .post(create);

courseRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

courseRouter.route('/:id/students')
    .post(setCoursesStudents)

module.exports = courseRouter;