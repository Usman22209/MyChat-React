import { MessageSquare } from "lucide-react";
import { location } from "@utils/URL";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* About Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />
            <span className="font-bold text-lg md:text-xl">ChatHub</span>
          </div>
          <p className="text-gray-400 text-sm md:text-base">Connecting people worldwide.</p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Contact</h3>
          <ul className="space-y-1.5 md:space-y-2 text-gray-400 text-sm md:text-base">
            <li>
              Email:{" "}
              <a
                href="mailto:usman39e@gmail.com"
                className="hover:text-white transition-colors duration-200"
              >
                usman39e@gmail.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+923039027501"
                className="hover:text-white transition-colors duration-200"
              >
                +92 303-9027501
              </a>
            </li>
            <li>
              Address:{" "}
              <a
                href={location}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline transition-colors duration-200"
              >
                Lahore, Pakistan
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
