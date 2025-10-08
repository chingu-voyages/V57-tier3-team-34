import { Link } from "react-router";
import {
	IoHomeOutline,
	IoLogInOutline,
	IoPersonOutline,
} from "react-icons/io5";

interface SideBarProps {
	user:
		| {
				userId: number;
				userType: string;
				name: string;
				email: string;
				partyId: number | null;
				createdAt: string;
		  }
		| undefined;
}

const getInitials = (name: string | undefined): string => {
	if (!name) return "";

	const parts = name.trim().split(" ").filter(Boolean);

	const firstTwo = parts.slice(0, 2);

	return firstTwo.map((word) => word[0].toUpperCase()).join("");
};

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
