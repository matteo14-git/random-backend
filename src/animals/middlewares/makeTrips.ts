import { Request, Response, NextFunction } from 'express';
import { getCollection, Collections } from '../../common/utils/Database';
import { serverError } from '../../common/utils/errors';
import { ObjectId } from 'mongodb';
import moment from 'moment';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let collection = getCollection(Collections.stops);
    const stops = await collection.find().toArray();

    // console.log('stops', stops[0]);

    collection = getCollection(Collections.stats);

    const stats = await collection.find().toArray();

    // console.log('stats', stats[0]);

    // const mid = stats.map((elem) => {
    //   const stop = stops.find(
    //     (stop) => stop.day === elem.day && stop.asset === elem.asset
    //   );
    //   return stops ? { ...stats, stops: stop } : { ...stats };
    // });

    const mid = stats.reduce((acc, elem) => {
      const stop = stops.find(
        (stop) => stop.day === elem.day && stop.asset === elem.asset
      );

      const temp = stop
        ? { ...elem, stops: stop.stops }
        : { ...elem, stops: [] };

      acc.push(temp);

      return acc;
    }, []);

    // console.log('mid', mid);

    let countStart;
    let countEnd;

    const next = mid.reduce((acc, elem) => {
      // console.log('######################');
      const trips: any[] = [];
      countStart = -1;
      countEnd = -1;
      if (elem.stops.length > 0) {
        elem.stops.forEach((stop) => {
          if (stop.minutes >= 5) {
            let start = new Date(stop.start).getHours();
            // console.log('start', start);
            let end = new Date(stop.end).getHours();
            // console.log('end', end);
            const endMinutes = new Date(stop.end).getMinutes();

            // console.log('countStart', countStart);
            // console.log('countEnd', countEnd);

            if (endMinutes > 0 && end < 23) end++;

            // if (start < countEnd) start = countEnd;
            // if (end < countEnd) end = countEnd + 1;

            // console.log('start', start);
            // console.log('end', end);
            const meters = elem.hourly
              .slice(start - 1, end - 1)
              .reduce((acc, hour) => (acc += hour.meters), 0);

            // if (meters > 0) {
            //   console.log('start -1', start - 1);
            //   console.log('end -1', end - 1);
            //   console.log('meters', meters);
            // }

            if (
              (start <= countEnd && start >= countStart) ||
              (end >= countStart && end <= countEnd)
            ) {
              console.log('start', start);
              console.log('end', end);
              console.log('countStart', countStart);
              console.log('countEnd', countEnd);
              console.log('meters', meters);
            }

            countStart = start;
            countEnd = end;

            if (start === end && meters > 0) {
              console.log('start', start);
              console.log('meters', meters);
            }

            // console.log('start - 1', start - 1);
            // console.log('end', end - 1);

            // console.log('------');

            const location = stop && stop.location && stop.location.coordinates;

            const xxx = {
              asset: elem.asset,
              fuid: elem.asset,
              meters: meters,
              temp: Math.round(elem.temp),
              january_temp: elem.january_temp,
              lastLocation: {},
              start: new Date(stop.start).toISOString(),
              end: new Date(stop.end).toISOString(),
            };

            if (location.length > 0)
              xxx.lastLocation = {
                type: 'Point',
                coordinates: stop.location.coordinates,
              };
            else delete xxx.lastLocation;

            trips.push(xxx);
          }
        });
      } else {
        // console.log('elem.stops.length', elem.stops.length);
        let meters: number = 0;
        let counting = false;
        let beginning = 0;
        for (let i = 0; i < elem.hourly.length; i++) {
          // console.log('peppo', { counting, beginning, i, meters });
          if (!counting && elem.hourly[i].meters > 0) {
            // console.log('aaa');
            counting = true;
            beginning = i;
            // console.log('elem.hourly[i].meters', elem.hourly[i].meters);
            meters += elem.hourly[i].meters;
          } else if (counting && elem.hourly[i].meters > 0) {
            // console.log('bbb');
            meters += elem.hourly[i].meters;
          } else if (counting && elem.hourly[i].meters == 0) {
            // console.log('ccc');
            counting = false;
            const start = new Date(elem.date);
            // const mStart = moment(start, 'YYYY-MM-DD HH:mm:ss');
            // mStart.hours(beginning);
            // if (elem.asset == '030' && elem.day == '2016-07-27')
            //   console.log('start', start);
            start.setHours(beginning + 2);
            const end = new Date(elem.date);
            // const mEnd = moment(end);
            // mEnd.hours(i - 1);
            end.setHours(i - 1 + 2);

            if (elem.asset == '030' && elem.day == '2016-07-27') {
              console.log('beginning', beginning);
              console.log('i - 1', i - 1);
              console.log('start', start);
              console.log('end', end);
            }
            const startDate = start.toISOString();
            const endDate = end.toISOString();
            // console.log('beginning', beginning);
            // console.log('i -1', i - 1);

            // console.log('meters', meters);
            trips.push({
              asset: elem.asset,
              fuid: elem.asset,
              meters: meters,
              temp: Math.round(elem.temp),
              january_temp: elem.january_temp,
              start: startDate.toString(),
              end: endDate.toString(),
            });

            meters = 0;
          }
        }
      }

      acc.push({
        _id: new ObjectId(),
        asset: elem.asset,
        date: elem.date,
        day: elem.day,
        meters: elem.meters,
        january_temp: elem.january_temp,
        temp: Math.round(elem.temp),
        trips,
      });

      return acc;
    }, []);

    // console.log('next', JSON.stringify(next, null, 2));

    collection = getCollection(Collections.temp);

    await collection.deleteMany({});

    await collection.insertMany(next);

    console.log('added data');

    res.sendStatus(201);
  } catch (err) {
    console.log('err', err);
    return next(serverError('Error getting stops list'));
  }
};
