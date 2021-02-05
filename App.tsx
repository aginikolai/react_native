import React, {useEffect} from 'react';
import { AsyncStorage } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import {SourceSansPro_600SemiBold} from '@expo-google-fonts/source-sans-pro';
import {OpenSans_400Regular} from '@expo-google-fonts/open-sans';
import {useLocalStore} from 'mobx-react';

import Navigation from "./Navigation";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    SourceSansPro_600SemiBold,
    OpenSans_400Regular,
    Inter_700Bold
  });

  let store: object | null | undefined;

  const loadDoctors = async () => {
    const doctors: string | null = await AsyncStorage.getItem('doctors');
    if (doctors != null) {
      console.log(JSON.parse(doctors));
      store = useLocalStore(() => (
        [JSON.parse(doctors)]
      ));
    }
  };

  useEffect(() => {
    loadDoctors();
    console.log(store);
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Navigation />
}
