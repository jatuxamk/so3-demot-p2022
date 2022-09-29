import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Appbar, Title } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

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

  const [ostokset, setOstokset] = useState<string[]>([]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Demo 6: SQLite"/>
      </Appbar.Header>
      <ScrollView style={{ padding : 20 }}>
        
        <Title>Ostoslista</Title>

        { (ostokset.length > 0)
        ? <Text>ostokset tähän</Text>
        : <Text>Ei ostoksia</Text>      
        }


      </ScrollView>
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
});
