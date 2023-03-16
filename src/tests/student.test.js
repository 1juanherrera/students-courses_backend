const request = require('supertest')
const app = require('../app')

let studentId;

test('POST /students should create a student', async() => {
    const newStudent = {
        firstName: "Juan",
        lastName: "Herrera",
        birthday: "2002/04/05",
        program: "Ing. Sistemas"
    }
    const res = await request(app)
        .post('/students')
        .send(newStudent);
        studentId = res.body.id
        expect(res.status).toBe(201)
        expect(res.body.firstName).toBe(newStudent.firstName)
})

test('GET /students should return all the students', async() => {
    const res = await request(app).get('/students')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2);
    expect(res.body[0].courses).toBeFined()
})

test('POST /students/:id/courses should set the student courses', async() => {
    const course = {
        name: "Programacion",
        credits: 3
    }
    const res = await request(app)
        .post(`/students/${studentId}/courses`)
        .send([course.id])
        await course.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test('UPDATE /students should update one student', async() => {
    const body = {
        firstName: "Denis",
        lastName: "Muñoz"
    }
    const res = await request(app)
        .put(`/students/${studentId}`)
        .send(body)
    expect(res.body.name).toBe(body.name)
    expect(res.status).toBe(200)
})

test('DELETE /students/:id should delete one student', async() => {
    const res = await request(app).delete(`/students/${studentId}`)
    expect(res.status).toBe(204)
})

