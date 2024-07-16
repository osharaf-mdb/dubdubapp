import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {AppProvider, UserProvider, RealmProvider} from '@realm/react';
import {appId, baseUrl} from '../atlasConfig.json';

import {App} from './App';
import {WelcomeView} from './WelcomeView';

import {Event} from './EventSchema';
import {Wildcat} from './UserSchema';

const LoadingIndicator = () => {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export const AppWrapper = () => {
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={WelcomeView}>
        <RealmProvider
          schema={[Event, Wildcat]}
          sync={{
            flexible: true,
            onError: (_session, error) => {
              // Show sync errors in the console
              console.error(error);
            },
          initialSubscriptions: {
            update(subs, realm) {
              subs.add(realm.objects('Wildcat')),
              subs.add(realm.objects('Event'))
            },
          }
          }}
          fallback={LoadingIndicator}>
          <App />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});