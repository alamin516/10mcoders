const WavingHand = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <h2 className="text-3xl 800px:text-6xl dark:text-white text-center font-Poppins 800px:leading-[80px]">
        <div className="inline-block">
          <span className="block text-6xl animate-wave">👋</span>
        </div>{" "}
        <br />
        Welcome to <br />
        Admin Dashboard
      </h2>
    </div>
  );
};

export default WavingHand;
