import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class Card extends Component {
  render() {
    return (
      <View style={styles.imgContainer}>
        <Text> card </Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    imgContainer: {
        backgroundColor: 'gray',
        width: 170,
        height: 170,
        margin: 10,
        borderRadius: 10,
    },
})