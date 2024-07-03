import React, {useCallback, useState, useEffect} from 'react';
import {BSON} from 'realm';
import {useUser, useRealm, useQuery} from '@realm/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Alert, FlatList, StyleSheet, Switch, Text, View} from 'react-native';
import {Button, Overlay, ListItem} from '@rneui/base';
import {dataExplorerLink} from '../atlasConfig.json';

import {CreateEventPrompt} from './CreateEventPrompt';

import {Item} from './ItemSchema';
import {Event} from './EventSchema';
import {colors} from './Colors';

// If you're getting this app code by cloning the repository at
// https://github.com/mongodb/ template-app-react-native-todo,
// it does not contain the data explorer link. Download the
// app template from the Atlas UI to view a link to your data
const dataExplorerMessage = `View your data in MongoDB Atlas: ${dataExplorerLink}.`;

const eventSubscriptionName = 'events';
const ownEventsSubscriptionName = 'ownEvents';

export function ItemListView() {
  const realm = useRealm();
  const events = useQuery(Event).sorted('_id');
  const user = useUser();

  const [showNewItemOverlay, setShowNewItemOverlay] = useState(false);

  // This state will be used to toggle between showing all items and only showing the current user's items
  // This is initialized based on which subscription is already active
  const [showAllEvents, setShowAllEvents] = useState(
    !!realm.subscriptions.findByName(eventSubscriptionName),
  );

  // This effect will initialize the subscription to the items collection
  // By default it will filter out all items that do not belong to the current user
  // If the user toggles the switch to show all items, the subscription will be updated to show all items
  // The old subscription will be removed and the new subscription will be added
  // This allows for tracking the state of the toggle switch by the name of the subscription
  useEffect(() => {
    if (showAllEvents) {
      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(ownEventsSubscriptionName);
        mutableSubs.add(realm.objects(Event), {name: eventSubscriptionName});
      });
    } else {
      realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeByName(eventSubscriptionName);
        mutableSubs.add(
          realm.objects(Event),
          {name: ownEventsSubscriptionName},
        );
      });
    }
  }, [realm, user, showAllEvents]);

  // createItem() takes in a summary and then creates an Item object with that summary
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

  // deleteItem() deletes an Item with a particular _id
  const deleteEvent = useCallback(
    (id: BSON.ObjectId) => {
      // if the realm exists, get the Item with a particular _id and delete it
      const event = realm.objectForPrimaryKey(Event, id); // search for a realm object with a primary key that is an objectId
      if (event) {
        if (event.createdBy !== user?.id) {
          Alert.alert("You can't delete someone else's event!");
        } else {
          realm.write(() => {
            realm.delete(event);
          });
          console.log(dataExplorerMessage);
        }
      }
    },
    [realm, user],
  );

  return (
    <SafeAreaProvider>
      <View style={styles.viewWrapper}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>Show All Events</Text>
          <Switch
            trackColor={{true: '#00ED64'}}
            onValueChange={() => {
              if (realm.syncSession?.state !== 'active') {
                Alert.alert(
                  'Switching subscriptions does not affect Realm data when the sync is offline.',
                );
              }
              setShowAllEvents(!showAllEvents);
            }}
            value={showAllEvents}
          />
        </View>
        <Overlay
          isVisible={showNewItemOverlay}
          overlayStyle={styles.overlay}
          onBackdropPress={() => setShowNewItemOverlay(false)}>
          <CreateEventPrompt
            onSubmit={({name}, {time}, {location}, {description}, {eventType}, {school}, {wwTrack}, {interests}) => {
              console.debug(user?.id);
              console.debug({name}, {time}, {location}, {description}, {eventType}, {school}, {wwTrack}, {interests});
              setShowNewItemOverlay(false);
              createEvent({name}, {time}, {location}, {description}, {eventType}, {school}, {wwTrack}, {interests});
            }}
          />
        </Overlay>
        {/* <FlatList
          keyExtractor={item => item._id.toString()}
          data={events}
          renderItem={({item}) => (
            <ListItem key={`${item._id}`} bottomDivider topDivider>
              <ListItem.Title style={styles.itemTitle}>
                {item.summary}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.itemSubtitle}>
                <Text>{item.owner_id === user?.id ? '(mine)' : ''}</Text>
              </ListItem.Subtitle>
              <ListItem.Content>
                {!item.isComplete && (
                  <Button
                    title="Mark done"
                    type="clear"
                    onPress={() => toggleItemIsComplete(item._id)}
                  />
                )}
                <Button
                  title="Delete"
                  type="clear"
                  onPress={() => deleteItem(item._id)}
                />
              </ListItem.Content>
            </ListItem>
          )}
        /> */}
        <Button
          title="Create New Event"
          buttonStyle={styles.addEvent}
          onPress={() => setShowNewItemOverlay(true)}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
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
