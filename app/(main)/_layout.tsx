import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Colors from '@/constants/Colors';
import AppTabs from '@/components/AppTabs';

export default function MainLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark,
        tabBarInactiveTintColor: Colors.global,
        tabBarActiveBackgroundColor: Colors.light,
        tabBarInactiveBackgroundColor: Colors.dark,
        headerShown: false,
        tabBarStyle: Platform.select({
          default: {
            backgroundColor: Colors.dark,
            position: 'absolute',
            borderTopWidth: 1,
            borderColor: Colors.light,
            borderRadius: 10,
            height: 60,
            paddingTop: 10
          },
        }),
      }}>
      <AppTabs />
    </Tabs>
  );
}
