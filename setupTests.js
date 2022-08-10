
import 'react-native';
import 'jest-enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import '@testing-library/jest-native/extend-expect';
import { cleanup } from "@testing-library/react-native";
/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>',{
    url: 'http://localhost/'
      
});
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

copyProps(window, global);


/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */


Enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup);