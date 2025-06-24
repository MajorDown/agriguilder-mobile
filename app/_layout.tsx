import AppContextUpdater from '@/components/AppContextUpdater';
import { AppContextProvider } from '@/contexts/AppContext';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    NavigationBar.setVisibilityAsync('hidden');
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (<>
    <AppContextProvider>
      <AppContextUpdater />
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false}} 
        />
        <Stack.Screen 
          name="login" 
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name="+not-found" 
          options={{headerShown: false}}
        />
      </Stack>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
        animated
      />
    </AppContextProvider>
  </>
  );
}
