import React from 'react';
import { Text, View } from 'react-native';

export default function HeaderText(props) {
  return (
      <Text style={{ fontSize: 20, color: '#0047b3', fontWeight: "bold", textTransform: "uppercase" }}>
        {props.titleName}
      </Text>
  );
}
