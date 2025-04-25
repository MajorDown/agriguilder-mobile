import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import AppTabs from '@/constants/AppTabs';
import Colors from '@/constants/Colors';
import TabsIcon from '@/components/TabsIcon';

export default function MainLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light,
        tabBarInactiveTintColor: Colors.global,
        tabBarActiveBackgroundColor: Colors.dark,
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
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <TabsIcon title={"home"} icon={require('@/assets/images/icons/declarer-white-light.png')} />,
        }}
      />
    </Tabs>
  );
}
