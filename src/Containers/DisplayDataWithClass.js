import React, { Component } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./DisplayDataWithFC";

export default class DisplayDataWithClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      myArray: [],
      isEditPressed: false,
      currentIndex: 0,
    };
  }

  onButtonPress = () => {
    const { isEditPressed, myArray, data, currentIndex } = this.state;
    if (isEditPressed) {
      const arr = myArray;
      arr.splice(currentIndex, 1, data);
      this.setState({ myArray: arr, isEditPressed: false });
    } else {
      this.setState((prevState) => ({
        myArray: [...this.state.myArray, this.state.data],
      }));
    }
    this.setState({ data: "" });
  };

  onChangeText = (text) => {
    this.setState({ data: text });
  };

  onEditPress = (item, index) => {
    this.setState({ data: item, currentIndex: index, isEditPressed: true });
  };
  onDeletePress = (index) => {
    const arr = this.state.myArray;
    arr.splice(index, 1);
    this.setState({ myArray: arr });
  };

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item}</Text>
        <Button
          title={"Edit"}
          onPress={() => this.onEditPress(item, index)}
          testID={"edit-button"}
        />
        <Button
          title={"Delete"}
          onPress={() => this.onDeletePress(index)}
          testID={"delete-button"}
        />
      </View>
    );
  };

  renderData = () => {
    const { myArray } = this.state;
    return (
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={myArray}
        renderItem={this.renderItem}
        keyExtractor={(item) => item}
      />
    );
  };

  renderContent = () => {
    const { data } = this.state;
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{"Enter Value"}</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.onChangeText}
          value={data}
          placeholder="Please enter the number"
          keyboardType="numeric"
          testID="section-textInput"
        />

        <Button
          disabled={!data ? true : false}
          title={"Press me"}
          testID="section-button"
          onPress={this.onButtonPress}
        />
        {this.renderData()}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.mainContainerStyle}>
        {this.renderContent()}
      </SafeAreaView>
    );
  }
}
