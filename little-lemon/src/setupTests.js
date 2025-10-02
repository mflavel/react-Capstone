// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


jest.mock("@chakra-ui/react", () => {
  return {
    Box: ({ children }) => <div data-testid="chakra-box">{children}</div>,
    Button: ({ children, ...props }) => (
      <button {...props} data-testid="chakra-button">
        {children}
      </button>
    ),
    Heading: ({ children }) => <h2>{children}</h2>,
    Text: ({ children }) => <p>{children}</p>,
    HStack: ({ children, ...props }) => <div {...props}>{children}</div>,
    VStack: ({ children, ...props }) => <div {...props}>{children}</div>,
    // Add more mocks if your tests need them
  };
});