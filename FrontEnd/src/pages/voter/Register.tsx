import { useState, useRef } from "react";
import { registerVoter } from "../../functions/registerVoter";
import { convertToBase64 } from "../../functions/convertToBase64";

import PasswordInput from "../../components/PasswordInput";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    verifyDoc: "",
  });
  const [previewImg, setPreviewImg] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

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

  // ########## HANDLE IMAGE CHANGE ##########
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      setFormData({
        ...formData,
        verifyDoc: await convertToBase64(e.target.files[0]),
      });
    } else {
      setPreviewImg("");
      setFormData({
        ...formData,
        verifyDoc: "",
      });
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
          onSubmit={(e) => registerVoter(e, formData, setFormData)}
        >
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:w-[45%]">
              <div className="mb-5">
                <label htmlFor="fullName">Full Name: </label> <br />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
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
                  required
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
            </div>

            <div className="md:w-[53%] md:p-3">
              <label htmlFor="verifyDoc">Verification Document:</label>
              <input
                name="verifyDoc"
                type="file"
                id="verifyDoc"
                className="hidden"
                ref={inputRef}
                multiple
                accept=".jpg, .jpeg, .png .webp"
                onChange={handleImageChange}
              />
              <div
                className="bg-gray-200 w-full h-[300px] relative overflow-hidden rounded-2xl cursor-pointer hover:bg-gray-300 transition-all mt-1"
                onClick={() => inputRef.current?.click()}
              >
                {previewImg ? (
                  <img
                    alt="verification document"
                    src={previewImg}
                    className="absolute h-full object-cover"
                  />
                ) : (
                  <span className="flex flex-col items-center justify-center rounded-lg h-full p-10 text-center text-gray-400">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      className="mb-2"
                    >
                      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                    </svg>
                    Click to select a document for verification
                  </span>
                )}
              </div>
            </div>
          </div>

          {!isPasswordMatch && (
            <p className="text-red-600">The passwords don't match!</p>
          )}

          <button
            type="submit"
            className="bg-base-100 items-end p-2 rounded text-white cursor-pointer mt-3 active:scale-95 transition-all"
          >
            Register as a voter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
