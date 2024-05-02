import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({newCabinData,id}) => insertEditCabin(newCabinData,id),
    onSuccess: () => {
      toast.success("You edited a cabin in the list");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),

  });

  return { editCabin, isEditing };
}

export default useEditCabin;
