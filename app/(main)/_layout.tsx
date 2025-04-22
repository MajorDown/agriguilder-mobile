import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

type AppTab = {
  name: string;
  title: string,
  for: 'user' | 'admin' | 'member';
}

export default function MainLayout() {

  const AppTabs: AppTab[] = [
    {
      name: 'Outils',
      title: 'les outils de la guilde',
      for: 'admin',
    },
    {
      name: 'Membres',
      title: 'les membres de la guilde',
      for: 'admin',
    },
    {
      name: 'Arbitrage',
      title: 'Arbitrage des contestations',
      for: 'admin',
    },
    {
      name: 'Règlement',
      title: 'règlement de la guilde',
      for: 'user',
    },
    {
      name: 'Options',
      title: 'options et paramètres',
      for: 'user',
    },
    {
      name: 'Déclarer',
      title: 'déclarer une nouvelle intervention',
      for: 'member',
    },
    {
      name: 'Historique',
      title: 'historique de vos interventions',
      for: 'member',
    },
    {
      name: 'Soldes',
      title: 'les membres de la guilde',
      for: 'member',
    },

  ]

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'red',
        headerShown: false,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
