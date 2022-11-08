import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import Home from "../../src/Containers/Home";
describe("Home Screen Testcase", () => {
  const navigation = {
    navigate: jest.fn(),
  };

  test("Snapshot of home screen", async () => {
    const { toJSON } = render(<Home navigation={navigation} />);
    expect(await toJSON()).toMatchSnapshot();
  });

  it("Should have title", () => {
    const title = "Hello Everyone! \n Welcome to Unit Testcase Demo!"
    const { getByText } = render(<Home navigation={navigation} />);
    const foundButtonTitle = getByText(title);
    expect(foundButtonTitle.props.children).toEqual(title);
  });

  it("Should have a button and have been called", async () => {
    const { getByTestId } = render(<Home navigation={navigation} />);

    const button = getByTestId("class-component-button");
    fireEvent.press(button);
    expect(await button).toBeTruthy();
  });

  it("Should find the button via accessibilityLabel and have been called", async () => {
    const { getByLabelText } = render(<Home navigation={navigation} />);

    const foundButton = getByLabelText("Press Me");
    fireEvent.press(foundButton);
    expect(await foundButton).toBeTruthy();
  });
});
