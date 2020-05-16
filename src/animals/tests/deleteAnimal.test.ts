import {
  Database,
  getCollection,
  Collections,
} from '../../common/utils/Database';
import { Animals, Genres } from '../interfaces/Animal';
import request from 'supertest';
import app from '../../app';
import { ObjectId } from 'mongodb';

describe('Delete animal API', () => {
  beforeAll(() => {
    return Database.connect();
  });

  afterAll(async () => {
    await getCollection(Collections.animals).deleteMany({});
    return Database.disconnect();
  });

  test('should return 200 if delete is ok', async () => {
    const animal: Animals = {
      name: 'Kiko',
      race: 'Barboncino nano',
      genre: Genres.MALE,
    };

    const {
      body: { _id: animalId },
      status: createStatus,
    } = await request(app).post('/animals').send(animal);

    expect(createStatus).toBe(200);

    const { body, status } = await request(app).delete(`/animals/${animalId}`);

    expect(status).toBe(200);
  });

  // test('should return 400 if bad animal is passed', async () => {
  //   const { status } = await request(app).delete('/animals/123');

  //   expect(status).toBe(400);
  // });

  test('should return 404 if animal is not found', async () => {
    const _id = new ObjectId();
    const { status } = await request(app).delete(`/animals/${_id}`);

    expect(status).toBe(404);
  });
});
