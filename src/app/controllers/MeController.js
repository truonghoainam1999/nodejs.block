const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { deleteOne } = require('../models/Course');
class MeController {
    // [GET]  :me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deleteCourse]) =>
                res.render('me/stored-courses', {
                    deleteCourse,
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
    //[GET]  :me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
