import React, {useCallback, useState, useEffect} from 'react';
import {BSON} from 'realm';
import {useUser, useRealm, useQuery} from '@realm/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Alert, FlatList, StyleSheet, Switch, Text, View} from 'react-native';
import {Button, Overlay, ListItem} from '@rneui/base';
import {dataExplorerLink} from '../atlasConfig.json';

import {CreateEventPrompt} from './CreateEventPrompt';

import {Event} from './EventSchema';
import {colors} from './Colors';

const dataExplorerMessage = `View your data in MongoDB Atlas: ${dataExplorerLink}.`;

const eventSubscriptionName = 'events';

export function EventListView() {
  const realm = useRealm();
  const user = useUser();

  const mongodb = user.mongoClient('mongodb-atlas');
  const wildcatDB = mongodb.db('dub').collection('Wildcat');
  
  const [thisUser, setThisUser] = useState(null);
  const [events, setEvents] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      console.log('getting user');
      const userDoc = await wildcatDB.findOne({ _id: user?.id });
      setThisUser(userDoc);
      console.log('got user');
      console.log(userDoc)
    };

    fetchUser();
  }, [user]);

  const eventsCollection = realm.objects('Event');
  console.log('EVENTS COLLECTION');
  console.log(eventsCollection);

  const [showNewItemOverlay, setShowNewItemOverlay] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(
    !!realm.subscriptions.findByName(eventSubscriptionName),
  );

  const createEvent = useCallback(
    ({name}: {name: string},
      {time}: {time: string},
      {location}: {location: string},
      {description}: {description: string},
      {eventType}: {eventType: string},
      {school}: {school: string},
      {wwTrack}: {wwTrack: string},
      {interests}: {interests: string}) => {
      // if the realm exists, create an Item
      realm.write(() => {
        console.log(dataExplorerMessage);

        return new Event(realm, {
          name,
          time,
          location,
          description,
          createdBy: user?.id,
          students: '',
          eventType,
          school,
          wwTrack,
          interests
        });
      });
    },
    [realm, user],
  );

  if (!thisUser) {
    return <Text>Loading...</Text>; // Placeholder for loading state
  }

  console.log('THIS USER')
  console.log(thisUser)

  return (
    <SafeAreaProvider>
      <View style={styles.viewWrapper}>
        <View style={styles.container}>
          <Text style={styles.title}>Events List</Text>
          <FlatList
            data={eventsCollection}
            renderItem={({ item }) => (
              <View style={styles.eventItem}>
                <Text>{item.name}</Text>
                <Text>{item.time}</Text>
                <Text>{item.location}</Text>
                <Text>{item.description}</Text>
              </View>
            )}
          />
        </View>
        <Overlay
          isVisible={showNewItemOverlay}
          overlayStyle={styles.overlay}
          onBackdropPress={() => setShowNewItemOverlay(false)}>
          <CreateEventPrompt
            onSubmit={({ name }, { time }, { location }, { description }, { eventType }, { school }, { wwTrack }, { interests }) => {
              setShowNewItemOverlay(false);
              createEvent({ name }, { time }, { location }, { description }, { eventType }, { school }, { wwTrack }, { interests });
            }}
          />
        </Overlay>

        {thisUser.role === 'staff' && (
          <Button
            title="Create New Event"
            buttonStyle={styles.addEvent}
            onPress={() => setShowNewItemOverlay(true)}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  addEvent: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    margin: 5,
  },
  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    margin: 5,
  },
  showCompletedButton: {
    borderRadius: 4,
    margin: 5,
  },
  showCompletedIcon: {
    marginRight: 5,
  },
  itemTitle: {
    flex: 1,
  },
  itemSubtitle: {
    color: '#979797',
    flex: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  toggleText: {
    flex: 1,
    fontSize: 16,
  },
  overlay: {
    backgroundColor: 'white',
  },
});
