const InputSubmit = ({ className, text, disabled }) => {
  return (
    <input
      disabled={disabled}
      className={className}
      type="submit"
      value={text}
    />
  );
};

export default InputSubmit;
