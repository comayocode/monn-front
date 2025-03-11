import { useState, useEffect } from 'react';
import { fetchUsers, addUser, updateUser, deleteUser } from '@/api/users';
import useToast from '@/hooks/useToast';

const useUsers = (toggleDrawer, setIsModalOpen) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
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

  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
    } else {
      addToast('Error al actualizar usuario.', 'error');
    }
  };

  const handleDeleteUser = async () => {
    if (await deleteUser(userToDelete.id)) {
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      addToast(`Usuario ${userToDelete.username} eliminado correctamente.`, 'success');
      setIsModalOpen(false);
    } else {
      addToast('Error al eliminar usuario.', 'error');
    }
  };

  return {
    users,
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
  };
};

export default useUsers;