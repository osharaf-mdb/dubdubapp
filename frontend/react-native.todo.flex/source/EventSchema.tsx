import Realm, {BSON} from 'realm';

export class Event extends Realm.Object<Event> {
  _id!: BSON.ObjectId;
  name!: string;
  time!: string;
  location!: string;
  description!: string;
  createdBy!: string;
  students!: string;
  eventType!: string;
  school?: string;
  wwTrack?: string;
  interests?: string;


  static schema: Realm.ObjectSchema = {
    name: 'Event',
    primaryKey: '_id',
    properties: {
        _id: {type: 'objectId', default: () => new BSON.ObjectId()},
        name: 'string',
        time: 'string',
        location: 'string',
        description: 'string',
        createdBy: 'string',
        students: 'string',
        eventType: 'string',
        school: 'string',
        wwTrack: 'string',
        interests: 'string'
    },
  };
}
