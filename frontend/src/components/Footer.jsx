import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10 mt-10 px-4">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h3 className="text-white mb-3 font-semibold">About</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Company Info</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Press</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white mb-3 font-semibold">Help</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Account</li>
            <li className="hover:underline cursor-pointer">Support Center</li>
            <li className="hover:underline cursor-pointer">Contact Us</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white mb-3 font-semibold">Legal</h3>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
            <li className="hover:underline cursor-pointer">Terms of Service</li>
            <li className="hover:underline cursor-pointer">Cookies</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white mb-3 font-semibold">Follow Us</h3>
          <div className="flex space-x-4 text-lg">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaYoutube className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} Netflix Clone. Built for learning purposes.
      </div>
    </footer>
  );
};

export default Footer;
