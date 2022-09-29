import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Appbar, Dialog, Button, TextInput, Portal, Provider, Title } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

interface DialogiData {
  auki : boolean,
  teksti : string
}

interface Ostos {
  id : number,
  ostos : string
}

const db : SQLite.WebSQLDatabase = SQLite.openDatabase("ostoslista.db");

db.transaction(
  (tx : SQLite.SQLTransaction) => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS ostokset (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    ostos TEXT
                  )`);
  }, 
  (err: SQLite.SQLError) => {
    console.log(err);
  }
);

export default function App() {

  const [ostokset, setOstokset] = useState<Ostos[]>([]);
  const [dialogi, setDialogi] = useState<DialogiData>({
                                                        auki : false,
                                                        teksti : ""
                                                      });

  const lisaaOstos = () : void => {

    db.transaction(
      (tx : SQLite.SQLTransaction) => {
        tx.executeSql(`INSERT INTO ostokset (ostos) VALUES (?) `, [dialogi.teksti]);
      }, 
      (err: SQLite.SQLError) => console.log(err), 
      () => console.log("Ostos lisätty!")  
    );

    setDialogi({auki : false, teksti : ""});

  }

  const haeOstokset = () : void => {

    db.transaction(
      (tx : SQLite.SQLTransaction) => {
        tx.executeSql(`SELECT * FROM ostokset`, [], 
        (_tx : SQLite.SQLTransaction, rs : SQLite.SQLResultSet) => {
          setOstokset(rs.rows._array);
        });

      }, 
      (err: SQLite.SQLError) => console.log(err),
      () => console.log("Ostokset Haettu")
    );

  }

  useEffect(() => {

    haeOstokset();
    console.log(ostokset);
  }, []);

  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Content title="Demo 6: SQLite"/>
      </Appbar.Header>
      <ScrollView style={{ padding : 20 }}>
        
        <Title>Ostoslista</Title>

        { (ostokset.length > 0)
        ? <Text>ostokset tähän</Text>
        : <Text>Ei ostoksia</Text>      
        }

        <Button
          style={{ marginTop : 20 }}
          mode='contained'
          icon="plus"
          onPress={ () => setDialogi({auki: true, teksti: ""}) }
        >Lisää uusi ostos</Button>

        <Portal>
          <Dialog 
            visible={dialogi.auki}
            onDismiss={() => setDialogi({auki : false, teksti: ""})} 
          >
            <Dialog.Title>Lisää uusi ostos</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Ostos"
                mode="outlined"
                placeholder='Kirjoita ostos...'
                onChangeText={ (uusiOstos : string) => setDialogi({ ...dialogi, teksti : uusiOstos}) }
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={lisaaOstos}>Lisää listaan</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </ScrollView>
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
