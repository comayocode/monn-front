import DynamicForm from '@/components/ui/Form/DynamicForm';
import PropTypes from 'prop-types';
import { baseFields, getDynamicFields } from '@/utils/movementFields';
import useCounterparties from '@/hooks/useCounterparties';

const MovementsForm = ({ initialValues, onSubmit, submitText }) => {
  const { counterparties } = useCounterparties();

  // TODO: PONER FUNCIONES EN UTILS
  const counterpartiesArray = counterparties.data || [];
  console.log(counterpartiesArray);

  const getDynamicFieldsWithCounterparties = (formData) =>
    getDynamicFields(formData, counterpartiesArray);

  return (
    <DynamicForm
      key={initialValues.id || 'new-movement'}
      baseFields={baseFields}
      getDynamicFields={getDynamicFieldsWithCounterparties}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitText={submitText}
    />
  );
};

MovementsForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default MovementsForm;
