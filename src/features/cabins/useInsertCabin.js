import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useInsertCabin() {
  const queryClient = useQueryClient();

  const { mutate: insertCabin, isLoading: isInserting } = useMutation({
    mutationFn: insertEditCabin,
    onSuccess: () => {
      toast.success("You added a cabin to the list");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return {insertCabin, isInserting};
}

export default useInsertCabin;
