import { useState } from "react";
import { useForm } from "react-hook-form";

import type { SubmitHandler } from "react-hook-form";
import type { LoginCredentials } from "../types";
import useLogin from "../api/hooks/useLogin";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import FormErrorAlert from "../components/ui/FormErrorAlert";

const Auth: React.FC = () => {
	const navigate = useNavigate();
	const [loginError, setLoginError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginCredentials>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutate, isPending } = useLogin();

	const onSubmit: SubmitHandler<LoginCredentials> = (
		data: LoginCredentials,
	) => {
		setLoginError(null);
		mutate(data, {
			onSuccess: (data) => {
				//Choose where to send the user

				if (data.data.userType === "PARTY") {
					navigate("/party/dashboard");
				}

				if (data.data.userType === "VOTER") {
					navigate("/voter/dashboard");
				}

				if (data.data.userType === "CANDIDATE") {
					navigate("/candidate/dashboard");
				}
			},
			onError: (error) => {
				if (error instanceof AxiosError) {
					const message =
						error.response?.data?.message || "Something went wrong";
					setLoginError(message);
				} else {
					setLoginError(error?.message || "Something went wrong.");
				}
			},
		});
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="card w-full mx-10 md:w-[500px] bg-base-100 shadow-sm">
				<div className="card-body">
					<div className="text-center">
						<h2 className="text-3xl font-bold">Login to your account</h2>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						{loginError && <FormErrorAlert message={loginError} />}
						<div className="">
							<fieldset className="fieldset">
								<legend className="fieldset-legend">Email</legend>
								<input
									{...register("email", {
										required: true,
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: "Invalid email address",
										},
									})}
									className={`input w-full ${errors.email && "input-error"}`}
									placeholder="Email"
									disabled={isPending}
								/>
								{errors.email && (
									<p className="label text-error">{errors.email.message}</p>
								)}
							</fieldset>

							<fieldset className="fieldset">
								<legend className="fieldset-legend">Password</legend>
								<input
									{...register("password", {
										required: true,
										minLength: {
											value: 6,
											message:
												"Password should contain a minimum of 6 characters",
										},
									})}
									type="password"
									className={`input w-full ${errors.password && "input-error"}`}
									placeholder="Password"
									disabled={isPending}
								/>
								{errors.password && (
									<p className="label text-error">{errors.password.message}</p>
								)}
							</fieldset>
						</div>
						<div className="mt-6">
							<button type="submit" className="btn btn-primary btn-block">
								{isPending ? (
									<span className="loading loading-spinner"></span>
								) : (
									"Login"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Auth;
