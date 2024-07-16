import Realm from 'realm';

export class Wildcat extends Realm.Object {
  _id!: string;
  name!: string;
  role!: string;
  school?: string;
  paGroup?: string;
  wwTrack?: string;
  interests?: [];  // Changed to array of strings
  events?: [];     // Changed to array of strings

  static schema: Realm.ObjectSchema = {
    name: 'Wildcat',
    primaryKey: '_id',
    properties: {
      _id: { type: 'string', indexed: true },
      name: { type: 'string', optional: false },
      role: { type: 'string', optional: false },
      school: { type: 'string', optional: true },
      paGroup: { type: 'string', optional: true },
      wwTrack: { type: 'string', optional: true },
      interests: { type: 'list', objectType: 'mixed', optional: true},  // Schema for array of strings
      events: { type: 'list', objectType: 'mixed', optional: true},     // Schema for array of strings
    },
  };
}
