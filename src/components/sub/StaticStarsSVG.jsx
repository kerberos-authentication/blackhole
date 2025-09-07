// src/components/main/StaticStarsSVG.jsx


const bezierPoints = [
  { x: 10, y: 90 },
  { x: 40, y: 10 },
  { x: 60, y: 90 },
  { x: 90, y: 10 },
];

// Elliptic orbit stars (a = major, b = minor)
const makeEllipse = (cx, cy, a, b, count) =>
  Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 2 * Math.PI;
    return {
      x: cx + a * Math.cos(angle),
      y: cy + b * Math.sin(angle),
    };
  });

// Asteroid spiral (logarithmic spiral-like)
const makeSpiral = (cx, cy, loops, pointsPerLoop, radiusStep) => {
  const points = [];
  for (let i = 0; i < loops * pointsPerLoop; i++) {
    const angle = (i / pointsPerLoop) * 2 * Math.PI;
    const radius = i * radiusStep;
    points.push({
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    });
  }
  return points;
};

const StaticStarsSVG = () => {
  const ellipseStars = makeEllipse(50, 50, 30, 20, 20);
  const spiralStars = makeSpiral(50, 50, 3, 15, 0.8);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bézier trail */}
      <path
        d={`M ${bezierPoints[0].x},${bezierPoints[0].y}
            C ${bezierPoints[1].x},${bezierPoints[1].y}
              ${bezierPoints[2].x},${bezierPoints[2].y}
              ${bezierPoints[3].x},${bezierPoints[3].y}`}
        fill="none"
        stroke="#77f"
        strokeWidth="0.2"
        opacity="0.5"
      />

      {/* Elliptic orbit stars */}
      {ellipseStars.map((p, i) => (
        <circle key={`e${i}`} cx={p.x} cy={p.y} r="0.5" fill="#AAF" opacity="0.6" />
      ))}

      {/* Spiral asteroid points */}
      {spiralStars.map((p, i) => (
        <circle key={`s${i}`} cx={p.x} cy={p.y} r="0.4" fill="#AEE" opacity="0.5" />
      ))}
    </svg>
  );
};

export default StaticStarsSVG;
