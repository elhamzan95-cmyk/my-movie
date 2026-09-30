import { Link } from 'react-router-dom';
import phoneImage from '@/assets/arrow.png';
import logo from '@/assets/logu.png';
import all from '@/assets/all.jpg';

const HomePage = () => {
  return (
    <>
      {/* Desktop version - only on lg screens and above */}
      <div className="hidden lg:flex w-full min-h-screen bg-[#171717] rounded-b-3xl overflow-hidden">
        {/* LEFT section - 45% (image) */}
        <div className="w-[45%] flex flex-col px-8 pt-8 pb-8">
          <div className="flex-1 rounded-lg overflow-hidden">
            <img
              src={all}
              alt="Random image"
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </div>

        {/* RIGHT section - 55% (text) */}
        <div className="w-[55%] px-8 pt-8 pb-8 flex flex-col justify-between">
          {/* Top content */}
          <div className="space-y-6 text-white">
            <h1 className="text-[2.6rem] font-bold leading-tight">
              Welcome to CineHub. Share your favorite movie memories with friends.
            </h1>

            <p className="text-lg text-gray-300">
              Here you can review and discuss movies, express your opinion, and see what others think about the movies you love.
            </p>

            <div className="flex space-x-4">
              <span className="bg-[#171717] py-2 rounded text-white">
                Take a look at what's been uploaded!
              </span>
              <Link
                to="/my-movies"
                className="bg-[#666666] text-white py-1 pl-3 pr-1 rounded-full flex items-center gap-x-4"
              >
                <span>View Movies</span>
                <span className="bg-white rounded-full w-7 h-7 flex items-center justify-center">
                  <img
                    src={phoneImage}
                    alt="Old phone"
                    className="w-5 h-5 object-contain"
                  />
                </span>
              </Link>
            </div>
          </div>

          {/* Orange box */}
          <div className="bg-orange-500 text-black rounded-lg px-6 py-3 flex flex-col gap-3">
            <img
              src={logo}
              alt="Logo"
              className="w-14 h-14 object-contain"
            />
            <p className="font-bold leading-relaxed">
              "Cinema is sometimes a pharmacy to heal the wounded soul of the viewer. So we should be careful about which medicine we choose, whether it suits us or someone with a different condition. Does our immune system react to it? Cinema has answers to your questions."
            </p>
          </div>
        </div>
      </div>

      {/* Mobile version - only below lg screens */}
      <div className="flex lg:hidden flex-col w-full min-h-screen bg-[#171717] rounded-b-3xl overflow-hidden px-4 pt-2 pb-6 space-y-5 text-white">
        <div className="w-full rounded-lg overflow-hidden">
          <img
            src={all}
            alt="Random image"
            className="w-full h-auto object-cover grayscale"
          />
        </div>

        {/* Orange box - mobile (no logo) */}
        <div className="bg-orange-500 text-black rounded-lg px-5 py-4">
          <p className="font-bold text-sm leading-relaxed">
            "Cinema is sometimes a pharmacy to heal the wounded soul of the viewer. So we should be careful about which medicine we choose."
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Link
            to="/register"
            className="w-full bg-[#374151] hover:bg-[#4B5563] text-white font-bold py-3 px-4 rounded-lg text-center transition duration-300 border border-gray-600"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-300 shadow-lg"
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;