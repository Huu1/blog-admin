import React from "react";
import { getCurrentUser } from "@/service/login";
import { TOKEN } from "@/utils/axios";
import { useRequest } from "ahooks";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface AuthContextType {
  user: any;
  signout: (callback: VoidFunction) => void;
  setCurrentUser: (callback: VoidFunction) => void;
}
const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setCurrentUser] = React.useState<any>(null);

  const signout = (callback: VoidFunction) => {
    localStorage.remove(TOKEN);
    callback?.();
  };

  const value = { user, signout, setCurrentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();

  const initState = useRequest(getCurrentUser, {
    onSuccess: auth.setCurrentUser,
  });

  if (initState.loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return children;
}
