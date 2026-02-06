export const Header = () => {
  return (
    <div className=" h-17 flex justify-between px-10 pt-5">
      <div>
        <img src="/foodLogo.png" alt="" />
      </div>
      <div className="flex gap-x-3">
        <button className="bg-white rounded-2xl text-black px-2 flex items-center h-9 hover:bg-gray-50">
          Sign up
        </button>
        <button className="bg-red-500 rounded-2xl px-2 flex items-center h-9 text-white">
          Log in
        </button>
      </div>
    </div>
  );
};
