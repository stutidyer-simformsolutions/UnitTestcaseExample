import React from "react";
import { DisplayDataWithClass } from "../../src/Containers";
import { shallow, mount } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "react-native";
describe("Display data with class", () => {
  const component = shallow(<DisplayDataWithClass />);
  const instance = component.instance();
  test("snapshot of the displayData with class component with shallow", () => {
    expect(component).toMatchSnapshot();
  });

  test("snapshot of the displayData with class component with mount", () => {
    const component = mount(<DisplayDataWithClass />);
    expect(component).toMatchSnapshot();
  });

  test("onChange event", () => {
    instance.onChangeText(10);
    expect(instance.state.data).toEqual(10);
  });

  test("when user add number into list", () => {
    instance.setState({ myArray: [10, 15], currentIndex: 2, data: 16 }, () => {
      instance.onButtonPress();
    });
    expect(instance.state.myArray).toEqual([10, 15, 16]);
  });

  test("when user press edit button", () => {
    instance.setState(
      { myArray: [10, 15], currentIndex: 1, data: 15, isEditPressed: true },
      () => {
        instance.onEditPress(16, 1);
        instance.onButtonPress();
      }
    );
    expect(instance.state.myArray).toEqual([10, 16]);
  });

  test("when user delete value from the list", () => {
    instance.setState({ myArray: [10, 15], currentIndex: 1, data: 15 }, () => {
      instance.onDeletePress(1);
    });
    expect(instance.state.myArray).toEqual([10]);
  });

  describe("renderItem", () => {
    test("renderItem with edit button call", () => {
      const renderItem = instance.renderItem({ item: 10, index: 0 });
      const { getByTestId: renderItemTestId } = render(renderItem);
      const { getByTestId } = render(<DisplayDataWithClass />);
      const editButton = renderItemTestId("edit-button");
      const textInput = getByTestId("section-textInput");
      fireEvent.changeText(textInput, 12);
      fireEvent.press(editButton);
      expect(textInput.props.value).toEqual(12);
    });

    test("renderItem with delete button call", () => {
      instance.setState({ myArray: [10], data: 10 }, () => {
        const renderItem = instance.renderItem({ item: 10, index: 0 });
        const { getByTestId } = render(renderItem);
        const deleteButton = getByTestId("delete-button");
        fireEvent.press(deleteButton);
      });
      expect(instance.state.myArray).toEqual([]);
    });
  });

  test("keyExtractor of FlatList", () => {
    instance.setState({ myArray: [10, 15], data: 15 }, async () => {
      let keyExtractor = component.find("FlatList").at(0).getElement()
        .props.keyExtractor;
      keyExtractor();
      expect(await keyExtractor).toBeDefined();
    });
  });
});
