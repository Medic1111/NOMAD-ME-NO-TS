const CommentsWrapper = ({ children }) => {
  return (
    <section
      className={
        " w-full h-auto overflow-auto flex items-center flex-col justify-between"
      }
    >
      {children}
    </section>
  );
};

export default CommentsWrapper;
