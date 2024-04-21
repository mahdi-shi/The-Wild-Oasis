import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ cabinToEdit, editId }) =>
      insertEditCabin(cabinToEdit, editId),
    onSuccess: () => {
      toast.success("You edited a cabin in the list");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return { editCabin, isEditing };
}

export default useEditCabin;
