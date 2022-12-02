import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { DisplayDataWithFC } from "../../src/Containers";

describe("Display data with function", () => {
  test('snapshot of the displayData with functional component',() => {
      const {toJSON} = render(<DisplayDataWithFC/>)
      expect(toJSON()).toMatchSnapshot()
  })
  test("when user add value to the list", async () => {
    const { getByTestId, toJSON } = render(<DisplayDataWithFC />);
    const button = getByTestId("section-button");
    expect(button).toBeDisabled();

    const textInput = await getByTestId("section-textInput");
    fireEvent.changeText(textInput, 10);
    expect(button).toBeEnabled();
    expect(textInput.props.value).toEqual(10);
    fireEvent.press(button);
    
    const flatlist = await getByTestId("data-flatlist");
    expect(flatlist.props.data).toContain(10)
    expect(toJSON()).toMatchSnapshot();
  });
  test("when user edit value of list", async () => {
    const { getByTestId } = render(<DisplayDataWithFC />);
    const button = getByTestId("section-button");
    const textInput = await getByTestId("section-textInput");
    fireEvent.changeText(textInput, 20);
    fireEvent.press(button);

    const editButton = await getByTestId("edit-button");
    fireEvent.press(editButton);
    fireEvent.changeText(textInput, 30);

    expect(textInput.props.value).toEqual(30);
    fireEvent.press(button);

    const flatlist = await getByTestId("data-flatlist");
    expect(new Set(flatlist.props.data)).toContain(30)
  });
  test("when user delete value from list", async () => {
    const { getByTestId } = render(<DisplayDataWithFC />);
    const button = getByTestId("section-button");

    const textInput = await getByTestId("section-textInput");
    fireEvent.changeText(textInput, 10);
    fireEvent.press(button);

    fireEvent.changeText(textInput, 20);
    fireEvent.press(button);

    const deleteButton = await getByTestId("delete-button0");
    fireEvent.press(deleteButton);
    
    const flatlist = await getByTestId("data-flatlist");
    expect(flatlist.props.data).toEqual([20])
  });
});
