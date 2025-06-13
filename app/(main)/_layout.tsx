import Colors from '@/constants/AppColors';
import { Tabs } from 'expo-router';
import React from 'react';

export default function MainLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark,
        tabBarInactiveTintColor: Colors.global,
        tabBarActiveBackgroundColor: Colors.light,
        tabBarInactiveBackgroundColor: Colors.dark,
        headerShown: false,
      }}>
      {/* <AppTabs /> */}
    </Tabs>
  );
}

