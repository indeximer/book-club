import { render } from "@testing-library/react";
import { Splash } from ".";

describe("<Splash />", () => {
  it("should render without breaking", () => {
    const { container } = render(<Splash />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
