import { render } from "@testing-library/react";
import { Header } from "./index";

describe("Header", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Header />);

    expect(getByText(/book/i)).toBeInTheDocument();
  });

  it("should render the login button when there's no user authenticated", () => {
    const { getByText } = render(<Header />);

    expect(getByText(/login/i)).toBeInTheDocument();
  });
});
