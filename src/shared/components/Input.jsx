export function Input(props) {
  const { type, id, label, error, onChange, defaultValue } = props;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className={error ? "form-control is-invalid" : "form-control"}
        id={id}
        onChange={onChange}
        defaultValue={defaultValue}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
}
