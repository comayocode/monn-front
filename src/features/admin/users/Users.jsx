import './Users.css';
import { useState } from 'react';
import useUsers from '@/hooks/useUsers';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import UserActions from './components/UserActions';
import Drawer from '@/components/ui/Drawer/Drawer';
import Modal from '@/components/ui/Modal/Modal';

const Users = () => {

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
    if (isDrawerOpen) {
      setEditingUser(null);
    }
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    filteredUsers,
    loading,
    searchQuery,
    setSearchQuery,
    editingUser,
    setEditingUser,
    userToDelete,
    setUserToDelete,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
  } = useUsers(toggleDrawer, setIsModalOpen);


  return (
    <div className='users'>
      <h1 className='users__title'>Usuarios</h1>
      <div className='users__content'>
        <UserActions
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddUser={() => {
            setEditingUser(null);
            setIsDrawerOpen(true);
          }}
        />
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={editingUser ? 'Editar Usuario' : 'Agregar Usuario'}
        >
          <UserForm
            initialValues={
              editingUser || { username: '', email: '', password: '', role: '' }
            }
            onSubmit={editingUser ? handleUpdateUser : handleAddUser}
            submitText={editingUser ? 'Actualizar' : 'Agregar'}
          />
        </Drawer>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <UserTable
            data={filteredUsers}
            onEdit={(user) => {
              setEditingUser(user);
              setIsDrawerOpen(true);
            }}
            onDelete={(user) => {
              setUserToDelete(user);
              setIsModalOpen(true);
            }}
          />
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title='Eliminar usuario'
          description={`¿Estás segur@ de eliminar a "${userToDelete?.username}" (${userToDelete?.email})?`}
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
