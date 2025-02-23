import { lazy } from "react";

// Lazy loading de páginas principales
export const AdminPanel = lazy(() => import("@/pages/AdminPanel"));
export const LandingPage = lazy(() => import("@/pages/LandingPage"));
export const Login = lazy(() => import("@/pages/Login"));

// Lazy loading de subrutas del panel de administración
export const Clients = lazy(() => import("@/features/admin/clients/Clients"));
export const Products = lazy(() => import("@/features/admin/products/Products"));
export const Users = lazy(() => import("@/features/admin/users/Users"));
export const Dashboard = lazy(() => import("@/features/admin/dashboard/Dashboard"));
