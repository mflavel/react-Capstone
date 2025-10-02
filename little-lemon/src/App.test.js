// 👇 must be before importing Conformation

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Main from "./Main";

describe("Main component", () => {
  test("renders hero section with title and button", () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    // Heading
    expect(
    screen.getByRole("heading", { name: /Little/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Little Lemon/i)).toBeInTheDocument();

    // Subheading
    expect(
    screen.getByRole("heading", { level: 2, name: /Chicago/i })
    ).toBeInTheDocument();


    // Reserve a table button
    expect(
      screen.getByRole("button", { name: /Reserve a Table/i })
    ).toBeInTheDocument();
  });
});
describe("Main component", () => {

  test("renders specials section with Greek Salad", () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    // Special title
    expect(screen.getByText(/This Week Specials!/i)).toBeInTheDocument();

    // Greek Salad should be listed
    expect(
    screen.getByRole("heading", { name: /Greek Salad/i })
    ).toBeInTheDocument();

  });
});


