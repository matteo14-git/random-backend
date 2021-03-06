import request from 'supertest';
import app from '../../app';

import { Animals, Genres } from '../interfaces/Animal';
import {
  Database,
  getCollection,
  Collections,
} from '../../common/utils/Database';

describe('Create animal API', () => {
  beforeAll(() => {
    return Database.connect();
  });

  afterAll(async () => {
    await getCollection(Collections.animals).deleteMany({});
    return Database.disconnect();
  });

  test('Should return 200 if creation is OK', async () => {
    const animal: Animals = {
      name: 'Kiko',
      race: 'Barboncino nano',
      genre: Genres.MALE,
    };

    const { body, status } = await request(app).post('/animals').send(animal);

    expect(Object.keys(body)).toEqual(
      expect.arrayContaining(['_id', 'name', 'race', 'genre'])
    );
    expect(status).toBe(200);
  });

  test('Should return 400 if no body is passed', async () => {
    const { status } = await request(app).post('/animals');

    expect(status).toBe(400);
  });
});
