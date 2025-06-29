import { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Box, Snackbar } from '@mui/material';
import { UserContext } from '../context/UserContext';
import { useAuction } from '../hooks/useAuction';
import type { Product } from '../services/productService';

interface BidFormProps {
  product: Product;
}

const BidSchema = Yup.object().shape({
  amount: Yup.number()
    .min(1, 'Bid must be at least 1')
    .required('Bid amount is required')
    .test('higher-than-current', 'Bid must be higher than current price', function (value) {
      return value > this.parent.currentPrice;
    }),
});

export const BidForm: React.FC<BidFormProps> = ({ product }) => {
  const { user } = useContext(UserContext);
  const { placeBid } = useAuction();
  const [openSnackbar, setOpenSnackbar] = useState<string | null>(null);

  return (
    <Box sx={{ mt: 2 }}>
      <Formik
        initialValues={{ amount: product.currentPrice + 1, currentPrice: product.currentPrice }}
        validationSchema={BidSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await placeBid(product.id, values.amount, user);
            setOpenSnackbar('Bid placed successfully!');
            resetForm({ values: { amount: product.currentPrice + 1, currentPrice: product.currentPrice } });
          } catch (error: any) {
            setOpenSnackbar(error.message || 'Failed to place bid');
          }
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="amount"
              label="Your Bid"
              type="number"
              fullWidth
              error={touched.amount && !!errors.amount}
              helperText={touched.amount && errors.amount}
            />
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting || !user} sx={{ mt: 1 }}>
              Place Bid
            </Button>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={!!openSnackbar}
        autoHideDuration={3000}
        message={openSnackbar}
        onClose={() => setOpenSnackbar(null)}
      />
    </Box>
  );
};