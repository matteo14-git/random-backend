import { Request, Response, NextFunction } from 'express';
import { getCollection, Collections } from '../../common/utils/Database';
import { serverError } from '../../common/utils/errors';
import { ObjectId } from 'mongodb';

export default async (req: Request, res: Response, next: NextFunction) => {
  const collection = getCollection(Collections.stops);
  try {
    const ris = await collection.find().toArray();

    console.log('ris.length', ris.length);

    const remodel = ris.map((stop) => {
      return {
        _id: new ObjectId(stop._id._id),
        day: stop._id.day,
        asset: stop._id.asset,
        date: new Date(stop._id.date),
        stops: stop.stops.reduce((acc, elem) => {
          if (elem.seconds) {
            const temp = {
              ...elem,
              location: {
                type: elem.location.type,
                coordinates: elem.location.coordinates.reduce((acc, coord) => {
                  if (coord) {
                    coord = coord.toString();
                    let temp;
                    if (coord[0] == '8' || coord[0] == '9') {
                      temp = coord[0] + '.' + coord.substring(1, 6);
                    } else
                      temp =
                        coord.substring(0, 2) + '.' + coord.substring(2, 7);

                    acc.push(parseFloat(temp));
                  }

                  return acc;
                }, []),
              },
            };

            acc.push(temp);
          }

          return acc;
        }, []),
      };
    });

    const final = remodel.map((elem) => {
      return {
        ...elem,
        total_stops: elem.stops.length,
        minutes: Math.round(
          elem.stops.reduce((acc, stop) => (acc += stop.minutes), 0)
        ),
      };
    });

    const super_final = final.reduce((acc, elem) => {
      if (elem.total_stops > 0 && elem.minutes > 0) acc.push(elem);

      return acc;
    }, []);

    console.log('final', JSON.stringify(super_final, null, 2));

    await collection.deleteMany({});

    await collection.insertMany(super_final);

    res.send(201);
  } catch (err) {
    console.log('err', err);
    return next(serverError('Error getting stops list'));
  }
};
