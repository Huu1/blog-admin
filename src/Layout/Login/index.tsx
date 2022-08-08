import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Login } from "@/service/login";

import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useRequest } from "ahooks";
import { TOKEN } from "@/utils/axios";

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
    <Grid>
      <div>
        <React.Fragment>
          <TextField
            id="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            placeholder="Email Adress"
            type="email"
            fullWidth
          />
          <TextField
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            placeholder="Password"
            type="password"
            fullWidth
          />
          <div>
            {loading ? (
              <CircularProgress size={26} />
            ) : (
              <Button
                onClick={run}
                variant="contained"
                color="primary"
                size="large"
              >
                Login
              </Button>
            )}
          </div>
        </React.Fragment>
      </div>
    </Grid>
  );
}
