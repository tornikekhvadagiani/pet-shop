import { toast } from "react-toastify";

export const useDolarToGel = () => {
  return fetch(
    "https://bankofgeorgia.ge/api/currencies/convert/USD/GEL?amountFrom=1"
  )
    .then((res) => {
      if (!res.ok) {
        toast.error("Something went wrong with GEL price");
        return null;
      }
      return res.json();
    })
    .then((data) => {
      return data?.data.amount ?? null;
    })
    .catch(() => {
      toast.error("Failed to fetch currency exchange rate");
      return null;
    });
};
