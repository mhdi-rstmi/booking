import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Info,
  School as Pool,
  Dumbbell,
  Users,
  UserCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                isActive("/")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}>
              <Home className="w-4 h-4" />
              صفحه اصلی
            </Link>
            <Link
              to="/pool"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                isActive("/pool")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}>
              <Pool className="w-4 h-4" />
              استخر
            </Link>
            <Link
              to="/gym"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                isActive("/gym")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}>
              <Dumbbell className="w-4 h-4" />
              باشگاه بدنسازی
            </Link>
            <Link
              to="/salon"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                isActive("/salon")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}>
              <Users className="w-4 h-4" />
              سالن ورزشی
            </Link>
            <Link
              to="/about"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                isActive("/about")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}>
              <Info className="w-4 h-4" />
              درباره ما
            </Link>
          </div>
          {user && (
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/dashboard")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}>
              <UserCircle className="w-4 h-4" />
              داشبورد
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
