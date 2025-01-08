import React, { useState, useEffect } from "react";
import {
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  ListRenderItemInfo,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as FileSystem from 'expo-file-system'; // Importar expo-file-system

import { styles } from "./styles";

interface ListItem {
  item: string;
  quantity: string;
  completed: boolean;
}

const filePath = FileSystem.documentDirectory + 'list.json'; // Caminho para salvar o arquivo

export function ItemInput() {
  const [item, setItem] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [list, setList] = useState<ListItem[]>([]);
  const [editingItem, setEditingItem] = useState<ListItem | null>(null);

  useEffect(() => {
    loadList(); // Carregar a lista ao iniciar o componente
  }, []);

  const saveList = async (newList: ListItem[]) => {
    try {
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(newList));
      console.log("Lista salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar a lista:", error);
    }
  };

  const loadList = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        setList(JSON.parse(fileContent));
      }
    } catch (error) {
      console.error("Erro ao carregar a lista:", error);
    }
  };

  const addItemToList = () => {
    if (item && quantity) {
      let newList;
      if (editingItem) {
        newList = list.map(i => i.item === editingItem.item ? { ...i, item, quantity } : i);
        setEditingItem(null);
      } else {
        newList = [...list, { item, quantity, completed: false }];
      }
      setList(newList);
      saveList(newList); // Salvar a lista sempre que ela for atualizada
      setItem('');
      setQuantity('');
    }
  };

  const toggleCompleted = (item: ListItem) => {
    const newList = list.map(i => i.item === item.item ? { ...i, completed: !i.completed } : i);
    setList(newList);
    saveList(newList);
  };

  const removeItem = (item: ListItem) => {
    const newList = list.filter((i) => i.item !== item.item);
    setList(newList);
    saveList(newList);
  };

  const increaseQuantity = (item: ListItem) => {
    const newList = list.map((i) =>
      i.item === item.item
        ? { ...i, quantity: `${parseInt(i.quantity) + 1}` }
        : i
    );
    setList(newList);
    saveList(newList);
  };

  const decreaseQuantity = (item: ListItem) => {
    const newList = list.map((i) =>
      i.item === item.item && i.quantity !== "1"
        ? { ...i, quantity: `${parseInt(i.quantity) - 1}` }
        : i
    );
    setList(newList);
    saveList(newList);
  };

  const renderItem = ({ item }: ListRenderItemInfo<ListItem>) => (
    <View style={styles.listItem}>
      <TouchableOpacity
        onPress={() => toggleCompleted(item)}
        style={styles.checkbox}
      >
        <FontAwesome
          name={item.completed ? "check-square-o" : "square-o"}
          size={20}
          color="black"
        />
      </TouchableOpacity>
      <View style={styles.itemTextContainer}>
        <Text
          style={[styles.listItemText, item.completed && styles.completedText]}
        >
          {item.item}
        </Text>
        <Text style={styles.quantityText}>{item.quantity} un.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.removeItemButton}
          onPress={() => removeItem(item)}
        >
          <FontAwesome name="trash" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editItemButton}
          onPress={() => {
            setItem(item.item);
            setQuantity(item.quantity);
            setEditingItem(item);
          }}
        >
          <FontAwesome name="edit" size={20} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.increaseQuantityButton}
          onPress={() => increaseQuantity(item)}
        >
          <FontAwesome name="plus-circle" size={20} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.decreaseQuantityButton}
          onPress={() => decreaseQuantity(item)}
        >
          <FontAwesome name="minus-circle" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o item"
          value={item}
          onChangeText={setItem}
        />
        <TextInput
          style={styles.inputQtd}
          placeholder="Qtd"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={addItemToList}>
          <FontAwesome name="cart-plus" size={30} color="green" />
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>Item</Text>
          <Text style={styles.listHeaderText}>Quantidade</Text>
        </View>
        <FlatList
          style={styles.list}
          data={list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
