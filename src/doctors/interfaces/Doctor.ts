import { ObjectId } from 'mongodb';

export enum Genres {
  MALE = 'male',
  FEMALE = 'female',
}

export interface Doctors {
  _id?: ObjectId;
  surname: string;
  name: string;
  birth: Date;
  city?: string;
  genre: Genres;
}
