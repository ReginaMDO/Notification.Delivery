import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, Image } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  
  

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      navigation.navigate('Details')
    });

    agendaNot();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          marginBottom:290,
          backgroundColor:'green'
        }}>
          <Text style={{color:'white', fontSize:20, marginTop:20}}>Bem-vindo ao PEDIDOS JÁ!</Text>
          <Image
            style={{
              width: 370,
              height: 250,
              marginTop:-40
            }}
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwrb4wMuWeM0ShBJnhcKxX3LPeoQD5bwkcXQ&usqp=CAU'
            }}
           />
        <Button
          title="Testar notificação"
          onPress={async () => {
            await schedulePushNotification();
          }}
        />
      </View>
  );
}

function agendaNot() {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Cupom disponível",
      body: 'Aproveite, 15% só hoje!!!',
    },
    trigger: { seconds: 60 * 5},
  });

  Notifications.scheduleNotificationAsync({
    content: {
      title: "Está chegando a hora do lanche...",
      body: 'Aproveite as nossas opções de lanches!',
    },
    trigger: { seconds: 60 * 10},
  });

  Notifications.scheduleNotificationAsync({
    content: {
      title: "Imperdível!!!",
      body: 'Hoje, o seu pedido tem frete gratis + 30% de desconto.s',
    },
    trigger: { seconds: 60 * 15},
  });
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Seja bem-vindo ao PEDIDOS JÁ!!!",
      body: 'Comidas preparadas na hora!',
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}