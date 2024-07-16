import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Text, Input, Button} from '@rneui/base';
import {colors} from './Colors';

type Props = {
  onSubmit: (
    {name}: {name: string},
    {role}: {role: string},
    {school}: {school: string},
    {paGroup}: {paGroup: string},
    {wwTrack}: {wwTrack: string},
    {interests}: {interests: string}
  ) => void;
};

export function CreateUserPrompt(props: Props): React.ReactElement<Props> {
  const {onSubmit} = props;
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [school, setSchool] = useState('');
  const [paGroup, setPAGroup] = useState('');
  const [wwTrack, setWWTrack] = useState('');
  const [interests, setInterests] = useState('');

  return (
    <SafeAreaProvider>
      <View style={styles.modalWrapper}>
        <Text h3 style={styles.addEventTitle}>
          Create New User
        </Text>

        <Text style={styles.addEventLabel}>
          User Name
        </Text>
        <Input
          onChangeText={(text: string) => setName(text)}
        />

        <Text style={styles.addEventLabel}>
          Role
        </Text>
        <Input
          onChangeText={(text: string) => setRole(text)}
        />

        <Text style={styles.addEventLabel}>
          School
        </Text>
        <Input
          onChangeText={(text: string) => setSchool(text)}
        />

        <Text style={styles.addEventLabel}>
          PA Group
        </Text>
        <Input
          onChangeText={(text: string) => setPAGroup(text)}
        />

        <Text style={styles.addEventLabel}>
          Wildcat Welcome Track
        </Text>
        <Input
          onChangeText={(text: string) => setWWTrack(text)}
        />

        <Text style={styles.addEventLabel}>
          Interests
        </Text>
        <Input
          onChangeText={(text: string) => setInterests(text)}
        />

        <Button
          title="Save"
          buttonStyle={styles.saveButton}
          onPress={() => onSubmit({name}, {role}, {school}, {paGroup}, {wwTrack}, {interests} )}
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
