import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isPending: isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! please verify the new account form the user's email address"
      );
    },
  });

  return { signUp, isLoading };
}
