import { Link } from "react-router";
import {
  IoHomeOutline,
  IoLogInOutline,
  IoPersonOutline,
} from "react-icons/io5";

const SideBar: React.FC = () => {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-5 px-6 flex">
        <div className="avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-14 rounded-full">
            <span className="text-2xl">PA</span>
          </div>
        </div>
      </div>
      <div>
        <ul className="menu menu-lg rounded-box w-full">
          <li className="mb-5">
            <Link to="/party/dashboard">
              <IoHomeOutline />
              Dashboard
            </Link>
          </li>
          <li className="mb-5">
            <Link to="/party/candidates">
              <IoPersonOutline />
              Candidates
            </Link>
          </li>
          <li>
            <Link to="/">
              <IoLogInOutline />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
