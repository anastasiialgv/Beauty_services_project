export default function ToggleButton({ onClick, isOpen }) {
  return (
    <button
      className="toggle-button"
      style={{ background: "lightgray" }}
      onClick={onClick}
    >
      <span
        style={{
          display: "inline-block",
          transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
        }}
      >
        ◥
      </span>
    </button>
  );
}
