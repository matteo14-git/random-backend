import request from 'supertest';
import app from '../../app';

describe('Index animal test', () => {
  test('Say Animals here', async () => {
    const { body, status } = await request(app).get('/animals');

    expect(body).toEqual({ text: 'Animals here!' });
    expect(status).toBe(200);
  });
});
