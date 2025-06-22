import Colors from '@/constants/AppColors';
import AppTabs from '@/constants/PagesLister';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

export default function AdminPagesLayout() {
  const adminTabs = AppTabs.filter((tab) => tab.for === 'admin' || tab.for === 'user');

  return (
    <Tabs
      screenOptions={({ route }) => {
        const tabConfig = adminTabs.find((t) => t.name === route.name);
        return {
          tabBarIcon: ({ focused }) =>
            tabConfig ? (
              <Image
                source={focused ? tabConfig.active : tabConfig.inactive}
                style={{ width: 24, height: 24 }}
              />
            ) : null,
          tabBarActiveTintColor: Colors.light,
          tabBarInactiveTintColor: Colors.global,
          tabBarActiveBackgroundColor: Colors.dark,
          tabBarInactiveBackgroundColor: Colors.dark,
          headerShown: false,
        };
      }}
    >
      {adminTabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
          }}
        />
      ))}
    </Tabs>
  );
}
