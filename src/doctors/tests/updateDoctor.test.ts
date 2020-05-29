import request from 'supertest';
import app from '../../app';
import { Doctors, Genres } from '../interfaces/Doctor';
import {
  Database,
  getCollection,
  Collections,
} from '../../common/utils/Database';
import { ObjectId } from 'mongodb';

describe('Update doctor API', () => {
  beforeAll(() => {
    return Database.connect();
  });

  afterAll(async () => {
    await getCollection(Collections.doctors).deleteMany({});
    return Database.disconnect();
  });

  test('should return 200 if update is ok', async () => {
    const doctor: Doctors = {
      surname: 'Rossi',
      name: 'Mario',
      birth: new Date('1993-02-17'),
      genre: Genres.MALE,
    };

    const {
      status: createStatus,
      body: { _id },
    } = await request(app).post('/doctors').send(doctor);

    expect(createStatus).toBe(200);

    doctor.city = 'Casalmoro';

    const { status, body } = await request(app)
      .put(`/doctors/${_id}`)
      .send(doctor);

    expect(status).toBe(200);
  });

  test('should return 404 if doctor is not found', async () => {
    const doctor: Doctors = {
      surname: 'Rossi',
      name: 'Mario',
      birth: new Date('1993-02-17'),
      genre: Genres.MALE,
    };
    const _id = new ObjectId();
    const { status } = await request(app).put(`/doctors/${_id}`).send(doctor);

    expect(status).toBe(404);
  });

  test('should return 400 if no body is passed', async () => {
    const _id = new ObjectId();
    const { status } = await request(app).put(`/doctors/${_id}`);

    expect(status).toBe(400);
  });

  test('should return 400 if wrong id is passed', async () => {
    const { status } = await request(app).put(`/doctors/123`);

    expect(status).toBe(400);
  });
});
