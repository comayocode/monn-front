import Table from '@/components/ui/Table/Table';
import PropTypes from 'prop-types';

const UserTable = ({ data, onEdit, onDelete }) => {
  const columns = [
    { key: 'pic', label: 'Imagen', type: 'image' },
    { key: 'username', label: 'Nombre' },
    { key: 'email', label: 'Correo' },
    { key: 'password', label: 'Contraseña' },
    { key: '2fa', label: '2FA', type: 'boolean' },
    { key: 'role', label: 'Rol' },
    { key: 'actions', label: 'Acciones' },
  ];

  return <Table data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} />;
};

UserTable.propTypes = {
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserTable;