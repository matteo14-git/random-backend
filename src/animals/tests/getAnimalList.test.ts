import request from 'supertest';
import {
  Database,
  Collections,
  getCollection,
} from '../../common/utils/Database';
import { Animals, Genres } from '../interfaces/Animal';
import app from '../../app';

describe('Get animal list API', () => {
  const animals: Animals[] = [
    {
      name: 'Kiko',
      race: 'Barboncino nano',
      genre: Genres.MALE,
    },
    {
      name: 'Pippo',
      race: 'Incrocio',
      genre: Genres.MALE,
    },
  ];
  beforeAll(async () => {
    await Database.connect();
    await getCollection(Collections.animals).insertMany(animals);
  });
  afterAll(async () => {
    await getCollection(Collections.animals).deleteMany({});
    return Database.disconnect();
  });

  test('should return animal list', async () => {
    const { status, body } = await request(app).get('/animals');

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(animals.length);
  });
});
