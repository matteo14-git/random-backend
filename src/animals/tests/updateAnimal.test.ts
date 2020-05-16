import request from 'supertest';
import app from '../../app';
import {
  Database,
  getCollection,
  Collections,
} from '../../common/utils/Database';
import { Animals, Genres } from '../interfaces/Animal';
import { ObjectId } from 'mongodb';

describe('Update animal API', () => {
  beforeAll(() => {
    return Database.connect();
  });

  afterAll(async () => {
    await getCollection(Collections.animals).deleteMany({});
    return Database.disconnect();
  });

  test('should return 200 if update is OK', async () => {
    const animal: Animals = {
      name: 'Kiko',
      race: 'Barboncino nano',
      genre: Genres.MALE,
    };
    const {
      body: { _id },
      status: creationStatus,
    } = await request(app).post('/animals').send(animal);

    expect(creationStatus).toBe(200);

    if (!animal.friends) animal.friends = new Array(0);
    animal.friends.push({
      surname: 'Picardi',
      name: 'Clo',
    });
    animal.name = 'Pippo';

    const { body, status } = await request(app)
      .put(`/animals/${_id}`)
      .send(animal);

    expect(status).toBe(200);
    expect(body.friends).toHaveLength(1);
    expect(body.name).toBe('Pippo');
  });

  test('should return 404 if animal is not found', async () => {
    const animal: Animals = {
      _id: new ObjectId(),
      name: 'Kiko',
      race: 'Barboncino nano',
      genre: Genres.MALE,
    };

    const { status } = await request(app)
      .put(`/animals/${animal._id}`)
      .send(animal);

    expect(status).toBe(404);
  });

  // test('should return 400 if no body is passed', async () => {
  //   const _id = new ObjectId();
  //   const { status } = await request(app).put(`/animals/${_id}`);

  //   expect(status).toBe(400);
  // });
});
