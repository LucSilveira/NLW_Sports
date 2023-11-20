import * as Notifications from 'expo-notifications'
import * as Application from 'expo-application';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export async function getPushNotificationToken(){
  const { granted } = await Notifications.getPermissionsAsync();

  if( !granted ){
    await Notifications.requestPermissionsAsync();
  }

  if( granted ){
    // https://expo.dev/accounts/[ACCOUNT_NAME]/projects 
    let pushToken = await Notifications.getExpoPushTokenAsync({ projectId : `1ab7e777-83b9-461c-8a00-75f152fab6d1` });
    
    console.log(pushToken)
    
    return pushToken.data
  }
}