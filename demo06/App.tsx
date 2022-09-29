import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Appbar, Dialog, Button, IconButton, List, TextInput, Portal, Provider, Title } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

interface DialogiData {
  auki : boolean,
  teksti : string
}

interface Ostos {
  id : number,
  ostos : string,
  poimittu : number
}

const db : SQLite.WebSQLDatabase = SQLite.openDatabase("ostoslista.db");

db.transaction(
  (tx : SQLite.SQLTransaction) => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS ostokset (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    ostos TEXT,
                    poimittu INTEGER
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
        tx.executeSql(`INSERT INTO ostokset (ostos, poimittu) VALUES (?, ?) `, [dialogi.teksti, 0], 
        (_tx : SQLite.SQLTransaction, rs : SQLite.SQLResultSet) => {
          haeOstokset();
        });
      }, 
      (err: SQLite.SQLError) => console.log(err), 
      () => console.log("Ostos lisätty!")  
    );

    setDialogi({auki : false, teksti : ""});

  }

  const poimiOstos = (id : number, tila : number) : void => {

    db.transaction(
      (tx : SQLite.SQLTransaction) => {
        tx.executeSql(`UPDATE ostokset SET poimittu = ? WHERE id = ? `, [tila, id], 
        (_tx : SQLite.SQLTransaction, rs : SQLite.SQLResultSet) => {
          haeOstokset();
        });
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

  const tyhjennaOstoslista = () : void => {

    db.transaction(
        (tx : SQLite.SQLTransaction) => {
          tx.executeSql(`DELETE FROM ostokset`, [], 
          (_tx : SQLite.SQLTransaction, rs : SQLite.SQLResultSet) => {
            haeOstokset();
          });
        }, 
        (err: SQLite.SQLError) => console.log(err), 
        () => console.log("Lista tyhjennetty")  
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
        ? ostokset.map((ostos: Ostos, idx : number) => <List.Item 
                                                          title={ostos.ostos} 
                                                          key={idx} 
                                                          left={() => <IconButton 
                                                                        icon={(ostos.poimittu === 0)?"checkbox-blank-outline":"checkbox-outline"}
                                                                        onPress={() => { poimiOstos(ostos.id, (ostos.poimittu === 0)?1:0) }} 
                                                                      />}
                                                        />) 
        : <Text>Ei ostoksia</Text>      
        }

        <Button
          style={{ marginTop : 20 }}
          mode='contained'
          icon="plus"
          onPress={ () => setDialogi({auki: true, teksti: ""}) }
        >Lisää uusi ostos</Button>

        <Button
          style={{ marginTop : 20 }}
          buttonColor="red"
          mode='contained'
          icon="delete"
          onPress={tyhjennaOstoslista}
        >Tyhjennä lista</Button>

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
