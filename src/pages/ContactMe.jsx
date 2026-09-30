// src/pages/ContactPage.jsx
import { FaPhone, FaInstagram, FaTelegram, FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="flex w-full min-h-screen bg-[#171717] rounded-b-3xl overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-8 pt-14 pb-8 text-white">
        <h1 className="text-4xl font-bold mt-6 mb-4">Contact Me</h1>
        <p className="text-lg text-gray-300 mb-10">
          You can reach me through any of the channels below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone */}
          <div className="bg-[#2A2A2A] p-5 rounded-xl flex items-center gap-4 transition group">
            <div className="bg-orange-500/10 p-3 rounded-full group-hover:bg-orange-500/20 transition">
              <FaPhone className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <p className="font-bold text-lg">Elham Zangeneh</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-[#2A2A2A] p-5 rounded-xl flex items-center gap-4 transition group">
            <div className="bg-orange-500/10 p-3 rounded-full group-hover:bg-orange-500/20 transition">
              <FaEnvelope className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="font-bold text-lg">Elham Zangeneh</p>
            </div>
          </div>

          {/* Instagram */}
          <div className="bg-[#2A2A2A] p-5 rounded-xl flex items-center gap-4 transition group">
            <div className="bg-orange-500/10 p-3 rounded-full group-hover:bg-orange-500/20 transition">
              <FaInstagram className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Instagram</p>
              <p className="font-bold text-lg">Elham Zangeneh</p>
            </div>
          </div>

          {/* Telegram */}
          <div className="bg-[#2A2A2A] p-5 rounded-xl flex items-center gap-4 transition group">
            <div className="bg-orange-500/10 p-3 rounded-full group-hover:bg-orange-500/20 transition">
              <FaTelegram className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Telegram</p>
              <p className="font-bold text-lg">Elham Zangeneh</p>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="bg-[#2A2A2A] p-5 rounded-xl flex items-center gap-4 transition group">
            <div className="bg-orange-500/10 p-3 rounded-full group-hover:bg-orange-500/20 transition">
              <FaLinkedin className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">LinkedIn</p>
              <p className="font-bold text-lg">Elham Zangeneh</p>
            </div>
          </div>

          {/* GitHub */}
          <div className="bg-[#2A2A2A] p-5 rounded-xl flex items-center gap-4 transition group">
            <div className="bg-orange-500/10 p-3 rounded-full group-hover:bg-orange-500/20 transition">
              <FaGithub className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">GitHub</p>
              <p className="font-bold text-lg">Elham Zangeneh</p>
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-10 text-center border-t border-gray-700 pt-6">
          Thanks for visiting my profile.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;