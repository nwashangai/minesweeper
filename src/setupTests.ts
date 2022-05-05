// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { WebSocket } from "mock-socket";
import "@testing-library/jest-dom";

global.WebSocket = WebSocket;
global.Audio = jest.fn().mockImplementation(() => ({
  play: jest.fn(),
}));
