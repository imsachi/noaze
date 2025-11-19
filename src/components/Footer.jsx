import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row p-4 md:p-8   justify-between bg-gray-100">
        {/* <div className="hidden md:block flex-none basis-1/2 text-center  my-4 md:my-4 text-indigo-400 ">
          <div>
            <Link to="/privacypolicy" target="_blank">
              Privacy Policy
            </Link>
          </div>
          <div>
            <Link to="/contact-us">About Us</Link>
          </div>
          <div>
            Query & Support:{" "}
            <a href="mailto:hello@grooscart.com"> hello@zustit.com</a>
          </div>
        </div> */}
        <div className="basis-1/2 text-center">
          <div className="container mx-auto  text-center items-center">
            {/* Logo */}
            <Link to="/" className="flex justify-center items-center">
              <p>
                <span className="font-semibold text-lg font-Poppins">
                  {" "}
                  zustit{" "}
                </span>
                <span>.com</span>
              </p>
            </Link>

            {/* Copyright notice */}
            <div>
              <p className="text-gray-500">
                &copy; 2023 SaLabs. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" p-2 text-center ">
        Made with Love <span className="text-red-600 text-xl"> &hearts; </span>
        .India
      </div>
    </>
  );
};

export default Footer;
