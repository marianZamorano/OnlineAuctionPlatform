import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { useUser } from '../context/UserContext';
import { useAuction } from '../hooks/useAuction';

interface BidFormProps {
  productId: number;
}

export const BidForm = ({ productId }: BidFormProps) => {
  const { user } = useUser();
  const { placeBid } = useAuction(productId, user?.id || null);

  const validationSchema = Yup.object({
    amount: Yup.number().required('Amount is required').min(0, 'Amount must be positive'),
  });

  return (
    <Formik
      initialValues={{ amount: 0 }}
      validationSchema={validationSchema}
      onSubmit={(values) => placeBid(values.amount)}
    >
      <Form>
        <Field
          as={TextField}
          name="amount"
          label="Monto"
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Username"
          value={user?.nombreDeUsuario || ''}
          disabled
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth>
          Enviar oferta
        </Button>
      </Form>
    </Formik>
  );
};