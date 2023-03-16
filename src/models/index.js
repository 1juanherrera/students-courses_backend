const Course = require("./Course");
const Student = require("./Student");

Course.belongsToMany(Student, { through: "StudentsCourses"})
Student.belongsToMany(Course, { through: "StudentsCourses"})