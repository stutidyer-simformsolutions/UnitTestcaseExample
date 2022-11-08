import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import renderer from "react-test-renderer";
import { DisplayDataWithFC } from "../../src/Containers";

describe("Display data with function", () => {
  const { toJSON } = render(<DisplayDataWithFC />);

  // test('Snapshot',() => {
  //     const {toJSON} = render(<DisplayDataWithFC/>)
  //     expect(toJSON()).toMatchSnapshot()
  // })

  test("snapshot of the displayData with functional component", () => {
    const tree = renderer.create(<DisplayDataWithFC />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("when user add any value to the list", async () => {
    const { getByTestId, toJSON } = render(<DisplayDataWithFC />);
    const button = getByTestId("section-button");
    expect(button).toBeDisabled();

    const textInput = await getByTestId("section-textInput");
    fireEvent.changeText(textInput, 10);
    expect(button).toBeEnabled();
    expect(textInput.props.value).toEqual(10);
    fireEvent.press(button);
    expect(toJSON()).toMatchSnapshot();
  });

  test("when user edit any value of list", async () => {
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
  });

  test("when user delete any value from list", async () => {
    const { getByTestId } = render(<DisplayDataWithFC />);
    const button = getByTestId("section-button");

    const textInput = await getByTestId("section-textInput");
    fireEvent.changeText(textInput, 40);
    fireEvent.press(button);

    const deleteButton = await getByTestId("delete-button");
    fireEvent.press(deleteButton);
    expect(textInput.props.value).toEqual("");
  });
});
