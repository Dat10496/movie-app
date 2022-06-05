import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { LoadingButton } from "@mui/lab";
import { FTextField, FormProvider } from "../components/form";
import useAuth from "../hooks/useAuth";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  p: 1,
};

const defaultValues = {
  username: "votada",
  password: "123456",
};

function SignInPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const [showPassword, setShowPassword] = useState(true);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let from = location.state?.from?.pathname || "/";
    let username = data.username;
    let password = data.password;

    auth.login(username, password, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        backgroundColor: "#2b2b2b	",
        height: "100%",
        width: "100%",
        m: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          p: 1,
          width: 700,
          height: 400,
          backgroundColor: "#4b4f4f",
        }}
      >
        <Box sx={style}>
          <LockIcon sx={{ fontSize: 30, color: "error.main" }}></LockIcon>
        </Box>
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Log In
          </Typography>
        </Box>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FTextField name="username" label="User name" />
            <FTextField
              name="password"
              label="Password"
              type={showPassword ? "password" : "text"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="space-between"
            sx={{ my: 2 }}
          ></Stack>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            loading={isSubmitting}
            variant="contained"
            sx={{ bgcolor: "error.main" }}
          >
            Sign In
          </LoadingButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "error.dark",
              p: 2,
            }}
          >
            <Typography variant="subtitle2" component="div">
              Forget password?
            </Typography>
            <Typography variant="subtitle2" component="div">
              Don't have an account? Sign up
            </Typography>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
}

export default SignInPage;
