import { useId } from "react";

function Block({ x, y, w = 70, h = 32, color = "#b8edcf", delay = 0 }) {
  const d = w * 0.48;
  return (
    <g className="diagram-block" style={{ "--block-delay": `${delay}s` }}>
      <path
        d={`M${x} ${y}l${w} ${-d / 2} ${w} ${d / 2}-${w} ${d / 2}Z`}
        fill={color}
        fillOpacity=".8"
      />
      <path
        d={`M${x} ${y}v${h}l${w} ${d / 2}v-${h}Z`}
        fill={color}
        fillOpacity=".3"
        stroke={color}
        strokeOpacity=".35"
      />
      <path
        d={`M${x + w} ${y + d / 2}v${h}l${w}-${d / 2}v-${h}Z`}
        fill={color}
        fillOpacity=".5"
        stroke={color}
        strokeOpacity=".35"
      />
    </g>
  );
}

export default function SystemDiagram({
  kind = "studio",
  className = "",
  exploded = false,
}) {
  const id = useId().replace(/:/g, "");
  const color =
    kind === "health" ? "#c4b7f2" : kind === "energy" ? "#edb995" : "#b8edcf";
  return (
    <svg
      className={`system-diagram ${className} ${exploded ? "diagram-exploded" : ""}`}
      viewBox="0 0 500 340"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={id}>
          <stop stopColor={color} stopOpacity=".13" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="250" cy="220" rx="225" ry="100" fill={`url(#${id})`} />
      <path d="m55 232 191-96 204 97-195 97Z" fill="#161e24" stroke="#3b474d" />
      {[0, 1, 2, 3, 4].map((n) => (
        <path
          key={n}
          d={`m${80 + n * 32} ${245 + n * 16} 191-96m${95 + n * 34} ${212 - n * 16} 200 96`}
          stroke="#526366"
          strokeOpacity=".2"
        />
      ))}
      {kind === "banking" && (
        <>
          <path
            className="diagram-signal"
            d="m137 206 95 46 104-50"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="5 9"
          />
          {[0, 1, 2].map((n) => (
            <Block
              key={n}
              x={78}
              y={189 - n * 27}
              w={53}
              h={18}
              color={color}
              delay={n * 0.1}
            />
          ))}
          {[0, 1, 2, 3].map((n) => (
            <Block
              key={n}
              x={275}
              y={184 - n * 28}
              w={48}
              h={19}
              color={color}
              delay={n * 0.12}
            />
          ))}
          <Block x={185} y={236} w={39} h={16} color="#c4b7f2" />
          <path
            d="m298 82 15 7 16-8m-13 26 15 7 16-8"
            stroke="#172c24"
            strokeWidth="3"
          />
          <text x="92" y="292">
            REQUEST
          </text>
          <text x="322" y="287">
            LEDGER
          </text>
        </>
      )}
      {kind === "health" && (
        <>
          <g className="diagram-phone">
            <path d="m300 66 84 41v137l-84-41Z" fill="#2c293b" stroke={color} />
            <path
              d="m311 89 62 31v91l-62-31Z"
              fill="#141a22"
              stroke={color}
              strokeOpacity=".3"
            />
            <path
              d="m319 142 10 5 7-16 10 43 8-20 10 4"
              stroke={color}
              strokeWidth="3"
            />
            <path d="m332 197 23 11" stroke={color} strokeWidth="3" />
          </g>
          {[0, 1, 2].map((col) =>
            [0, 1, 2].map((row) => (
              <g key={`${col}-${row}`}>
                <path
                  d={`M${90 + col * 65} ${120 + row * 42 + col * 16}l65-26m-65 26 65 58`}
                  stroke={color}
                  strokeOpacity={col < 2 ? 0.3 : 0}
                />
                <circle
                  className="diagram-node"
                  cx={90 + col * 65}
                  cy={120 + row * 42 + col * 16}
                  r="8"
                  fill={color}
                  style={{ animationDelay: `${col * 0.5}s` }}
                />
              </g>
            )),
          )}
          <text x="100" y="288">
            INFERENCE
          </text>
          <text x="322" y="287">
            EXPLAIN
          </text>
        </>
      )}
      {kind === "energy" && (
        <>
          <path
            d="m110 214 125 61 127-63V100l-127 63-125-61Z"
            fill={color}
            fillOpacity=".025"
            stroke={color}
            strokeOpacity=".4"
          />
          <path
            d="M235 163v112m-125-61 127-62 125 60"
            stroke={color}
            strokeOpacity=".3"
          />
          <path
            className="scan-beam"
            d="m121 156 114 55 116-56v20l-116 55-114-54Z"
            fill={color}
            fillOpacity=".15"
            stroke={color}
            strokeOpacity=".4"
          />
          <Block x={159} y={225} w={40} h={16} color={color} />
          <path
            d="M280 169v40m-14-36 14-10 14 10m-14 13-12 27m12-27 12 27"
            stroke={color}
            strokeWidth="3"
          />
          <circle cx="280" cy="152" r="8" fill={color} />
          <path
            d="M258 140v-10h11m22 0h11v10m0 69v12h-11m-22 0h-11v-12"
            stroke="#b8edcf"
          />
          <text x="114" y="291">
            DETECT
          </text>
          <text x="317" y="291">
            CONTROL
          </text>
        </>
      )}
      {kind === "studio" && (
        <>
          <path
            className="diagram-signal"
            d="m119 199 131 64 129-66M250 263V157"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="6 8"
          />
          {[0, 1, 2].map((n) => (
            <Block
              key={n}
              x={70}
              y={188 - n * 24}
              w={45}
              h={16}
              color="#c4b7f2"
            />
          ))}
          {[0, 1, 2].map((n) => (
            <Block
              key={n}
              x={181}
              y={209 - n * (exploded ? 52 : 37)}
              w={69}
              h={24}
              color={color}
              delay={n * 0.2}
            />
          ))}
          <Block x={324} y={182} w={36} h={33} color="#edb995" />
          <circle cx="360" cy="130" r="24" stroke="#edb995" />
          <ellipse cx="360" cy="130" rx="24" ry="8" stroke="#edb995" />
          <ellipse cx="360" cy="130" rx="8" ry="24" stroke="#edb995" />
        </>
      )}
      <path
        d="m50 224-10 5 12 6m391-8 12 6-12 7M246 334l9 4 9-4"
        stroke={color}
        strokeOpacity=".6"
      />
    </svg>
  );
}
