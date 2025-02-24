const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

const PERMISSIONS = {
  [ROLES.ADMIN]: ["dashboard", "clients", "products", "users"], // Acceso total
  [ROLES.USER]: ["dashboard", "clients", "products"], // Sin acceso a "users"
};

export { ROLES, PERMISSIONS };
