export function Alert(props) {
  
    const { children, styleType } = props;

  return (
    <>
      <div className={`alert alert-${styleType || "success"}`}>{children}</div>
    </>
  );
}
