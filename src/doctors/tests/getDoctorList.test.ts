import request from 'supertest';
import {
  Database,
  Collections,
  getCollection,
} from '../../common/utils/Database';
import { Doctors, Genres } from '../interfaces/Doctor';
import app from '../../app';

describe('Get doctor list API', () => {
  const doctors: Doctors[] = [
    {
      surname: 'Rossi',
      name: 'Mario',
      birth: new Date('1993-02-17'),
      genre: Genres.MALE,
    },
    {
      surname: 'Verdi',
      name: 'Giorgio',
      birth: new Date('1993-02-17'),
      genre: Genres.MALE,
    },
    {
      surname: 'Violi',
      name: 'Viola',
      birth: new Date('1993-02-17'),
      genre: Genres.FEMALE,
    },
  ];
  beforeAll(async () => {
    await Database.connect();
    await getCollection(Collections.doctors).insertMany(doctors);
  });
  afterAll(async () => {
    await getCollection(Collections.doctors).deleteMany({});
    return Database.disconnect();
  });

  test('should return doctor list', async () => {
    const { status, body } = await request(app).get('/doctors');

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(doctors.length);
  });

  test('should return doctors list filtered by genre', async () => {
    const genre = Genres.MALE;
    const { status, body } = await request(app).get(`/doctors?genre=${genre}`);

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(doctors.length - 1);
  });
});
