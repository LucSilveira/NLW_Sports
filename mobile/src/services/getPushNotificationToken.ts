import * as Notifications from 'expo-notifications'
import * as Application from 'expo-application';
import Constants from 'expo-constants';

export async function getPushNotificationToken(){
  const { granted } = await Notifications.getPermissionsAsync();

  if( !granted ){
    await Notifications.requestPermissionsAsync();
  }

  if( granted ){
    const id = Constants.expoConfig

    // const pushToken = (await Notifications.getExpoPushTokenAsync({ projectId :  }) ).data;

    console.log(`Notify token  - ${id}`)
    return 'pushToken'
  }
}