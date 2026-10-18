import { useEffect, useState } from "react";
import { Button, Container, Stack } from "@mui/material";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useHistory } from "react-router-dom";

const heroSlides = [
  {
    image: "/img/tropical.banner.png",
    badge: "10% Off seasonal specials",
    eyebrow: "Summer collection",
    title: "Sip into summer",
    description: "Bright, refreshing flavors made for warmer days.",
  },
  {
    image: "/img/image.png",
    badge: "free delivery up to 25$",
    eyebrow: "get ur mood",
    title: "Your everyday mood",
  },
];

export default function TropicalHero() {
  const history = useHistory();
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const hasMultipleSlides = heroSlides.length > 1;
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    if (
      !hasMultipleSlides ||
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % heroSlides.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, [hasMultipleSlides, paused]);

  const moveSlide = (direction: number) =>
    setActiveSlide(
      (current) =>
        (current + direction + heroSlides.length) % heroSlides.length,
    );

  return (
    <section
      className="tropical-home-hero"
      style={{ backgroundImage: `url(${slide.image})` }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured seasonal collection"
    >
      <Container className="tropical-home-hero-container">
        <Stack className="tropical-home-hero-copy">
          <span className="hero-promo-badge">{slide.badge}</span>
          <span className="section-eyebrow">{slide.eyebrow}</span>
          <h1>{slide.title}</h1>
          <p>{slide.description}</p>
          <div className="tropical-home-hero-actions">
            <Button
              className="tropical-home-hero-cta"
              endIcon={<ArrowRight size={17} />}
              onClick={() => history.push("/products")}
            >
              Explore seasonal drinks
            </Button>
            <Button
              className="tropical-home-hero-secondary"
              onClick={() => history.push("/products")}
            >
              View all menu
            </Button>
          </div>
          <div className="tropical-home-hero-explore">
            Explore:{" "}
            <button onClick={() => history.push("/products")}>Coffee</button>
            <span>•</span>
            <button onClick={() => history.push("/products")}>Cold Brew</button>
            <span>•</span>
            <button onClick={() => history.push("/products")}>Ade</button>
            <span>•</span>
            <button onClick={() => history.push("/products")}>Juice</button>
          </div>
        </Stack>
      </Container>
      <button
        className="hero-carousel-arrow hero-carousel-prev"
        type="button"
        aria-label="Previous banner"
        disabled={!hasMultipleSlides}
        onClick={() => moveSlide(-1)}
      >
        <ArrowLeft size={22} />
      </button>
      <button
        className="hero-carousel-arrow hero-carousel-next"
        type="button"
        aria-label="Next banner"
        disabled={!hasMultipleSlides}
        onClick={() => moveSlide(1)}
      >
        <ArrowRight size={22} />
      </button>
      <div className="hero-carousel-dots">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === activeSlide ? "active" : ""}
            aria-label={`Show banner ${index + 1}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
