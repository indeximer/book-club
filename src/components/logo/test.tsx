import { render } from "@testing-library/react";
import { Logo } from ".";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoaderProvider } from "@/contexts/LoaderContext";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("<Logo />", () => {
  it("should render without breaking", () => {
    const { container } = render(
      <LoaderProvider>
        <AuthProvider>
          <Logo />
        </AuthProvider>
      </LoaderProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <LoaderProvider>
        <AuthProvider>
          <Logo />
        </AuthProvider>
      </LoaderProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
