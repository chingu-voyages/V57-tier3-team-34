import { Link } from "react-router";
import { IoHomeOutline, IoListOutline, IoLogInOutline } from "react-icons/io5";
import { getInitials } from "../../../utils/getInitials";

interface SideBarProps {
  user:
    | {
        userId: number;
        userType: string;
        name: string;
        email: string;
        createdAt: string;
      }
    | undefined;
}

const SideBar: React.FC<SideBarProps> = ({ user }) => {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-5 px-6 flex">
        <div className="avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-14 rounded-full">
            <span className="text-2xl">{getInitials(user?.name)}</span>
          </div>
        </div>
      </div>
      <div>
        <ul className="menu menu-lg rounded-box w-full">
          <li className="mb-5">
            <Link to="/voter/dashboard">
              <IoHomeOutline />
              Dashboard
            </Link>
          </li>
          <li className="mb-5">
            <Link to="/voter/election">
              <IoListOutline />
              Elections
            </Link>
          </li>
          <li>
            <Link to="/auth/logout">
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
