import './Users.css';
import { fetchUsers, addUser, updateUser, deleteUser } from '@/api/users';
import { useState, useEffect } from 'react';
import Table from '@/components/ui/Table/Table';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import Drawer from '@/components/ui/Drawer/Drawer';
import Form from '@/components/ui/Form/Form';
import Modal from '@/components/ui/Modal/Modal';
import useToast from '@/hooks/useToast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { addToast } = useToast();
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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
    if (!isDrawerOpen) setEditingUser(null); // Limpia al cerrar
  };

  const handleAddUser = async (newUser) => {
    const createdUser = await addUser(newUser);
    if (createdUser) {
      setUsers([...users, createdUser]);
      addToast('Usuario agregado correctamente.', 'success');
      toggleDrawer();
    } else {
      addToast('Error al agregar usuario.', 'error');
    }
  };

  // Abrir el drawer con los datos del usuario a editar
  const handleOpenUpdateUser = (user) => {
    setEditingUser(user);
    setIsDrawerOpen(true);
  };

  // Editar usuario
  const handleUpdateUser = async (updatedUser) => {
    const updatedUserData = await updateUser(updatedUser.id, updatedUser);
    if (updatedUserData) {
      setUsers(
        users.map((user) =>
          user.id === updatedUserData.id ? updatedUserData : user
        )
      );
      addToast('Usuario actualizado correctamente.', 'success');
      toggleDrawer();
      setEditingUser(null);
    } else {
      addToast('Error al actualizar usuario.', 'error');
    }
  };

  const handleOpenDeleteModal = (user) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (await deleteUser(userToDelete.id)) {
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      addToast(`Usuario ${userToDelete.username} eliminado correctamente.`, 'success');
    } else {
      addToast('Error al eliminar usuario.', 'error');
    }
    setIsModalOpen(false);
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
            onClick={() => {
              setIsDrawerOpen(true);
              setEditingUser(null); // 🔹 Limpia los datos previos
            }}
          >
            Agrega un usuario
          </Button>
        </div>
        <Drawer
          isOpen={isDrawerOpen}
          onClose={toggleDrawer}
          title={editingUser ? 'Editar Usuario' : 'Agregar Usuario'}
        >
          <Form
            fields={userFields}
            initialValues={
              editingUser || { username: '', email: '', password: '', role: '' }
            }
            onSubmit={editingUser ? handleUpdateUser : handleAddUser}
            submitText={editingUser ? 'Actualizar usuario' : 'Crear usuario'}
          />
        </Drawer>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Table
            data={filteredUsers}
            columns={columns}
            onEdit={handleOpenUpdateUser}
            onDelete={handleOpenDeleteModal}
          />
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title='Eliminar usuario'
          description={`¿Estás seguro de eliminar a "${userToDelete?.username}" (${userToDelete?.email})?`}
          variant='confirmation'
          actions={[
            {
              text: 'Cancelar',
              onClick: () => setIsModalOpen(false),
              variant: 'secondary',
            },
            { text: 'Eliminar', onClick: handleDeleteUser, variant: 'danger' },
          ]}
        />
      </div>
    </div>
  );
};

export default Users;
