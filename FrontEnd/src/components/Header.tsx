import { Link } from "react-router";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Elekt
        </Link>
      </div>

      {/* Mobile menu button */}
      <div className="flex-none lg:hidden">
        <button
          className="btn btn-square btn-ghost"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Desktop menu */}
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/voter/register">Register as a Voter</Link>
          </li>
          <li className="ml-3">
            <Link to="/party/register">Register a Party</Link>
          </li>
          <li className="ml-3">
            <Link to="/candidate/register">Register your Candidates</Link>
          </li>
          <li className="ml-3">
            <Link to="/auth/login">Party/Voter Login</Link>
          </li>
          <li className="ml-3">
            <Link to="/voter/results">See Election Results</Link>
          </li>
        </ul>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="fixed top-[64px] left-0 right-0 bg-base-100 shadow-lg lg:hidden">
          <ul className="menu menu-vertical px-1 py-2 w-full">
            <li className="block">
              <Link to="/voter/register" onClick={() => setIsOpen(false)}>
                Register as a Voter
              </Link>
            </li>
            <li className="block">
              <Link to="/party/register" onClick={() => setIsOpen(false)}>
                Register a Party
              </Link>
            </li>
            <li className="block">
              <Link to="/candidate/register" onClick={() => setIsOpen(false)}>
                Register your Candidates
              </Link>
            </li>
            <li className="block">
              <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                Party/Voter Login
              </Link>
            </li>
            <li>
              <Link to="/voter/results" onClick={() => setIsOpen(false)}>
                See Election Results
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
