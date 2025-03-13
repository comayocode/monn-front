import { useState, useEffect } from 'react';
import { fetchUsers, addUser, updateUser, deleteUser } from '@/api/users';
import useToast from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';

const useUsers = (toggleDrawer, setIsModalOpen) => {
  const { setUser } = useAuth();
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
    const userWithAvatar = {
      ...newUser,
      pic: newUser.pic?.trim() || getAvatarURL(newUser.username),
    };

    const createdUser = await addUser(userWithAvatar);
    if (createdUser) {
      setUsers([...users, createdUser]);
      addToast('Usuario agregado correctamente.', 'success');
      toggleDrawer();
    } else {
      addToast('Error al agregar usuario.', 'error');
    }
  };

  const handleUpdateUser = async (updatedUser, callback) => {
    try {
      // obtener los datos del usuario actual
      const currentUserData = users.find((u) => u.id === updatedUser.id);
      if (!currentUserData) return addToast('Error: Usuario no encontrado.', 'error');

      // filtrar las propiedades que han cambiado
      const filteredUpdates = Object.fromEntries(
        Object.entries(updatedUser).filter(([key, value]) => value !== currentUserData[key])
      );

      if (Object.keys(filteredUpdates).length === 0) {
        return addToast('No hay cambios para actualizar.', 'info');
      }

      // Fusionar los datos y actualizar
      const updatedUserData = await updateUser(updatedUser.id, { ...currentUserData, ...filteredUpdates });
      if (!updatedUserData) return addToast('Error al actualizar usuario.', 'error');

      if (updatedUserData) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUserData.id ? updatedUserData : user
          )
        );
        setUser(updatedUserData); // Actualiza el usuario autenticado
        localStorage.setItem("user", JSON.stringify(updatedUserData)); // Actualiza en localStorage
        addToast('Usuario actualizado correctamente.', 'success');

        if (typeof toggleDrawer === 'function') toggleDrawer();
        if (typeof callback === 'function') callback();
      } else {
        addToast('Error al actualizar usuario.', 'error');
      }
    } catch (error) {
      addToast('Error al actualizar usuario.', 'error');
      console.error(error);
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

  const getAvatarURL = (name) => {
    if (!name) return 'https://ui-avatars.com/api/?name=User&background=random';
    const formattedName = encodeURIComponent(name);
    return `https://ui-avatars.com/api/?name=${formattedName}&background=random`;
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
    getAvatarURL
  };
};

export default useUsers;