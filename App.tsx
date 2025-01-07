import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from './src/components/Header';

import { ItemInput } from './src/components/ItemInput';

export default function App() {
  return (
    <View style={styles.container}>
      <Header/>      
      <ItemInput/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',    
  },
});
