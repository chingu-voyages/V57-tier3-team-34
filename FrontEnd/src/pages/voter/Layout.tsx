import { Outlet, useNavigate } from "react-router";
import SideBar from "../../components/voter/dashboard/Sidebar";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useProfile } from "../../api/hooks/useProfile";

const Dashboard: React.FC = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("auth_token");

	useEffect(() => {
		if (!token) {
			navigate("/auth/login");
		}
	});

	const { data: user, isLoading, error, isError } = useProfile();

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(() => {
		// Default based on viewport width at load
		if (typeof window !== "undefined") {
			return window.innerWidth >= 768; // md breakpoint
		}
		return false;
	});

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
			</div>
		);
	}

	if (isError) {
		<div className="flex h-screen flex-col items-center justify-center">
			<p className="text-red-600 font-semibold">
				{(error as Error).message || "Failed to load profile"}
			</p>
			<button
				onClick={() => window.location.reload()}
				className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
			>
				Retry
			</button>
		</div>;
	}

	return (
		<div className="flex w-full">
			<div
				className={`z-10 transform overflow-hidden transition-all duration-300 ease-in-out bg-base-200   h-screen border-r border-r-gray-200 ${
					isMenuOpen ? "w-70" : "w-0"
				} fixed md:relative`}
			>
				<SideBar user={user?.data.user} />
			</div>
			<div className="w-full h-screen overflow-y-auto">
				<div className="p-4 cursor-pointer">
					<IoMenu
						size={25}
						onClick={() => setIsMenuOpen((isMenuOpen) => !isMenuOpen)}
						className="text-stone-900"
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
