import { MessageSquare } from "lucide-react";
import { location } from "@utils/URL";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* About Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-6 w-6" />
            <span className="font-bold text-xl">ChatHub</span>
          </div>
          <p className="text-gray-400">Connecting people worldwide.</p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              Email:{" "}
              <a href="mailto:usman39e@gmail.com" className="hover:text-white">
                usman39e@gmail.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+923039027501" className="hover:text-white">
                +92 303-9027501
              </a>
            </li>
            <li>
              Address:{" "}
              <a
                href={location}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline"
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
