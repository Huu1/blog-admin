import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Login } from "@/service/login";

import { useRequest } from "ahooks";
import { TOKEN } from "@/utils/axios";
import { Button, Input } from "antd";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("hy12345");

  const { loading, run } = useRequest(() => Login(username, password), {
    refreshDeps: [username, password],
    manual: true,
    onSuccess({ data, code, msg }: any) {
      if (code === 0) {
        localStorage.setItem(TOKEN, data.token);
        navigate((location as any).state?.from?.pathname || "/", {
          replace: true,
        });
      } else {
        console.log(msg);
      }
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
      <div>
        <React.Fragment>
          <Input
            id="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email Adress"
            type="email"
          />
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <div>
            {loading ? (
              <>loading</>
            ) : (
              <Button
                onClick={run}
                color="primary"
                size="large"
              >
                Login
              </Button>
            )}
          </div>
        </React.Fragment>
      </div>
  );
}
