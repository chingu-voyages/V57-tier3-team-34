import { useState } from "react";
import { loginVoter } from "../../functions/loginVoter";

import PasswordInput from "../../components/PasswordInput";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  // ########## HANDLE INPUT TEXT CHANGE ##########
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col lg:flex-row items-center justify-center text-black w-4/5 lg:w-full my-20">
        <div className="bg-base-100 rounded-2xl md:min-h-[150px] lg:min-h-[450px] w-full lg:w-[23%] flex flex-col p-8 justify-between text-white mb-10 lg:mb-0">
          <h1 className="text-3xl font-bold">Login Page</h1>

          <p className="mt-10 md:mt-0">
            Log in with your credentials and get voting!
          </p>
        </div>

        <form
          className="flex flex-col lg:ml-7 w-full lg:w-[60%]"
          onSubmit={(e) => loginVoter(e, formData, setLoginError)}
        >
          <div className="flex flex-col">
            <div className="mb-5">
              <label htmlFor="email">Email: </label> <br />
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 p-2 w-full bg-gray-200 rounded-t-sm focus:outline-none border-b border-b-black"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <PasswordInput
                value={formData.password}
                onChange={handleInputChange}
                label="Password"
                name="password"
              />
            </div>
          </div>

          {loginError && <p className="text-red-600">{loginError}</p>}

          <button
            type="submit"
            className="bg-base-100 items-end p-2 rounded text-white cursor-pointer mt-3 active:scale-95 transition-all"
          >
            Login as Voter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
