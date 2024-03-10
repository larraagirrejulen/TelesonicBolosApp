
import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { useEventContext } from 'contexts/eventContext';
import { useUserContext } from 'contexts/userContext';

import { SERVER_IP } from '@env';
import COLORS from 'config/colors';
import IMAGES from 'config/images';
import STYLES from 'config/styles';


const AgendaItem = ({item, navigation}: any) => {

  const {setEvent} = useEventContext();
  const {user} = useUserContext();

  const [parte, setParte] = useState(false);

  const itemPressed = useCallback(() => {
    setEvent(item);
    navigation.navigate('TopTabBar', item)
  }, []);

  useFocusEffect(()=>{
    axios.post(SERVER_IP + '/api/getParteHoras', {email: user?.email, eventId: item.id, eventDate: item.date})
    .then((response) => { 
      if(response.data.found){
        setParte(true);
      }
    });
  })



  return (
    <TouchableOpacity onPress={itemPressed} style={{...styles.item, ... STYLES.shadow}}>
      <Text style={styles.text}>{item.title}</Text>{parte && <Image source={IMAGES.check} resizeMode='contain' style={{height: 25, width: 25, tintColor: COLORS.appThemeColor}} />}
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
  text: {
    ... STYLES.text,
    fontWeight: 'bold',
    width: 250,
    textAlign: 'left',
    marginLeft: 15
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  }
});