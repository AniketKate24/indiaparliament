const SPOKES = Array.from({ length: 24 }, (_, i) => i * 15);

/**
 * Ashoka Chakra motif — 24 spokes, navy.
 * Used as a decorative mark / spinner only. It is never combined with
 * saffron-white-green bands to imitate the National Flag, and is never
 * placed on merchandise, backgrounds behind text, or below waist level
 * of a person, per the Flag Code of India and the Emblems Act.
 */
export function Chakra({
  size = 24,
  spinning = false,
  className = "",
  title,
}: {
  size?: number;
  spinning?: boolean;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={`${spinning ? "chakra-spin" : ""} ${className}`}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="50" cy="50" r="7" fill="currentColor" />
      {SPOKES.map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="9"
          x2="50"
          y2="91"
          stroke="currentColor"
          strokeWidth="1.6"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
    </svg>
  );
}
