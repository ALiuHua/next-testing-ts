import { render, screen } from "@testing-library/react";
import { Hello } from "./Hello";

test("renders Hello world", () => {
  render(<Hello />);
  const myElement = screen.getByText("Hello World!");
  expect(myElement).toBeInTheDocument();
});
