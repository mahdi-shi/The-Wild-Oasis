import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useSettings() {
  const {
    isLoading,
    error,
    data: Settings,
  } = useQuery({
    queryKey: ["Settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, Settings };
}

export default useSettings;
