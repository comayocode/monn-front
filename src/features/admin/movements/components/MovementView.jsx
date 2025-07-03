import DynamicForm from '@/components/ui/Form/DynamicForm';
import PropTypes from 'prop-types';
import { baseFields, getDynamicFields } from '@/utils/movementFields';

const MovementView = ({
  initialValues,
  onSubmit,
  isEditing,
  actionButton,
  saveButtonDisabled,
}) => {
  return (
    <div>
      <DynamicForm
        key={initialValues.id || 'view-movement'}
        baseFields={baseFields}
        getDynamicFields={getDynamicFields}
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
