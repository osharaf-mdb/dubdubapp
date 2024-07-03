import Realm, {BSON} from 'realm';

export class User extends Realm.Object<User> {
  _id!: string;
  name!: string;
  role!: string;
  school?: string;
  paGroup?: string;
  wwTrack?: string;
  interests?: string;
  events?: Array<Event>

  static schema: Realm.ObjectSchema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        name: 'string',
        role: 'string',
        school: 'string',
        paGroup: 'string',
        wwTrack: 'string',
        interests: 'string',
        events: 'Array<Event>'
    },
  };
}
