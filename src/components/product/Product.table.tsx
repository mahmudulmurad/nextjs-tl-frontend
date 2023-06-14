import { TableData } from '@/common/state.interface';
import { Delete, Edit } from '@mui/icons-material';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Checkbox, 
  Button, 
  Box 
} from '@mui/material';
import { useState } from 'react';

const ProductTable = ({
    data, 
    handleDeleteProduct,
    handleSelectProduct,
    handleUpdateProduct
}: TableData) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((item: string) => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const isItemSelected = (itemId : string) => {
    return selectedItems.includes(itemId);
  };

  const handleDeleteItems = () => {
    handleSelectProduct(selectedItems);
    setSelectedItems([]);
  };

  return (
    <TableContainer component={Paper}>
      <Box sx={{display:'flex', justifyContent: 'flex-start',mt: 2}}>
      <Button
        variant="contained"
        color="secondary"
        disabled={selectedItems.length === 0}
        onClick={handleDeleteItems}
      >
        Delete Items
      </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category ID</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.categoryId}</TableCell>
              <TableCell>{product.categoryName}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.status ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>
                <Checkbox
                  checked={isItemSelected(product.id)}
                  onChange={() => handleCheckboxChange(product.id)}
                />
                <IconButton onClick={() => handleUpdateProduct(product)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteProduct(product.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
