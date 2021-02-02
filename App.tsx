import React from 'react';
import { Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import {SourceSansPro_600SemiBold} from '@expo-google-fonts/source-sans-pro';
import {OpenSans_400Regular} from '@expo-google-fonts/open-sans'

import Navigation from "./Navigation";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    SourceSansPro_600SemiBold,
    OpenSans_400Regular,
    Inter_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Navigation />
}
