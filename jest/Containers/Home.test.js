import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import Home from "../../src/Containers/Home";
describe("Home Screen Testcase", () => {
  const navigation = {
    navigate: jest.fn(),
  };

  test("Snapshot", async () => {
    const { toJSON } = render(<Home navigation={navigation} />);
    expect(await toJSON()).toMatchSnapshot();
  });

  test("Should have title", () => {
    const title = "Hello Everyone! \n Welcome to Unit Testcase Demo!"
    const { getByText } = render(<Home navigation={navigation} />);
    const foundButtonTitle = getByText(title);
    expect(foundButtonTitle.props.children).toEqual(title);
  });

  test("Should have a button and have called", async () => {
    const { getByTestId } = render(<Home navigation={navigation} />);

    const button = getByTestId("class-component-button");
    fireEvent.press(button);
    expect(await button).toBeTruthy();
  });

  test("Should find the button via accessibilityLabel and have called", async () => {
    const { getByLabelText } = render(<Home navigation={navigation} />);

    const foundButton = getByLabelText("Press Me");
    fireEvent.press(foundButton);
    expect(await foundButton).toBeTruthy();
  });
});
