const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center px-6 py-2 min-w-[100px] rounded-full bg-gradient-to-r from-blue-400 to-violet-600 text-white font-semibold shadow-lg overflow-hidden focus:outline-none focus:ring-4 focus:ring-violet-300 active:scale-95 transition-transform duration-200"
    >
        <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-200 rounded-full" />

    </button>
  );
};

export default Button;
