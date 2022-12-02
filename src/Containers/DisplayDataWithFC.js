/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

const Section = ({ title, buttonTitle }) => {
  const [data, setData] = React.useState(null);
  const [myArray, setMyArray] = React.useState([]);
  const [isEditPressed, setIsEditPressed] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const onEditPress = (value, index) => {
    setData(value);
    setCurrentIndex(index);
    setIsEditPressed(true);
  };

  const onDeletePress = (index) => {
    setCurrentIndex(index);
    const arr = myArray;
    arr.splice(index, 1);
    setMyArray([...arr]);
  };

  onButtonPress = () => {
    if (isEditPressed) {
      const arr = myArray;
      arr.splice(currentIndex, 1, data);
      setMyArray(arr);
      setIsEditPressed(false);
    } else {
      setMyArray((oldArray) => [...oldArray, data]);
    }
    setData("");
  };
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setData}
        value={data}
        placeholder="Please enter the number"
        keyboardType="numeric"
        testID="section-textInput"
      />

      <Button
        disabled={!data ? true : false}
        title={buttonTitle}
        testID="section-button"
        onPress={onButtonPress}
      />
      <DisplayData
        data={myArray}
        onEditPress={onEditPress}
        onDeletePress={onDeletePress}
      />
    </View>
  );
};

const DisplayData = (props) => {
  const { onEditPress, onDeletePress, data } = props;
  const Item = ({ title, index }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Button
        title={"Edit"}
        onPress={() => onEditPress(title, index)}
        testID={"edit-button"}
      />
      <Button
        title={"Delete"}
        onPress={() => onDeletePress(index)}
        testID={"delete-button"+ index}
      />
    </View>
  );

  const renderItem = ({ item, index }) => {
    return <Item title={item} index={index} />;
  };

  return (
    <FlatList
      data={data}
      testID={'data-flatlist'}
      renderItem={renderItem}
      keyExtractor={(item) => item}
    />
  );
};

const DisplayDataWithFC = () => {
  return (
    <SafeAreaView
      style={styles.mainContainerStyle}
    >
      <Section title={"Enter Value"} buttonTitle={"Press me"} />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  mainContainerStyle: { flex: 1, marginHorizontal: 25 },
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  title: {
    fontSize: 17,
    top: 10,
  },
  input: {
    padding: 10,
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
  },
});

export default DisplayDataWithFC;
