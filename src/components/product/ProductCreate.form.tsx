import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Snackbar, RadioGroup, Radio, FormControlLabel, Alert, Box } from '@mui/material';
import { Message, ProductForm, TFormType } from '../../common/state.interface';
import axios from 'axios';
import { create_product } from '../../api'

const ProductCreateForm = (props:TFormType) => {
  const {setCall, setOpenModal} =  props;
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ProductForm>();
  
    const [message, setMessage] = useState<Message>({ error: '', success: '' });
    const [productStatus, setProductStatus] = useState<string>('');
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setProductStatus(value);
    };
    const handleSnackbarClose = () => {
        setMessage((prevMessage) => ({ ...prevMessage, success: '' }));
    };

  
    const onSubmit = async (data: ProductForm) => {
      const formData = {
        ...data,
        status: productStatus === 'true'
      }
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(create_product,formData,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(response?.status === 201){
          setMessage((prevMessage) => ({ ...prevMessage, success: 'Product created successfully' }));
          setCall(true);
          setOpenModal({create:false, update: false});
        }
      } catch (error: any) {
        if (error?.response) {
          setMessage((prevMessage) => ({ ...prevMessage, error: error.response?.data?.message }));
        } else {
          setMessage((prevMessage) => ({ ...prevMessage, error: `Product create failed. Please try again.` }));
        }
      }
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ marginBottom: '16px' }}>
              <TextField
                {...register('productName', { required: true })}
                label="Product Name"
                variant="outlined"
                fullWidth
                error={!!errors.productName}
                helperText={errors.productName && 'Product Name is required'}
              />
            </Box>
            <Box sx={{ marginBottom: '16px' }}>
              <TextField
                {...register('categoryId', { required: true })}
                label="Category ID"
                variant="outlined"
                type="number"
                fullWidth
                error={!!errors.categoryId}
                helperText={errors.categoryId && 'Category ID is required'}
              />
            </Box>
            <Box sx={{ marginBottom: '16px' }}>
              <TextField
                {...register('categoryName', { required: true })}
                label="Category Name"
                variant="outlined"
                fullWidth
                error={!!errors.categoryName}
                helperText={errors.categoryName && 'Category Name is required'}
              />
            </Box>
            <Box sx={{ marginBottom: '16px' }}>
              <TextField
                {...register('price', { required: true })}
                label="Price"
                variant="outlined"
                type="number"
                fullWidth
                error={!!errors.price}
                helperText={errors.price && 'Price is required and should be a valid number'}
              />
            </Box> 
            <RadioGroup 
              {...register('status')} 
              value={productStatus} 
              row
              onChange={handleChange}
            >
              <FormControlLabel value="true" control={<Radio />} label="Active" />
              <FormControlLabel value="false" control={<Radio />} label="Inactive" />
            </RadioGroup>
            <Button type="submit" variant="contained" color="primary">
              Create Product
            </Button>
        </form>
  
        {message.error && (
        <Typography sx={{mt: '50px'}}  variant="body2" color="error" component="p">
          {message.error}
        </Typography>
      )}

      <Snackbar sx={{mt: '50px'}} open={!!message.success} autoHideDuration={3000} onClose={handleSnackbarClose} message={message.success}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {message.success}
          </Alert>
      </Snackbar>
      </>
    );
  };
  
  export default ProductCreateForm;