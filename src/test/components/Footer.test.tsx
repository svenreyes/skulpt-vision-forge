import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "@components/layout";

describe("Footer", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders gallery and FAQ links", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const galleryLink = screen.getByText("Gallery");
    const faqLink = screen.getByText("FAQ");
    expect(galleryLink).toBeInTheDocument();
    expect(faqLink).toBeInTheDocument();
  });
});

