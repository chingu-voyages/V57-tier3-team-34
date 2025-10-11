import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import useRegisterParty from "../../../api/hooks/useRegisterParty";
import { AxiosError } from "axios";
import { Link } from "react-router";

interface PoliticalPartyFormInput {
	name: string;
	email: string;
	password: string;
	userType: string;
}

const Party: React.FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<PoliticalPartyFormInput>({
		defaultValues: {
			userType: "PARTY",
		},
	});

	const [registrationError, setRegistrationError] = useState<string | null>(
		null,
	);
	const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

	const { mutate, isPending } = useRegisterParty();

	const onSubmit: SubmitHandler<PoliticalPartyFormInput> = (data) => {
		setRegistrationError(null);
		mutate(data, {
			onSuccess: () => {
				setRegisterSuccess(true);
				reset();
			},

			onError: (error) => {
				if (error instanceof AxiosError) {
					const message =
						error.response?.data?.message || "Something went wrong";
					setRegistrationError(message);
				} else {
					setRegistrationError(error?.message || "Something went wrong.");
				}
			},
		});
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="card w-full mx-10 md:w-[500px] bg-base-100 shadow-sm">
				<div className="card-body">
					{registerSuccess ? (
						<div className="text-center">
							<p className="items-center gap-2 rounded-md my-5 border border-green-300 bg-green-50 p-3 text-green-700">
								Party Registration Successful
							</p>
							<Link to="/auth/login" className="btn">
								Login Now
							</Link>
						</div>
					) : (
						<>
							<div className="text-center">
								<h2 className="text-3xl font-bold">
									Political Party Registration
								</h2>
							</div>
							<form onSubmit={handleSubmit(onSubmit)}>
								{registrationError && (
									<div className="flex items-center gap-2 rounded-md my-5 border border-red-300 bg-red-50 p-3 text-red-700">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 flex-shrink-0 text-red-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 9v2m0 4h.01M12 5a7 7 0 110 14a7 7 0 010-14z"
											/>
										</svg>
										<span>{registrationError}</span>
									</div>
								)}
								<div className="">
									<fieldset className="fieldset">
										<legend className="fieldset-legend">Party Name</legend>
										<input
											{...register("name", { required: true })}
											type="text"
											className={`input w-full ${errors.name && "input-error"}`}
											placeholder="Political party name"
										/>
										{errors.name && (
											<p className="label text-error">{errors.name.message}</p>
										)}
									</fieldset>

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
											className={`input w-full ${
												errors.email && "input-error"
											}`}
											placeholder="Email"
										/>
										{errors.email && (
											<p className="label text-error">{errors.email.message}</p>
										)}
									</fieldset>

									<input type="hidden" {...register("userType")} />

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
											className={`input w-full ${
												errors.password && "input-error"
											}`}
											placeholder="Password"
										/>
										{errors.password && (
											<p className="label text-error">
												{errors.password.message}
											</p>
										)}
									</fieldset>
								</div>
								<div className="mt-6">
									<button type="submit" className="btn btn-primary btn-block">
										{isPending ? (
											<span className="loading loading-spainner"></span>
										) : (
											"Register"
										)}
									</button>
								</div>
							</form>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Party;
