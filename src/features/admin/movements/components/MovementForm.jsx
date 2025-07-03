import DynamicForm from '@/components/ui/Form/DynamicForm';
import PropTypes from 'prop-types';
import { baseFields, getDynamicFields } from '@/utils/movementFields';

const MovementsForm = ({ initialValues, onSubmit, submitText }) => {
  return (
    <DynamicForm
      key={initialValues.id || 'new-movement'}
      baseFields={baseFields}
      getDynamicFields={getDynamicFields}
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
