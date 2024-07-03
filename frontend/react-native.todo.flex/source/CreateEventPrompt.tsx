import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Text, Input, Button} from '@rneui/base';
import {colors} from './Colors';

type Props = {
  onSubmit: (
    {name}: {name: string},
    {time}: {time: string},
    {location}: {location: string},
    {description}: {description: string},
    {eventType}: {eventType: string},
    {school}: {school: string},
    {wwTrack}: {wwTrack: string},
    {interests}: {interests: string}
  ) => void;
};

export function CreateEventPrompt(props: Props): React.ReactElement<Props> {
  const {onSubmit} = props;
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [school, setSchool] = useState('');
  const [wwTrack, setWWTrack] = useState('');
  const [interests, setInterests] = useState('');

  return (
    <SafeAreaProvider>
      <View style={styles.modalWrapper}>
        <Text h3 style={styles.addEventTitle}>
          Create Event
        </Text>

        <Text style={styles.addEventLabel}>
          Event Name
        </Text>
        <Input
          onChangeText={(text: string) => setName(text)}
        />

        <Text style={styles.addEventLabel}>
          Time
        </Text>
        <Input
          onChangeText={(text: string) => setTime(text)}
        />

        <Text style={styles.addEventLabel}>
          Location
        </Text>
        <Input
          onChangeText={(text: string) => setLocation(text)}
        />

        <Text style={styles.addEventLabel}>
          Event Description
        </Text>
        <Input
          onChangeText={(text: string) => setDescription(text)}
        />

        <Text style={styles.addEventLabel}>
          Event Type
        </Text>
        <Input
          onChangeText={(text: string) => setEventType(text)}
        />

        <Text style={styles.addEventLabel}>
          School
        </Text>
        <Input
          onChangeText={(text: string) => setSchool(text)}
        />

        <Text style={styles.addEventLabel}>
          Wildcat Welcome Track
        </Text>
        <Input
          onChangeText={(text: string) => setWWTrack(text)}
        />

        <Text style={styles.addEventLabel}>
          Interest Tags
        </Text>
        <Input
          onChangeText={(text: string) => setInterests(text)}
        />

        <Button
          title="Save"
          buttonStyle={styles.saveButton}
          onPress={() => onSubmit({name}, {time}, {location}, {description}, {eventType}, {school}, {wwTrack}, {interests})}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    width: 300,
    minHeight: 400,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  addEventTitle: {
    margin: 10,
  },
  addEventLabel: {
    margin: 0,
  },
  saveButton: {
    width: 280,
    backgroundColor: colors.primary,
  },
});
