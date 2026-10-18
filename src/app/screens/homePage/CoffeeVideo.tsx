export default function CoffeeVideo() {
  return (
    <section className="coffee-video-frame">
      <video
        className="coffee-video"
        autoPlay
        muted
        loop
        playsInline
        aria-label="Coffee being prepared"
      >
        <source src="/video/coffee.MP4" type="video/mp4" />
      </video>
    </section>
  );
}
