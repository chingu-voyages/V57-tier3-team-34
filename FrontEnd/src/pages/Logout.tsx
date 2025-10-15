import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    localStorage.removeItem("auth_key");
    localStorage.removeItem("user_type");
    queryClient.clear();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  });
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
};

export default Logout;
