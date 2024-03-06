export function Button({
  apiProgress,
  disabled,
  children,
  onClick,
  styleType = "primary",
  type,
}) {
  return (
    <>
      <button
        className={`btn btn-${styleType}`}
        disabled={apiProgress || disabled}
        onClick={onClick}
        type={type}
      >
        {apiProgress && (
          <span
            className="spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
        )}
        {children}
      </button>
    </>
  );
}
