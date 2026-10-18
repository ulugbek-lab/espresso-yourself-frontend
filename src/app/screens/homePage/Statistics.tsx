import { Container } from "@mui/material";

const statistics = [
  ["12K+", "Coffee lovers"],
  ["30+", "Drinks"],
  ["8K+", "Favorites"],
  ["15K+", "Orders served"],
];

export default function Statistics() {
  return (
    <section className="home-statistics" aria-label="Espresso Yourself statistics">
      <Container className="home-statistics-container">
        <div className="home-statistics-grid">
          {statistics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </Container>
    </section>
  );
}
