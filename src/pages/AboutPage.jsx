// src/pages/AboutPage.jsx
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { SiVite, SiTailwindcss, SiExpress, SiMongodb } from 'react-icons/si';

const AboutPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#171717] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">About CineHub</h1>
        </div>

        {/* Main card */}
        <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 mb-8 border border-orange-500/30">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-200 mb-6 leading-relaxed">
              CineHub is a social platform for cinema enthusiasts who want to record and share their movie experiences and memories.
              Every part of this platform was designed and implemented by Elham Zangeneh.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Our Goal</h2>
            <p className="text-gray-200 mb-4">
              Building a friendly community of movie lovers where they can:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-200">
              <li>Record and preserve their movie memories</li>
              <li>Discuss and exchange opinions about favorite movies</li>
              <li>Discover new movies</li>
              <li>Share their reviews and ratings with others</li>
            </ul>
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 border border-orange-500/30">
          <h2 className="text-2xl font-bold text-white mb-6">Technologies Used</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Frontend */}
            <div className="bg-[#374151] rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition">
              <div className="flex items-center gap-3 mb-4">
                <FaReact className="text-3xl text-blue-400" />
                <SiVite className="text-3xl text-purple-400" />
                <SiTailwindcss className="text-3xl text-cyan-400" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Frontend</h3>
              <p className="text-gray-300 text-sm">React + Vite + Tailwind CSS</p>
            </div>

            {/* Backend */}
            <div className="bg-[#374151] rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition">
              <div className="flex items-center gap-3 mb-4">
                <FaNodeJs className="text-3xl text-green-500" />
                <SiExpress className="text-3xl text-gray-300" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Backend</h3>
              <p className="text-gray-300 text-sm">Node.js + Express</p>
            </div>

            {/* Database */}
            <div className="bg-[#374151] rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition">
              <div className="flex items-center gap-3 mb-4">
                <FaDatabase className="text-3xl text-green-600" />
                <SiMongodb className="text-3xl text-green-500" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Database</h3>
              <p className="text-gray-300 text-sm">MongoDB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;