import React, {useState, useRef, MutableRefObject} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View } from 'react-native';
import { Appbar, Button, FAB, Text } from 'react-native-paper';
import { Camera, CameraCapturedPicture } from 'expo-camera'

const App : React.FC = () : React.ReactElement => {
  
    const [virhe, setVirhe] = useState<string>("");
    const [kuvaustila, setKuvaustila] = useState<boolean>(false);
    const [kuvaustilaInfo, setKuvaustilaInfo] = useState<string>("");
    const [kuva, setKuva] = useState<CameraCapturedPicture>();

    const kameraRef : any = useRef<Camera>();

    const kaynnistaKamera = async () : Promise<void> => {

      const {status} = await Camera.requestCameraPermissionsAsync();

      if (status === "granted") {
        setKuvaustila(true);
        setVirhe(""); 
      } else {
        setVirhe("Ei sallittu!"); 
      }  

    }
  
    const otaKuva = async () : Promise<void> => {

      setKuvaustilaInfo("Odota hetki...");

      if (kameraRef) {

        const apukuva : CameraCapturedPicture = await kameraRef.current.takePictureAsync();

        setKuva(apukuva);
        
      }

      setKuvaustila(false);
      setKuvaustilaInfo("");

    }

  return (
    (kuvaustila)
    ?<Camera style={styles.kameranakyma} ref={kameraRef}>

        <Text style={{color : "#fff"}}>{kuvaustilaInfo}</Text>

        <FAB
          style={styles.nappiOtaKuva}
          icon="camera"
          label='Ota kuva'
          onPress={otaKuva}
        />

        <FAB
          style={styles.nappiSulje}
          icon="close"
          label='Sulje'
          onPress={() => setKuvaustila(false)}
        />

     </Camera>
    :<>
      <Appbar.Header>
        <Appbar.Content title="Demo 5: Kamera" />
      </Appbar.Header>
      <View style={styles.container}>

        <Button
          icon="camera"
          mode="contained"
          onPress={kaynnistaKamera}
        >Ota kuva</Button>

        <Text>{virhe}</Text>

        {(kuva)
        ? <Image 
            style={styles.kuva}
            source={{ uri : kuva.uri}}
          />
        : null }

      </View>
      <StatusBar style="auto" />
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nappiSulje: {
    position : 'absolute',
    margin : 20,
    bottom : 0,
    right :0    
  },
  nappiOtaKuva: {
    position : 'absolute',
    margin : 20,
    bottom : 0,
    left :0    
  },  
  kameranakyma: {
    flex : 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kuva: {
    width: 300,
    height: 400,
    resizeMode: 'stretch'
  }
});


export default App;