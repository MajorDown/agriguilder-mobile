import Colors from '@/constants/AppColors';
import AppTabs from '@/constants/PagesLister';
import { useAdminContext } from '@/contexts/adminContext';
import normaliseString from '@/utils/normaliseString';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text } from 'react-native';

export default function AdminPagesLayout() {
  const {admin, guildConfig} = useAdminContext();
  const adminTabs = AppTabs.filter((tab) => tab.for === 'admin' || tab.for === 'user');
  
  return (<>
    {<Tabs
      screenOptions={({ route }) => {
        const tabConfig = adminTabs.find((t) => normaliseString(t.name) === route.name);
        const shouldHideTabBar = !admin;
        return {
          tabBarIcon: ({ focused }) =>
            tabConfig ? (
              <Image
              source={focused ? tabConfig.active : tabConfig.inactive}
              style={{ width: 24, height: 24 }}
              />
            ) : null,
            tabBarLabel: ({ focused }) => (
              <Text style={{ 
                color: focused ? Colors.dark : Colors.global,
                paddingTop: 5
              }}>
              {tabConfig ? tabConfig.name : ''}
            </Text>
          ),
          tabBarActiveTintColor: Colors.light,
          tabBarInactiveTintColor: Colors.global,
          tabBarActiveBackgroundColor: Colors.light,
          tabBarInactiveBackgroundColor: Colors.dark,
          tabBarStyle: 
            // shouldHideTabBar ? { display: 'none' } : // à décommenter pour cacher la tab bar s admin n'est pas connecté
            { height: 60 },
          headerShown: false,
        };
      }}
      >
      {adminTabs.map((tab) => (
        <Tabs.Screen
          key={normaliseString(tab.name)}
          name={normaliseString(tab.name)}
          options={{
            headerShown: false,
          }}
        />
      ))}
    </Tabs>}
  </>);
}
