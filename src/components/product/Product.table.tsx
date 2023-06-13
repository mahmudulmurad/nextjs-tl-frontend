import { TProductDto } from '@/common/state.interface';
import { Delete, Edit, SelectAll } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';

interface TableData{
    data: TProductDto[]
    handleDeleteProduct:(id: string) => void;
    handleUpdateProduct:(data: TProductDto) => void;
    handleSelectProduct:(id: string) => void;
}
const ProductTable = ({
    data, 
    handleDeleteProduct,
    handleSelectProduct,
    handleUpdateProduct
}: TableData) => {
  return (
    <TableContainer component={Paper}>
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
                <IconButton onClick={() => handleDeleteProduct(product.id)}>
                  <Delete />
                </IconButton>
                <IconButton onClick={() => handleUpdateProduct(product)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleSelectProduct(product.id)}>
                  <SelectAll />
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
