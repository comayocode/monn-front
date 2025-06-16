export function formatDatetimeLocalToISO(date, time) {
  if (!date) return '';

  // Si ya viene con T y segundos, retorna igual
  if (date.includes('T') && date.length >= 19) return date;

  // Si solo tiene fecha, agrega la hora recibida o 00:00:00
  if (date.length === 10) {
    return `${date}T${time || '00:00:00'}`;
  }

  // Si viene con fecha y hora sin segundos (ej: 2025-06-15T15:30)
  if (date.length === 16) {
    return `${date}:00`;
  }

  return date; // Ya tiene segundos
}

export function formatFormDates(formData, fields) {
  // Devuelve un nuevo objeto con las fechas formateadas
  const formatted = { ...formData };
  fields.forEach(field => {
    if (field.type === 'date' && formData[field.name]) {
      const now = new Date();
      const time = `${now.getHours()}`.padStart(2, '0') + ':' + `${now.getMinutes()}`.padStart(2, '0') + ':' + `${now.getSeconds()}`.padStart(2, '0');
      formatted[field.name] = formatDatetimeLocalToISO(formData[field.name], time);
    }
  });
  return formatted;
}