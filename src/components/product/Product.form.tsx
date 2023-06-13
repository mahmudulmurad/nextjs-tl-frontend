import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Snackbar, RadioGroup, Radio, FormControlLabel, Alert, Box } from '@mui/material';
import { Message, ProductForm } from '../../common/state.interface';

const ProductForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ProductForm>();
  
    const [message, setMessage] = useState<Message>({ error: '', success: '' });
    
    const onSubmit = async (data: ProductForm) => {
      try {
        // Perform product creation API call here
        // ...
        
        // Show success message
        setMessage((prevMessage) => ({ ...prevMessage, success: 'Product created successfully' }));
        
        // Clear the form fields
        // ...
        
      } catch (error: any) {
        if (error?.response) {
          setMessage((prevMessage) => ({ ...prevMessage, error: error.response?.data?.message }));
        } else {
          setMessage((prevMessage) => ({ ...prevMessage, error: 'Product creation failed. Please try again.' }));
        }
      }
    };
  
    const handleSnackbarClose = () => {
        setMessage((prevMessage) => ({ ...prevMessage, success: '' }));
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
                {...register('price', { required: true, pattern: /^[0-9]+(\.[0-9]{1,2})?$/ })}
                label="Price"
                variant="outlined"
                type="number"
                fullWidth
                error={!!errors.price}
                helperText={errors.price && 'Price is required and should be a valid number'}
              />
            </Box>
            <RadioGroup {...register('status')} row>
              <FormControlLabel value="true" control={<Radio />} label="Active" />
              <FormControlLabel value="false" control={<Radio />} label="Inactive" />
            </RadioGroup>
            <Button type="submit" variant="contained" color="primary">
              Create Product
            </Button>
        </form>
  
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
      </>
    );
  };
  
  export default ProductForm;