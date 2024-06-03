import { useMutation } from "@tanstack/react-query";
import { Login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: LoginData, isLoading } = useMutation({
    mutationFn: ({ email, password }) => Login({email, password}),
    onSuccess: (user) => {
      console.log(user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { LoginData, isLoading };
}
