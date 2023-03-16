const request = require('supertest')
const app = require('../app');
const Student = require('../models/Student');

let courseId;

test('POST /courses should create an courses', async() => {
    const newCourse = {
        name: "Programacion",
        credits: 3
    }
    const res = await request(app)
    .post('/courses')
    .send(newCourse)
    courseId = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(newCourse.name)
})

test('GET /courses should return all the courses', async() => {
    const res = await request(app).get('/courses')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1);
})

test('PUT /courses should update one courses', async() => {
    const body = {
       name: "Calculo Integral",
       credits: 4 
    }
    const res = await request(app)
        .put(`/courses/${courseId}`)
        .send(body)
        expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
})

test('POST /courses/:id/students should set the students', async() => {
    const student = await Student.create({
        firstName: "Juan",
        lastName: "Herrera",
        birthday: "2002/04/05",
        program: "Ing. Sistemas"
    })
    const res = await request(app).post(`/courses/${courseId}/students`)
    .send([student.id]);
    console.log(res.body)
    await student.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test('DELETE /courses/:id should delete one courses', async() => {
    const res = await request(app).delete(`/courses/${courseId}`)
    expect(res.status).toBe(204)
})

