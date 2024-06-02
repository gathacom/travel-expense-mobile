import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function Button({ onPress, title = 'Save', bgColor = 'primary', width = '100%',style }) {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
      paddingHorizontal: 20,
      borderRadius: 4,
      fontSize: 24,
      backgroundColor: COLORS[bgColor],
      width: width,
      style,
    },
    text: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}



