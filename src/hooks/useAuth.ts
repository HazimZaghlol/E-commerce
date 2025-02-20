import { useMutation } from "@tanstack/react-query";
import { LoginUser,  registerUser } from "../api/endpoints/auth";
import { useDispatch} from "react-redux";
import { loginSuccess, registrationSuccess } from "../features/auth/authSlice";


const useAuth = () => {
 

  const dispatch = useDispatch();
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      dispatch(registrationSuccess(data));
    },
  });

  const loginMutation = useMutation({
    mutationFn: LoginUser,
    onSuccess: (data) => {
      dispatch(loginSuccess(data));
    },
  });

 

  return {
    register: registerMutation,
    login: loginMutation,
    
  };
};

export default useAuth;
