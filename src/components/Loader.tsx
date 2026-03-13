export default function Loader() {
  return (
    <div data-loader aria-hidden="true">
      <div data-loader-panel="top" />
      <div data-loader-panel="bottom" />

      <canvas data-loader-canvas />

      <div data-loader-ui>
        <div data-loader-bar-track>
          <div data-loader-bar />
        </div>
        <p data-loader-label>Loading</p>
      </div>
    </div>
  )
}
