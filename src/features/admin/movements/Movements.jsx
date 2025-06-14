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

const Movements = () => {
  const { movements, handleAddMovement, income, expense } = useMovements();
  const movementsData = movements.data || [];

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className='movements-container'>
      <div className='section__header'>
        <h1 className='movements__title'>Movimientos</h1>
        <Button
          size='small'
          className='movements__add-button'
          icon={iconLeft}
          iconPosition='left'
          onClick={toggleDrawer}
        >
          Agregar movimiento
        </Button>
      </div>
      <div className='movements__content'>
        <div className='movements__table'>
          <MovementsTable
            data={movementsData}
            onEdit={() => 'hola'}
            onDelete={() => 'hole'}
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
      </div>
    </div>
  );
};

export default Movements;
