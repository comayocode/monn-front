import useMovements from '@/hooks/useMovements';
import MovementsTable from './components/MovementsTable';
import './Movements.css';
import BarChartMovements from './components/BarChartMovements';
import { getLast14DaysData } from '@/utils/getLast14DaysData';
import Button from '@/components/ui/Button/Button';
import iconLeft from '@/assets/icons/left-nav.svg';
import MovementForm from './components/MovementForm';
import Drawer from '@/components/ui/Drawer/Drawer';
import { useState } from 'react';
import MovementView from './components/MovementView';

const Movements = () => {
  const {
    movements,
    movementToView,
    handleToViewMovement,
    handleAddMovement,
    handleUpdateMovement,
    income,
    expense,
  } = useMovements();
  const movementsData = movements.data || [];

  const toggleAddMovementDrawer = () => setIsDrawerOpen((prev) => !prev);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editButtonDisabled, setEditButtonDisabled] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  return (
    <div className='movements-container'>
      <div className='section__header'>
        <h1 className='movements__title'>Movimientos</h1>
        <Button
          size='small'
          className='movements__add-button'
          icon={iconLeft}
          iconPosition='left'
          onClick={toggleAddMovementDrawer}
        >
          Agregar movimiento
        </Button>
      </div>
      <div className='movements__content'>
        <div className='movements__table'>
          <MovementsTable
            data={movementsData}
            onDelete={() => console.log('Delete movement')}
            onView={(movement) => {
              setIsViewDrawerOpen(true);
              handleToViewMovement(movement);
            }}
          />
        </div>
        <div className='movements__charts'>
          <div className='chart__expense'>
            <h2 className='chart__title'>Ingresos</h2>
            <BarChartMovements data={getLast14DaysData(income)} />
          </div>
          <div className='chart__income'>
            <h2 className='chart__title'>Egresos</h2>
            <BarChartMovements data={getLast14DaysData(expense)} />
          </div>
        </div>
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={'Agregar Movimiento'}
        >
          <MovementForm
            initialValues={{}}
            onSubmit={handleAddMovement}
            submitText={'Registrar Movimiento'}
          />
        </Drawer>
        <Drawer
          isOpen={isViewDrawerOpen}
          onClose={() => {
            setIsViewDrawerOpen(false);
            setIsEditing(false);
            setEditButtonDisabled(false);
            setSaveButtonDisabled(true);
          }}
          title={'Detalles de Movimiento'}
        >
          <MovementView
            initialValues={movementToView || {}}
            isEditing={isEditing}
            saveButtonDisabled={saveButtonDisabled}
            onSubmit={async (data) => {
              setIsEditing(false);
              setEditButtonDisabled(false);
              setSaveButtonDisabled(true);
              // Agrega el id del movimiento a la data del form
              await handleUpdateMovement({
                ...data,
                id: movementToView?.id,
                // TODO: Quitar luego de actualizar endpoint para que no sea requerido remainingAmount
                remainingAmount: movementToView?.remainingAmount
              });
            }}
            actionButton={
              <Button
                variant='primary'
                size='small'
                disabled={editButtonDisabled}
                onClick={() => {
                  setIsEditing(true);
                  setEditButtonDisabled(true);
                  setSaveButtonDisabled(false);
                }}
                type='button'
                style={{ marginTop: 16 }}
              >
                Editar movimiento
              </Button>
            }
          />
        </Drawer>
      </div>
    </div>
  );
};

export default Movements;
