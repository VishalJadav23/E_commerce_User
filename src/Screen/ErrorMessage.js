export default function ErrorMessage(props) {
  const { error ,setError } = props;
  let heading = error.type;

  function capitalizeFLetter(heading) {
    return heading.charAt(0).toUpperCase() + heading.slice(1);
  }
  heading = capitalizeFLetter(heading) ;

  setTimeout(() => {
    setError({ ...error, message: "", type: "" });
  }, 2500);
  return (
    <div className={error ? "d-block" : "d-none"}>
      <div className="mt-1 mb-1"><div class={`alert alert-${error.type}`} role="alert">
        <strong>{heading}</strong> {error.message}
      </div></div>
    </div>
  );
}
