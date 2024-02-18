import React from 'react';
import { View, ImageBackground} from 'react-native';
import IMAGES from 'src/constants/images'

const CustomBackground = ({ children }:any) => {

  return (
    <ImageBackground source={IMAGES.background} resizeMode="cover" style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.85)', alignItems: 'center' }}>
        {children}
      </View>
    </ImageBackground>
  );
};

export default CustomBackground;
