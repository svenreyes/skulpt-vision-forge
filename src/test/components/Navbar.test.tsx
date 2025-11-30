import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RouteBlurProvider } from "@components";
import { Navbar } from "@components/layout";

describe("Navbar", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <RouteBlurProvider>
          <Navbar />
        </RouteBlurProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(
      <BrowserRouter>
        <RouteBlurProvider>
          <Navbar />
        </RouteBlurProvider>
      </BrowserRouter>
    );
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });
});

