import { Outlet } from "react-router";
import SideBar from "../../components/party/dashboard/SideBar";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

const Dashboard: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(() => {
		// Default based on viewport width at load
		if (typeof window !== "undefined") {
			return window.innerWidth >= 768; // md breakpoint
		}
		return false;
	});
	return (
		<div className="flex w-full">
			<div
				className={`z-10 transform overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 md:bg-gray-200/15 h-screen border-r border-r-gray-200 ${
					isMenuOpen ? "w-70" : "w-0"
				} fixed md:relative`}
			>
				<SideBar />
			</div>
			<div className="w-full h-screen overflow-y-auto">
				<div className="p-4 cursor-pointer">
					<IoMenu
						size={25}
						onClick={() => setIsMenuOpen((isMenuOpen) => !isMenuOpen)}
					/>
					{isMenuOpen && (
						<div
							className="block md:hidden z-9 absolute left-0 top-0 bg-transparent w-full h-full"
							onClick={() => setIsMenuOpen(false)}
						></div>
					)}
				</div>
				<div className="p-4">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
