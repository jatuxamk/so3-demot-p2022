import React, {useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const App : React.FC = () : React.ReactElement => {

  const [nimi, setNimi] = useState<string>("");
  const [tervehdys, setTervehdys] = useState<string>("");

  const sanoHeippa = () : void => {

    setTervehdys(`Heippa, ${nimi}!`);

  }

  return (
    <View style={styles.container}>
      
      <Text style={{ fontSize : 20}}>Demo 3: React Native -perusteita</Text>
      
      <Text style={styles.alaotsikko}>"Hello world"</Text>

      <TextInput
        style={styles.tekstikentta} 
        placeholder='Anna nimesi...'
        onChangeText={(teksti : string) => { setNimi(teksti) }}
      />

      <Button 
        title='Sano heippa'
        onPress={ sanoHeippa }
      />

      <Text style={styles.tervehdys}>{tervehdys}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding : 20,
    paddingTop : 30
  },
  alaotsikko: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10
  },
  tekstikentta : {
    paddingBottom : 20
  },
  tervehdys : {
    paddingTop : 20,
    fontSize : 14
  }
});

export default App;
