import Icon from "./Icon";
export default function BackToTopButton({ onClick, visible }) {
  return visible ? (
    <button
      onClick={onClick}
      className="back-to-top icon-button"
      aria-label="Back to top"
    >
      <Icon name="down" style={{ transform: "rotate(180deg)" }} />
    </button>
  ) : null;
}
