import { useState } from "react";
import { registerVoter } from "../../functions/registerVoter";

import PasswordInput from "../../components/PasswordInput";

const Register = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [isPasswordMatch, setIsPasswordMatch] = useState(true);

	// ########## HANDLE INPUT TEXT CHANGE ##########
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});

		// PASSWORD MATCHING FUNCTIONALITY - use current values
		let currentPassword = formData.password;
		let currentConfirmPassword = formData.confirmPassword;

		// UPDATE THE CURRENT VALUES BASED ON WHICH FIELD CHANGED
		if (name === "password") {
			currentPassword = value;
		} else if (name === "confirmPassword") {
			currentConfirmPassword = value;
		}

		// PASSWORD MATCHING FUNCTIONALITY
		if (currentPassword !== currentConfirmPassword) {
			setIsPasswordMatch(false);
		} else if (currentPassword === currentConfirmPassword) {
			setIsPasswordMatch(true);
		}
	};

	return (
		<div className="flex justify-center min-h-screen">
			<div className="flex flex-col lg:flex-row items-center justify-center text-black w-4/5 lg:w-full my-20">
				<div className="bg-base-100 rounded-2xl md:min-h-[150px] lg:min-h-[450px] w-full lg:w-[23%] flex flex-col p-8 justify-between text-white mb-10 lg:mb-0">
					<h1 className="text-3xl font-bold">Register Page</h1>

					<p className="mt-10 md:mt-0">
						Sign up on our platform with your credentials and get voting!
					</p>
				</div>

				<form
					className="flex flex-col lg:ml-7 w-full lg:w-[60%]"
					onSubmit={(e) => registerVoter(e, formData)}
				>
					<div className="mb-5">
						<label htmlFor="fullName">Full Name: </label> <br />
						<input
							type="text"
							id="fullName"
							name="fullName"
							className="mt-1 p-2 w-full bg-gray-200 rounded-t-sm focus:outline-none border-b border-b-black"
							value={formData.fullName}
							onChange={handleInputChange}
						/>
					</div>

					<div className="mb-5">
						<label htmlFor="email">Email: </label> <br />
						<input
							type="email"
							id="email"
							name="email"
							className="mt-1 p-2 w-full bg-gray-200 rounded-t-sm focus:outline-none border-b border-b-black"
							value={formData.email}
							onChange={handleInputChange}
						/>
					</div>

					<div className="mb-5">
						<PasswordInput
							value={formData.password}
							onChange={handleInputChange}
							label="Password"
							name="password"
						/>
					</div>

					<div>
						<PasswordInput
							value={formData.confirmPassword}
							onChange={handleInputChange}
							label="Confirm Password"
							name="confirmPassword"
						/>
					</div>

					{!isPasswordMatch && (
						<p className="text-red-600">The passwords don't match!</p>
					)}

					<button
						type="submit"
						className="bg-base-content items-end p-2 rounded text-white cursor-pointer mt-3 active:scale-95 transition-all"
					>
						Register your account
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
