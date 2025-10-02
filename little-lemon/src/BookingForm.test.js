import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock Chakra UI components
jest.mock("@chakra-ui/react", () => ({
  Input: (props) => <input {...props} />,
  Select: (props) => <select {...props} />,
  Button: (props) => <button {...props} />,
  FormLabel: (props) => <label {...props} />,
  VStack: ({ children }) => <div>{children}</div>,
  HStack: ({ children }) => <div>{children}</div>,
}));

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ state: null }),
}));

import BookingForm from "./pages/BookingForm"; // adjust path

describe("BookingForm validation", () => {
  test("shows error messages when required fields are empty", async () => {
    render(<BookingForm />);

    fireEvent.click(screen.getByText(/Make Your reservation/i));

    // Find all elements containing "required"
    const errorMessages = await screen.findAllByText(/required/i);

    // There should be at least 3 required errors (Name, Email, Phone)
    expect(errorMessages.length).toBeGreaterThanOrEqual(3);

    // Optional: check specific messages
    expect(errorMessages.some(el => el.textContent.includes("Name is required"))).toBe(true);
    expect(errorMessages.some(el => el.textContent.includes("Email is required"))).toBe(true);
    expect(errorMessages.some(el => el.textContent.includes("Phone is required"))).toBe(true);
  });
});
