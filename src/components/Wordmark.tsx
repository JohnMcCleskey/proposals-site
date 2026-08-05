/**
 * Inline mark — a stone edge over a wave. Kept as SVG rather than a raster
 * asset so the nav never renders a broken image if the file is missing from
 * the deploy, and so it stays crisp at any density.
 */
export default function Wordmark() {
  return (
    <svg
      className="nav-logo"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="0.6"
        y="0.6"
        width="32.8"
        height="32.8"
        rx="8"
        stroke="rgba(197,165,90,0.4)"
        strokeWidth="1.2"
      />
      <path
        d="M8 13.5 L17 7 L26 13.5"
        stroke="#C5A55A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 20.5c2.4 0 2.4 2.6 4.75 2.6s2.35-2.6 4.75-2.6 2.4 2.6 4.75 2.6 2.35-2.6 4.75-2.6"
        stroke="#60C5B6"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="17" cy="16.6" r="1.5" fill="#E6D6B2" />
    </svg>
  );
}
