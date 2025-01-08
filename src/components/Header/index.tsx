import React from 'react';
import { View, Text } from 'react-native';
import {FontAwesome6} from '@expo/vector-icons'

import { styles } from './styles';

export function Header() {
  return (
    <View style={styles.container}>
        <FontAwesome6 name="cart-shopping" size={24} color="white" />
        <Text style={styles.text}>Meu carrinho</Text>
    </View>
  );
}