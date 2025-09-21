import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

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

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const onSubmit: SubmitHandler<PoliticalPartyFormInput> = (data) => {
		setIsSubmitting(true);
		console.log(data);

		setTimeout(() => {
			setIsSubmitting(false);
			alert("registration api simulation complete!");
			reset();
		}, 2000);
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="card w-full mx-10 md:w-[500px] bg-base-100 shadow-sm">
				<div className="card-body">
					<div className="text-center">
						<h2 className="text-3xl font-bold">Political Party Registration</h2>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
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
									className={`input w-full ${errors.email && "input-error"}`}
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
									className={`input w-full ${errors.password && "input-error"}`}
									placeholder="Password"
								/>
								{errors.password && (
									<p className="label text-error">{errors.password.message}</p>
								)}
							</fieldset>
						</div>
						<div className="mt-6">
							<button type="submit" className="btn btn-primary btn-block">
								{isSubmitting ? (
									<span className="loading loading-spainner"></span>
								) : (
									"Register"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Party;
