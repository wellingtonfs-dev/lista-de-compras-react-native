import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',    
    width: '100%',
  },
  input:{        
    borderWidth: 1,
    width: '70%',
    borderColor: '#000',
    borderRadius: 8,
    padding: 16,
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  inputQtd:{     
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 16,
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  button:{    
    justifyContent: 'center',
    paddingRight: 10
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTextContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  listItemText: {
    flex: 1,
  },
  quantityText: {
    marginLeft: 10,
    textAlign: 'right',
    width: 50, 
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  list:{    
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 16,
    margin: 5,
    fontSize: 18, 
    backgroundColor: '#fff',    
  },
  removeItemButton:{
    marginLeft: 5,
  },
  editItemButton:{
    marginLeft: 5,
  },
  increaseQuantityButton:{
    marginLeft: 5,
  },
  decreaseQuantityButton:{
    marginLeft: 5,
  },
  checkbox: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  }
});
