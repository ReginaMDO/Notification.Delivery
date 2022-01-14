import React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function DetailsScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'green' }}>
        <Text style={{fontSize:24, color:'black'}}>Tela destino da notificação</Text>
        <Image
            style={{
              width: 370,
              height: 450,
              marginTop:40
            }}
            source={{
              uri:
                'https://www.ecobikecourier.com.br/uploads/img/blog_posts/6/874e59eb1b34db3b1744c487aa2e40b6.jpg'
            }}
           />
      </View>
    );
}

export default DetailsScreen;