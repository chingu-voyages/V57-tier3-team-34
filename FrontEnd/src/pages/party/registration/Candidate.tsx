import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

interface CandidateFormInput {
  fullName: string;
  email: string;
  password: string;
  politicalParty: string;
  constituency: string;
  userType: string;
}

const Candidate: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CandidateFormInput>({
    defaultValues: {
      userType: "CANDIDATE",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit: SubmitHandler<CandidateFormInput> = (data) => {
    setIsSubmitting(true);
    console.log(data);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Candidate registration API simulation complete!");
      reset();
    }, 2000);
  };


  const nigerianPoliticalParties = ["A", "B", "C", "Independent"];


  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full mx-10 md:w-[500px] bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="text-center">
            <h2 className="text-3xl font-bold">🇳🇬 Candidate Registration</h2>
            <p className="text-base-content/70 mt-2">
              Register as an Election Candidate for Nigeria
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Full Name</legend>
                <input
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  type="text"
                  className={`input w-full ${errors.fullName && "input-error"}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="label text-error">{errors.fullName.message}</p>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email Address</legend>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className={`input w-full ${errors.email && "input-error"}`}
                  placeholder="candidate@example.com"
                />
                {errors.email && (
                  <p className="label text-error">{errors.email.message}</p>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Political Party</legend>
                <select
                  {...register("politicalParty", {
                    required: "Please select a political party",
                  })}
                  className={`select w-full ${
                    errors.politicalParty && "select-error"
                  }`}
                >
                  <option value="">Select your political party</option>
                  {nigerianPoliticalParties.map((party) => (
                    <option key={party} value={party}>
                      {party}
                    </option>
                  ))}
                </select>
                {errors.politicalParty && (
                  <p className="label text-error">
                    {errors.politicalParty.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Constituency/State</legend>
                <select
                  {...register("constituency", {
                    required: "Please select your constituency",
                  })}
                  className={`select w-full ${
                    errors.constituency && "select-error"
                  }`}
                >
                  <option value="">Select your constituency/state</option>
                  {nigerianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.constituency && (
                  <p className="label text-error">
                    {errors.constituency.message}
                  </p>
                )}
              </fieldset>

              <input type="hidden" {...register("userType")} />

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message:
                        "Password must contain uppercase, lowercase and number",
                    },
                  })}
                  type="password"
                  className={`input w-full ${errors.password && "input-error"}`}
                  placeholder="Create a strong password"
                />
                {errors.password && (
                  <p className="label text-error">{errors.password.message}</p>
                )}
                <div className="text-xs text-base-content/60 mt-1">
                  Must contain uppercase, lowercase, and number
                </div>
              </fieldset>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Registering...
                  </>
                ) : (
                  <>🗳️ Register as Candidate 🐦‍🔥</>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Candidate;
