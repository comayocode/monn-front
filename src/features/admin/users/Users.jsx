import './Users.css';
import { useState, useEffect } from 'react';
import Table from '@/components/ui/Table/Table';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import { fetchUsers } from '@/api/users';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setLoading(false);
    };

    getUsers();
  }, []);

  const columns = [
    { key: 'pic', label: 'Imagen', type: 'image' },
    { key: 'username', label: 'Nombre' },
    { key: 'email', label: 'Correo' },
    { key: 'password', label: 'Contraseña' },
    { key: '2fa', label: '2FA', type: 'boolean' },
    { key: 'role', label: 'Rol' },
    {key: 'actions', label: 'Acciones'}
  ];

  return (
    <div className='users'>
      <h1 className='users__title'>Usuarios</h1>
      <div className='users__content'>
        <div className='user__actions'>
          <Input variant='search' />
          <Button variant='primary' size='normal'>
            Agrega un usuario
          </Button>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Table data={users} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default Users;
