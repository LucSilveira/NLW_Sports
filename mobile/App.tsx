import { useRef, useEffect, useState  } from 'react';
import { StatusBar  } from 'react-native';
import {
  useFonts,
  Inter_400Regular, Inter_600SemiBold,
  Inter_700Bold, Inter_900Black
} from '@expo-google-fonts/inter';

import { Routes } from './src/routes'
import { Loading } from './src/components/Loading/'
import { Background } from './src/components/Background';

import './src/services/notificationConfig'
import * as Notifications from 'expo-notifications'
import { getPushNotificationToken } from './src/services/getPushNotificationToken'

import { Subscription } from 'expo-modules-core'

export default function App() {
  const [fontsCarregadas] = useFonts({
    Inter_400Regular, Inter_600SemiBold,
    Inter_700Bold, Inter_900Black
  });

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, [])

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener( notify => {
      console.log(notify)
    });

    responseNotificationListener.current = Notifications.addNotificationReceivedListener(resp => {
      console.log(resp)
    })

    return () => {
      if(getNotificationListener.current && responseNotificationListener.current){
        Notifications.removeNotificationSubscription(getNotificationListener.current)
        Notifications.removeNotificationSubscription(responseNotificationListener.current)
      }
    }
  }, [])

  return (
    <Background>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      { fontsCarregadas ?  <Routes /> :  <Loading />}

    </Background>
  );
}
