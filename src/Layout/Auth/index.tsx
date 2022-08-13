import React from "react";
import { getCurrentUser } from "@/service/login";
import { TOKEN } from "@/utils/axios";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface AuthContextType {
  user: any;
  signout: (callback: VoidFunction) => void;
  setCurrentUser: (callback: VoidFunction) => void;
}
export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setCurrentUser] = React.useState<any>(null);

  const signout = (callback: VoidFunction) => {
    localStorage.removeItem(TOKEN)
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

  const { isLoading,  isError } = useQuery(["currentUser"], getCurrentUser, {
    onSuccess: auth.setCurrentUser,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <>loading..</>
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
