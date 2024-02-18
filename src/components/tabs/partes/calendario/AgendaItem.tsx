
import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { useEventContext } from 'src/contexts/eventContext';
import { reusableStyles } from 'styles/reusableStyles';


const AgendaItem = ({item, navigation}: any) => {

  const {setEvent} = useEventContext();

  const itemPressed = useCallback(() => {
    setEvent(item);
    navigation.navigate('Event', item)
  }, []);

  return (
    <TouchableOpacity onPress={itemPressed} style={{...styles.item, ... reusableStyles.shadow}}>
      <Text style={styles.itemTitleText}>{item.title}</Text>
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