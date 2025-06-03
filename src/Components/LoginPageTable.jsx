const LoginPageTable = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square bg-gradient-to-br from-pink-500 to-orange-400 rounded-2xl ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="">{subtitle}</p>
      </div>
    </div>
  );
};

export default LoginPageTable;
