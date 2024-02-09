
import React, {useCallback} from 'react';
import {StyleSheet, Alert, View, Text, TouchableOpacity, Button} from 'react-native';


const AgendaItem = (props: any) => {
  const {item} = props;

  const buttonPressed = useCallback(() => {
    Alert.alert('Show me more');
  }, []);

  const itemPressed = useCallback(() => {
    Alert.alert(item.title);
  }, []);

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item}>
        <View>
            <Text style={styles.itemHourText}>{}</Text>
            <Text style={styles.itemDurationText}>{}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
            <Button color={'grey'} title={'Info'} onPress={buttonPressed}/>
        </View>
    </TouchableOpacity>
  );
};

export default React.memo(AgendaItem);


const styles = StyleSheet.create({
  item: {
    padding: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 15,
    marginTop: 8,
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    marginHorizontal: 12
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
    width: 200
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  }
});