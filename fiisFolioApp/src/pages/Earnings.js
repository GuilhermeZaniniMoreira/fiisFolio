import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Earnings(props) {
  const {data} = props.route.params;
  const [fiis, setFiis] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (data) {
      const object = data.map((fii, idx) => {
        return {
          key: `${idx}`,
          fii: fii[0],
          quantity: fii[1],
        };
      });
      setText(JSON.stringify(object));
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
  },
});
