import DynamicForm from '@/components/ui/Form/DynamicForm';
import PropTypes from 'prop-types';
import { baseFields, getDynamicFields } from '@/utils/movementFields';
import useCounterparties from '@/hooks/useCounterparties';

const MovementView = ({
  initialValues,
  onSubmit,
  isEditing,
  actionButton,
  saveButtonDisabled,
}) => {
  const { counterparties } = useCounterparties();
  // Extraer el array correcto de counterparties
  const counterpartiesArray = counterparties.data || [];
  // Pasar counterparties a getDynamicFields
  const getDynamicFieldsWithCounterparties = (formData) =>
    getDynamicFields(formData, counterpartiesArray);

  return (
    <div>
      <DynamicForm
        key={initialValues.id || 'view-movement'}
        baseFields={baseFields}
        getDynamicFields={getDynamicFieldsWithCounterparties}
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitText={'Guardar Cambios'}
        disabledBtn={saveButtonDisabled}
        fieldsDisabled={!isEditing}
      />
      {actionButton}
    </div>
  );
};

MovementView.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  isEditing: PropTypes.bool,
  actionButton: PropTypes.node,
  saveButtonDisabled: PropTypes.bool,
};

export default MovementView;
