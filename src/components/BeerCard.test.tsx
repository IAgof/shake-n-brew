import { render, screen } from "@testing-library/react";
import { BeerCard } from "@/components/BeerCard";
import { beers } from "@/data/beers";

describe("BeerCard", () => {
  it("renders beer name, brewery and rating", () => {
    const beer = beers[0];

    render(<BeerCard beer={beer} />);

    expect(screen.getByText(beer.name)).toBeInTheDocument();
    expect(screen.getByText(beer.brewery)).toBeInTheDocument();
    expect(screen.getByText(beer.rating.toFixed(1))).toBeInTheDocument();
  });
});
