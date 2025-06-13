import AppContextUpdater from '@/components/AppContextUpdater';
import { AppContextProvider } from '@/contexts/AppContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
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
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (<>
    <AppContextProvider>
      <AppContextUpdater />
      <Stack>
        <Stack.Screen 
          name="(main)" 
          options={{ headerShown: false}} 
        />
        <Stack.Screen 
          name="+not-found" 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="login" 
          options={{ headerShown: false}}
        />
      </Stack>
      <StatusBar style="auto" />
    </AppContextProvider>
  </>
  );
}
