import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Block, Text, Button } from "../components";
import { theme } from "../constants";

class Browse extends Component {
  render() {
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Browse
          </Text>
          <Button>
            <Image
              source={}
              style={styles.avatar}
            />
          </Button>
        </Block>
      </Block>
    );
  }
}
export default Browse
const styles = StyleSheet.create({
  header:{
    paddingHorizontal: theme.sizes.base *2.2,
  },
  avatar:{
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  }
});
