import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useRealm, useUser} from '@realm/react';
import Realm from 'realm';

export const CreateUser = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Student');
  const [school, setSchool] = useState('');
  const [paGroupNumber, setPaGroupNumber] = useState('');
  const [wwTrack, setWwTrack] = useState('');
  const [interests, setInterests] = useState(['']);
  const [events, setEvents] = useState(['']);

  const realm = useRealm();
  const user = useUser();

  function handleSave() {
    console.log(name, role, school,paGroupNumber, wwTrack,interests,events)
    realm.write(() => {
      realm.create('Wildcat', {
        _id: user?.id,
        name,
        role,
        school,
        paGroupNumber,
        wwTrack,
        interests,
        events
      });
    });
  };

  console.log ('realm file', Realm.defaultPath);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Name:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={text => setName(text)}
        value={name}
      />

      <Text>Role:</Text>
      <Picker
        selectedValue={role}
        onValueChange={(itemValue, itemIndex) => setRole(itemValue)}>
        <Picker.Item label="Student" value="student" />
        <Picker.Item label="Staff" value="staff" />
      </Picker>

      {role === 'student' && (
        <View>
          <Text>School:</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={text => setSchool(text)}
            value={school}
          />

          <Text>PA Group Number:</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={text => setPaGroupNumber(text)}
            value={paGroupNumber}
          />

          <Text>WW Track:</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={text => setWwTrack(text)}
            value={wwTrack}
          />


          <Text>Interests:</Text>
          {/* Implement selection of interests, e.g., using checkboxes */}
        </View>
      )}

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};
