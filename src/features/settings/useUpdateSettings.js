import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("You Update the Setting");
      queryClient.invalidateQueries({
        queryKey: ["Settings"],
      });
    },
  });

  return { updateSettings, isUpdating };
}

export default useUpdateSettings;
