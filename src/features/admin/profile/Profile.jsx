import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import getAvatarURL from '@/hooks/useUsers';
import './Profile.css';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import CustomSelect from '@/components/ui/Select/CustonSelect';
import useToast from '@/hooks/useToast';
import useUsers from '@/hooks/useUsers';

const Profile = () => {
  const { user } = useAuth();
    const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: user.id,
    username: user.username,
    gender: user.gender || '',
    phone: user.phone || '',
    city: user.city || '',
    role: user.role,
    emails: user.emails || [{ email: user.email, addedAt: 'Hace 2 años' }],
  });
  const { handleUpdateUser } = useUsers();
  const [emptyFields, setEmptyFields] = useState({ username: false });
const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setError(false); // Reiniciamos error general

    const newEmptyFields = {
      username: !formData.username.trim(),
    };
    setEmptyFields(newEmptyFields);

    if (newEmptyFields.username) {
      addToast('Por favor, completa todos los campos requeridos.', 'error');
      return;
    }
    await handleUpdateUser(formData, () => {
      setIsEditing(false);
    });
  };

  // TODO: Implementar la función addEmail
  const addEmail = () => {
    setFormData({
      ...formData,
      emails: [...formData.emails, { email: '', addedAt: 'Hace un momento' }],
    });
  };

    

  return (
    <div className='profile'>
      <h1 className='profile__title'>Mi perfil</h1>
      <div className='profile__content'>
        <div className='profile__banner'></div>

        <div className='profile__header'>
          <div className='profile__info'>
            <img
              src={user.pic || getAvatarURL(user.username)}
              alt='User Avatar'
              className='profile__avatar'
            />
            <div className='profile_basic-info'>
              <p className='profile__username'>{formData.username}</p>
              <p className='profile__email'>{formData.emails[0].email}</p>
            </div>
          </div>
          <Button
            variant='primary'
            size='small'
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? 'Guardar cambios' : 'Editar información'}
          </Button>
        </div>

        <form className='profile__form'>
          <Input
            label='Nombre de usuario'
            type='text'
            name='username'
            value={formData.username}
            onChange={(e) => {
              handleChange(e);

              if (error) setError(false); // 🔹 Quitar error general si hay cambios
              if (emptyFields.username) setEmptyFields({ ...emptyFields, username: false }); // 🔹 Quitar borde rojo
            }}
            disabled={!isEditing}
            error={error || emptyFields.username}
          />

          <CustomSelect
            label='Género'
            options={[
              { value: 'male', label: 'Masculino' },
              { value: 'female', label: 'Femenino' },
              { value: 'other', label: 'Otro' },
            ]}
            placeholder='Selecciona tu género'
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <Input
            label='Teléfono'
            type='number'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <Input
            label='Ciudad'
            type='text'
            name='city'
            value={formData.city}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <Input
            label='Rol'
            type='text'
            name='role'
            value={formData.role}
            disabled
          />
        </form>

        <div className='profile__emails'>
          <h3>Correos</h3>
          {formData.emails.map((email, index) => (
            <div key={index} className='profile__email-item'>
              <img
                src='/src/assets/icons/email.svg'
                alt='Email Icon'
                className='profile__email-icon'
              />
              <div>
                <p>{email.email}</p>
                <span>{email.addedAt}</span>
              </div>
            </div>
          ))}
          <button
            className='profile__add-email'
            onClick={addEmail}
            disabled={!isEditing}
          >
            + Agregar correo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
