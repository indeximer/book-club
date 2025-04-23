import { render, screen } from "@testing-library/react";
import { SideMenu } from "./index";

describe("<SideMenu />", () => {
  it("renders the side menu with correct items", () => {
    render(<SideMenu />);

    const menuItems = ["Livros", "Autores", "Editoras", "Gêneros"];
    menuItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
