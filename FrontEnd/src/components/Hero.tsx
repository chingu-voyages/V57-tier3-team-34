import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-evenly min-h-screen p-4 lg:p-0 gap-8 lg:gap-0 my-20 md:my-0">
      <div className="text-center text-base-100 w-full lg:w-[30%]">
        <div className="max-w-md text-center md:text-left mx-auto lg:mx-0">
          <h1 className="mb-5 text-5xl lg:text-5xl font-bold">
            Secure, Transparent and Fast...
          </h1>
          <p className="mb-5">
            <span className="font-bold underline">Elekt</span> is an online
            voting platform ensuring integrity, real-time results and a seamless
            experience--from registration to final count.
          </p>
          <div className="flex flex-col items-center lg:items-start justify-content-around">
            <Link to="/voter/register" className="btn w-full lg:w-auto">
              Register as a Voter
            </Link>
            <span className="my-3">or</span>
            <Link to="/party/register" className="btn w-full lg:w-auto">
              Register a Party
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[40%] rounded-2xl overflow-hidden">
        <img
          className="object-cover w-full h-[300px] lg:h-full"
          src="https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp"
          alt="Hero image"
        />
      </div>
    </div>
  );
};

export default Hero;
