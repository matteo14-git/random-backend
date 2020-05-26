import request from 'supertest';
import app from '../../app';
import { Doctors, Genres } from '../interfaces/Doctor';
import {
  Database,
  getCollection,
  Collections,
} from '../../common/utils/Database';

describe('Create doctor API', () => {
  beforeAll(() => {
    return Database.connect();
  });

  afterAll(async () => {
    await getCollection(Collections.doctors).deleteMany({});
    return Database.disconnect();
  });

  test('should return 200 if create is ok', async () => {
    const doctor: Doctors = {
      surname: 'Rossi',
      name: 'Mario',
      birth: new Date('1993-02-17'),
      genre: Genres.MALE,
    };

    const { status, body } = await request(app).post('/doctors').send(doctor);

    expect(status).toBe(200);
    expect(Object.keys(body)).toEqual(
      expect.arrayContaining(['_id', 'surname', 'name', 'birth', 'genre'])
    );
  });

  test('should return 400 if no body is passed', async () => {
    const { status } = await request(app).post('/doctors');

    expect(status).toBe(400);
  });
});
