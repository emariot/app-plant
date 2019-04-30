import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Modal,
  FlatList,
  ScrollView
} from "react-native";

import { Button, Block, Text } from "../components";
import { theme } from "../constants";

const { width, height } = Dimensions.get("window");

class Welcome extends Component {
  static navigationOptions = {
    header: null
  };

  scrollX = new Animated.Value(0);

  state = {
    showTerms: false
  };

  renderTermsService() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showTerms}
        onRequestClose={() => {}}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light>
            Terms of Services
          </Text>
          <ScrollView style={{ paddingVertical: theme.sizes.padding }}>
            <Text caption gray height={18}>
              You may use the Expo Pages static hosting service solely as
              permitted and intended to host your organization pages, personal
              pages, or project pages, and for no other purpose. You may not use
              Expo Pages in violation of Expo's trademark or other rights or in
              violation of applicable law. Expo reserves the right at all times
              to reclaim any Expo subdomain without liability to you.
            </Text>
            <Text caption gray height={18}>
              You may use the Expo Pages static hosting service solely as
              permitted and intended to host your organization pages, personal
              pages, or project pages, and for no other purpose. You may not use
              Expo Pages in violation of Expo's trademark or other rights or in
              violation of applicable law. Expo reserves the right at all times
              to reclaim any Expo subdomain without liability to you.
            </Text>
            <Text caption gray height={18}>
              You may use the Expo Pages static hosting service solely as
              permitted and intended to host your organization pages, personal
              pages, or project pages, and for no other purpose. You may not use
              Expo Pages in violation of Expo's trademark or other rights or in
              violation of applicable law. Expo reserves the right at all times
              to reclaim any Expo subdomain without liability to you.
            </Text>
          </ScrollView>
          <Button gradient onPress={() => this.setState({ showTerms: false })}>
            <Text center white>
              I understand
            </Text>
          </Button>
        </Block>
      </Modal>
    );
  }

  renderIlustrations() {
    const { ilustrations } = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={ilustrations}
        extraData={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 2.3, overflow: "visible" }}
          />
        )}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { x: this.scrollX } }
          }
        ])}
      />
    );
  }
  renderSteps() {
    const { ilustrations } = this.props;
    const stepPosition = Animated.divide(this.scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {ilustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp"
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps, { opacity }]}
            />
          );
        })}
      </Block>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block>
        <Block center bottom flex={0.3}>
          <Text h1 center bold>
            Your home.
            <Text h1 primary>
              {" "}
              Greener.
            </Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 5 }}>
            Enjoy the experience.
          </Text>
        </Block>
        <Block center middle>
          {this.renderIlustrations()}
          {this.renderSteps()}
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate("Login")}>
            <Text center semibold white>
              Login
            </Text>
          </Button>
          <Button
            shadow
            style={{ elevation: 1 }}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text center semibold>
              SignUp
            </Text>
          </Button>
          <Button onPress={() => this.setState({ showTerms: true })}>
            <Text center caption gray>
              Terms of Service
            </Text>
          </Button>
        </Block>
        {this.renderTermsService()}
      </Block>
    );
  }
}

Welcome.defaultProps = {
  ilustrations: [
    { id: 1, source: require("../assets/images/illustration_1.png") },
    { id: 2, source: require("../assets/images/illustration_2.png") },
    { id: 3, source: require("../assets/images/illustration_3.png") }
  ]
};

export default Welcome;
const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  }
});
