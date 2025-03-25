export function Logo() {
  return (
    <svg
      viewBox="0 0 240 50"
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-auto"
    >
      <defs>
        <linearGradient id="playGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="text-blue-500" stopColor="currentColor" />
          <stop offset="100%" className="text-purple-600" stopColor="currentColor" />
        </linearGradient>
        <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className="text-purple-600" stopColor="currentColor" />
          <stop offset="100%" className="text-indigo-500" stopColor="currentColor" />
        </linearGradient>
      </defs>
      <g>
        {/* Modern play button with gradient */}
        <path
          d="M20 10 C15 10 12 15 12 25 C12 35 15 40 20 40 L35 32.5 L35 17.5 L20 10"
          fill="url(#playGradient)"
          className="text-blue-500 dark:text-blue-400"
        />
        {/* AI circuit pattern */}
        <g className="text-indigo-500 dark:text-indigo-400">
          <path
            d="M45 25 Q55 25 60 20 Q65 15 75 15 M75 15 Q85 15 90 25"
            stroke="url(#circuitGradient)"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M45 25 Q55 25 60 30 Q65 35 75 35 M75 35 Q85 35 90 25"
            stroke="url(#circuitGradient)"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="75" cy="15" r="2" fill="currentColor" />
          <circle cx="75" cy="35" r="2" fill="currentColor" />
          <circle cx="90" cy="25" r="2" fill="currentColor" />
        </g>
        {/* Modern text with custom styling */}
        <text
          x="100"
          y="32"
          className="fill-zinc-950 dark:fill-white font-bold text-2xl tracking-tight"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          StackTube
          <tspan className="text-indigo-500 dark:text-indigo-400" dx="4">AI</tspan>
        </text>
      </g>
    </svg>
  );
}