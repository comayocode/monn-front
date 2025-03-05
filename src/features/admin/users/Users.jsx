import './Users.css';
import { useState, useEffect } from 'react';
import Table from '@/components/ui/Table/Table';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import Drawer from '@/components/ui/Drawer/Drawer';
import Form from '@/components/ui/Form/Form';
import useToast from '@/hooks/useToast';
import { fetchUsers } from '@/api/users';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setLoading(false);
    };

    getUsers();
  }, []);

  // Filtrar usuarios en base al query de búsqueda
  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    addToast("Usuario agregado correctamente.", "success");
    toggleDrawer(); // Cierra el drawer después de agregar
  };

  const columns = [
    { key: 'pic', label: 'Imagen', type: 'image' },
    { key: 'username', label: 'Nombre' },
    { key: 'email', label: 'Correo' },
    { key: 'password', label: 'Contraseña' },
    { key: '2fa', label: '2FA', type: 'boolean' },
    { key: 'role', label: 'Rol' },
    { key: 'actions', label: 'Acciones' },
  ];

  const userFields = [
    {
      name: 'username',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Ej: Juan Pérez',
    },
    {
      name: 'email',
      label: 'Correo',
      type: 'email',
      placeholder: 'Ej: correo@ejemplo.com',
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      placeholder: '••••••••••••',
      variant: 'password',
    },
    { name: 'role', label: 'Rol', type: 'text', placeholder: 'Ej: Admin' },
  ];

  return (
    <div className='users'>
      <h1 className='users__title'>Usuarios</h1>
      <div className='users__content'>
        <div className='user__actions'>
          <Input
            variant='search'
            placeholder='Buscar usuario...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant='primary'
            size='normal'
            onClick={() => setIsDrawerOpen(true)}
          >
            Agrega un usuario
          </Button>
        </div>
        <Drawer
          isOpen={isDrawerOpen}
          onClose={toggleDrawer}
          title='Agregar Usuario'
        >
          <Form
            fields={userFields}
            onSubmit={handleAddUser}
            submitText='Crear usuario'
          />
        </Drawer>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Table data={filteredUsers} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default Users;
