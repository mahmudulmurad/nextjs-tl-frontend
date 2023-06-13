import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Message, FormData } from '../../common/state.interface';
import { login_url } from '../../api';


const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = () => {
  const [message, setMessage] = useState<Message>({ error: '', success: '' });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post(login_url, data);
      const { accessToken } = response.data;
      setMessage((prevMessage) => ({ ...prevMessage, success: 'Login successful' }));
      localStorage.setItem('accessToken', accessToken);
      router.push('/product');
    }
    catch (error: any) {
      if (error?.response) {
        setMessage((prevMessage) => ({ ...prevMessage, error: error.response?.data?.message }));
      } else {
        setMessage((prevMessage) => ({ ...prevMessage, error: 'Login failed. Please try again.' }));
      }
    }
  };

  const handleSnackbarClose = () => {
    setMessage((prevMessage) => ({ ...prevMessage, success: '' }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
      {message.error && (
        <Typography sx={{mt: '10px'}}  variant="body2" color="error" component="p">
          {message.error}
        </Typography>
      )}

      <Snackbar open={!!message.success} autoHideDuration={3000} onClose={handleSnackbarClose} message={message.success}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {message.success}
          </Alert>
      </Snackbar>
    </form>
  );
};

export default LoginForm;
