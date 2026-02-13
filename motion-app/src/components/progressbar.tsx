interface Props {
  progress: number;
}

export default function ProgressCircle({ progress }: Props) {
  const radius = 30;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  const getColor = () => {
    if (safeProgress === 0) return "#52525b"; // gray
    if (safeProgress < 100) return "#f59e0b"; // yellow
    return "#22c55e"; // green
  };

  return (
    <svg height={radius * 2} width={radius * 2}>
      {/* Background */}
      <circle
        stroke="#27272a"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />

      {/* Progress */}
      <circle
        stroke={getColor()}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
        className="transition-all duration-700 ease-out"
      />

      {/* Text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-white text-sm font-semibold"
      >
        {safeProgress}%
      </text>
    </svg>
  );
}
