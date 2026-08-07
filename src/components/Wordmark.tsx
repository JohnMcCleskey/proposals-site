export default function Wordmark({
  size = 26,
  onInk = false,
}: {
  size?: number;
  onInk?: boolean;
}) {
  const stroke = onInk ? "#f7f5ef" : "#071b2d";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      role="img"
      aria-label="StoneWave mark"
    >
      {/* stone */}
      <path
        d="M8 14 L17 7.5 L26 14"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* wave */}
      <path
        d="M7 21 Q 11.5 17.5 17 21 T 27 21"
        fill="none"
        stroke="#d77125"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 26 Q 13 23 17 26 T 25 26"
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
