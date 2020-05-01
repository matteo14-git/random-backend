import { ObjectId } from 'mongodb';

export enum Genres {
  MALE = 'female',
  FEMALE = 'female',
}

export interface Friend {
  surname: string;
  name: string;
  birth: Date;
  city: string;
}

export interface Food {
  name: string;
  brand?: string;
}

export interface Animals {
  _id?: ObjectId;
  name: string;
  race: string;
  genre: Genres;
  friends: Friend[];
  favFoods: Food[];
}
