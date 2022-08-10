import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Home = (props) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.textStyle}
      >{`Hello Everyone! \n Welcome to Unit Testcase Demo!`}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Demo with Statefull Component"
          onPress={() => props.navigation.navigate("DisplayDataWithClass")}
          style={styles.buttonStyle}
          testID="class-component-button"
        />
        <Button
          title="Demo with Stateless Component"
          onPress={() => props.navigation.navigate("DisplayDataWithFC")}
          style={styles.buttonStyle}
          accessibilityLabel="Press Me"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: { flex: 0.8, marginVertical: 25, justifyContent: "center" },
  textStyle: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 25,
    lineHeight: 50,
  },
  buttonStyle: {
    // height: 120,
    // width: 180
  },
});

export default Home;
