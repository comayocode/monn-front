import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import PropTypes from 'prop-types';

const UserActions = ({ searchQuery, setSearchQuery, onAddUser }) => {
  return (
    <div className='user__actions'>
      <Input
        variant='search'
        placeholder='Buscar usuario...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant='primary' size='normal' onClick={onAddUser}>
        Agregar usuario
      </Button>
    </div>
  );
};

UserActions.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  onAddUser: PropTypes.func.isRequired,
};

export default UserActions;