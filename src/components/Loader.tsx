export default function Loader() {
  return (
    <div data-loader aria-hidden="true">
      <div data-loader-panel="top" />
      <div data-loader-panel="bottom" />

      <canvas data-loader-canvas />

      <div data-loader-center>
        <div data-loader-logo>
          <svg
            width="72"
            height="58"
            viewBox="0 0 44 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              data-logo-path="m"
              d="M2 2 L11 18 L22 4 L33 18 L42 2"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
              fill="none"
            />
            <path
              data-logo-path="v"
              d="M11 18 L22 34 L33 18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
              fill="none"
            />
          </svg>
        </div>

        <div data-loader-counter-wrap>
          <span data-loader-counter aria-label="Loading progress">00</span>
          <span data-loader-percent>%</span>
        </div>

        <div data-loader-bar-track>
          <div data-loader-bar />
          <div data-loader-bar-glow />
        </div>

        <div data-loader-status>
          <span data-loader-status-dot />
          <span data-loader-status-text>initializing</span>
        </div>
      </div>

      <div data-loader-corner="tl">
        <span>MV</span>
        <span>©2025</span>
      </div>
      <div data-loader-corner="br">
        <span>PORTFOLIO</span>
        <span>v1.0</span>
      </div>
    </div>
  )
}
