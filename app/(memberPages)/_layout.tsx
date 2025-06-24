import Colors from '@/constants/AppColors';
import AppTabs from '@/constants/PagesLister';
import { useAppContext } from '@/contexts/AppContext';
import normaliseString from '@/utils/normaliseString';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text } from 'react-native';

export default function MemberPagesLayout() {
  const {member} = useAppContext();
  const memberTabs = AppTabs.filter((tab) => tab.for === 'member' || tab.for === 'user');

  return (<>
    {<Tabs
      screenOptions={({ route }) => {
        const tabConfig = memberTabs.find((t) => normaliseString(t.name) === route.name);
        const shouldHideTabBar = !member;
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
            shouldHideTabBar ? { display: 'none' } : // à décommenter pour cacher la tab bar si membre n'est pas connecté
            { height: 60 },
          headerShown: false,
        };
      }}
      >
      {memberTabs.map((tab) => (
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
