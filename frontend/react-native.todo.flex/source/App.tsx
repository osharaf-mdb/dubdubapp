import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Linking, Text, View, TextInput, Switch, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useObject, useUser} from '@realm/react';

import {dataExplorerLink} from '../atlasConfig.json';
import {LogoutButton} from './LogoutButton';
import {EventListView} from './EventDisplay';
import {OfflineModeButton} from './OfflineModeButton';

import { Wildcat } from './UserSchema';
import { CreateUser } from './CreateUserView';

const dataExplorerMessage = `View your data in MongoDB Atlas: ${dataExplorerLink}.`;
console.log(dataExplorerMessage);
const Stack = createStackNavigator();

const headerRight = () => {
  return <OfflineModeButton />;
};

const headerLeft = () => {
  return <LogoutButton />;
};

export const App = () => {
  const user = useUser();
  const targetObject = useObject(Wildcat, user?.id)
  
  console.log('TARGET OBJECT');
  console.log(targetObject);

  if (targetObject) {
    // if user already exists in the database, send them straight to the home screen
    return (
      <>
        {/* All screens nested in RealmProvider have access
              to the configured realm's hooks. */}
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Target Object Exists"
                component={EventListView}
                options={{
                  headerTitleAlign: 'center',
                  headerLeft,
                  headerRight,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
  
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Log in with the same account on another device or simulator to see
              your list sync in real time.
            </Text>
  
            {dataExplorerLink && (
              <View>
                <Text style={styles.footerText}>
                  You can view your data in MongoDB Atlas:
                </Text>
                <Text
                  style={[styles.footerText, styles.hyperlink]}
                  onPress={() => Linking.openURL(dataExplorerLink)}>
                  {dataExplorerLink}.
                </Text>
              </View>
            )}
          </View>
        </SafeAreaProvider>
      </>
    );
  } else { // send user to user creation page
    return (
      <>
        {/* All screens nested in RealmProvider have access
              to the configured realm's hooks. */}
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="New User"
                component={CreateUser}
                options={{
                  headerTitleAlign: 'center',
                  headerLeft,
                  headerRight,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
  
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Log in with the same account on another device or simulator to see
              your list sync in real time.
            </Text>
  
            {dataExplorerLink && (
              <View>
                <Text style={styles.footerText}>
                  You can view your data in MongoDB Atlas:
                </Text>
                <Text
                  style={[styles.footerText, styles.hyperlink]}
                  onPress={() => Linking.openURL(dataExplorerLink)}>
                  {dataExplorerLink}.
                </Text>
              </View>
            )}
          </View>
        </SafeAreaProvider>
      </>
    );
  };
};

const styles = StyleSheet.create({
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 4,
  },
  hyperlink: {
    color: 'blue',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});