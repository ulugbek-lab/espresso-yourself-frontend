/** Toast notification handling (react-hot-toast) **/
import toast from "react-hot-toast";
import { Messages } from "./config";

export const sweetErrorHandling = async (err: any) => {
  const error = err.response?.data ?? err;
  const message = error?.message ?? Messages.error1;
  toast.error(message, { id: message });
};

export const sweetTopSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  toast.success(msg, { duration });
};

export const sweetTopSmallSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  toast.success(msg, { duration, style: { minWidth: "auto" } });
};

export const sweetFailureProvider = (
  msg: string,
  show_button: boolean = false,
  forward_url: string = ""
) => {
  toast.error(msg, {
    duration: 3500,
  });
  if (forward_url !== "") {
    setTimeout(() => window.location.replace(forward_url), 800);
  }
};
