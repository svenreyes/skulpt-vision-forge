import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BlurSlideshow } from "@features/skulpted";

describe("BlurSlideshow", () => {
  it("renders without crashing", () => {
    const images = ["/test1.png", "/test2.png"];
    const { container } = render(<BlurSlideshow images={images} />);
    expect(container).toBeTruthy();
  });

  it("renders all images", () => {
    const images = ["/test1.png", "/test2.png", "/test3.png"];
    const { container } = render(<BlurSlideshow images={images} />);
    const imgs = container.querySelectorAll("img");
    expect(imgs).toHaveLength(images.length);
  });
});

