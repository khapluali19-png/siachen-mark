// Parametric stylized vector portrait — unique per person via seed colors/shapes
interface VectorPortraitProps {
  name: string;
  accentColor?: string;
  skinTone?: string;
  hairColor?: string;
  className?: string;
}

export default function VectorPortrait({
  name,
  accentColor = "#0a1e6e",
  skinTone = "#f5c5a3",
  hairColor = "#2d1a0e",
  className = "",
}: VectorPortraitProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`Portrait of ${name}`}
      role="img"
    >
      {/* Background circle */}
      <circle cx="100" cy="100" r="100" fill={accentColor} fillOpacity="0.12" />
      {/* Shirt / body */}
      <ellipse cx="100" cy="185" rx="52" ry="38" fill={accentColor} />
      {/* Collar */}
      <path d="M84 162 L100 178 L116 162 L108 155 L100 165 L92 155 Z" fill="white" fillOpacity="0.9" />
      {/* Neck */}
      <rect x="91" y="140" width="18" height="22" rx="6" fill={skinTone} />
      {/* Head */}
      <ellipse cx="100" cy="118" rx="34" ry="38" fill={skinTone} />
      {/* Hair */}
      <ellipse cx="100" cy="86" rx="34" ry="18" fill={hairColor} />
      <ellipse cx="68" cy="108" rx="8" ry="18" fill={hairColor} />
      <ellipse cx="132" cy="108" rx="8" ry="18" fill={hairColor} />
      {/* Ears */}
      <ellipse cx="66" cy="120" rx="6" ry="8" fill={skinTone} />
      <ellipse cx="134" cy="120" rx="6" ry="8" fill={skinTone} />
      {/* Eyes */}
      <ellipse cx="88" cy="116" rx="5" ry="5.5" fill="white" />
      <ellipse cx="112" cy="116" rx="5" ry="5.5" fill="white" />
      <circle cx="89" cy="117" r="3" fill="#1a1a2e" />
      <circle cx="113" cy="117" r="3" fill="#1a1a2e" />
      <circle cx="90" cy="116" r="1" fill="white" />
      <circle cx="114" cy="116" r="1" fill="white" />
      {/* Eyebrows */}
      <path d="M82 109 Q88 106 94 109" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M106 109 Q112 106 118 109" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Nose */}
      <path d="M100 120 Q97 128 94 130 Q100 133 106 130 Q103 128 100 120Z" fill={skinTone} stroke="#e8a882" strokeWidth="0.5" />
      {/* Smile */}
      <path d="M90 138 Q100 145 110 138" stroke="#c0785a" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
