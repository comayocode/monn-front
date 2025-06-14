import { lazy } from "react";

// Lazy loading de páginas principales
export const AdminPanel = lazy(() => import("@/pages/AdminPanel"));
export const LandingPage = lazy(() => import("@/pages/LandingPage"));
export const Login = lazy(() => import("@/pages/Login/Login"));
export const Twofa = lazy(() => import("@/pages/TwoFactorAuth/TwoFactorAuth"));
export const ResetPassword = lazy(() => import("@/pages/ResetPassword/ResetPassword"));
export const SignUp = lazy(() => import("@/pages/SignUp/SignUp"));
export const VerifyAccount = lazy(() => import("@/pages/VerifyAccount/VerifyAccount"));

// Lazy loading de subrutas del panel de administración
export const Clients = lazy(() => import("@/features/admin/clients/Clients"));
export const Products = lazy(() => import("@/features/admin/products/Products"));
export const Users = lazy(() => import("@/features/admin/users/Users"));
export const Dashboard = lazy(() => import("@/features/admin/dashboard/Dashboard"));
export const Profile = lazy(() => import("@/features/admin/profile/Profile"));
export const Movements = lazy(() => import("@/features/admin/movements/Movements"));
