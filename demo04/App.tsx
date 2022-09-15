import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import { Vibration, View } from 'react-native';
import { Appbar, Button, List } from 'react-native-paper';

export default function App() {

  const [naytaPerustiedot, setNaytaPerustiedot] = useState<boolean>(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content 
          title="Demo 4: React Native Paper"
        />
      </Appbar.Header>
      <View style={{paddingLeft : 10, paddingRight: 10}}>
        
        <List.Accordion
          title="Perustietoja"
          expanded={naytaPerustiedot}
          onPress={() => { setNaytaPerustiedot(!naytaPerustiedot) }}
        >
          <List.Item title="Merkki" description={Device.brand}/>
          <List.Item title="Malli" description={Device.modelName}/>
          <List.Item title="Käyttöjärjestelmä" description={Device.osName}/>
          <List.Item title="Versio" description={Device.osVersion}/>

        </List.Accordion>

        <Button 
          mode="contained"
          onPress={() => { Vibration.vibrate() }}  
        >Värinää!</Button>

        <StatusBar style="auto" />
      </View>
    </>
  );
}

