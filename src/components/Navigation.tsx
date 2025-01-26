import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Info,
  School as Pool,
  Dumbbell,
  Users,
  UserCircle,
  Menu as Hamburger, // آیکن همبرگر
  X as Close, // آیکن X برای بستن منو
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo or Branding */}
          <div className="text-lg font-semibold md:hidden">ورزش یاب</div>
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-base font-medium px-3 py-2 rounded-md ${
                isActive("/")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}>
              <Home className="w-4 h-4 inline" />
              صفحه اصلی
            </Link>
            <Link
              to="/pool"
              className={`text-base font-medium px-3 py-2 rounded-md ${
                isActive("/pool")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}>
              <Pool className="w-4 h-4 inline" />
              استخر
            </Link>
            <Link
              to="/gym"
              className={`text-base font-medium px-3 py-2 rounded-md ${
                isActive("/gym")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}>
              <Dumbbell className="w-4 h-4 inline" />
              باشگاه بدنسازی
            </Link>
            <Link
              to="/salon"
              className={`text-base font-medium px-3 py-2 rounded-md ${
                isActive("/salon")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}>
              <Users className="w-4 h-4 inline" />
              سالن ورزشی
            </Link>
            <Link
              to="/about"
              className={`text-base font-medium px-3 py-2 rounded-md ${
                isActive("/about")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}>
              <Info className="w-4 h-4 inline" />
              درباره ما
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={handleMenuToggle}
            className="md:hidden text-gray-700 focus:outline-none">
            {isMenuOpen ? (
              <Close className="w-6 h-6" /> // آیکن X برای بستن منو
            ) : (
              <Hamburger className="w-6 h-6" /> // آیکن همبرگر
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } absolute bg-white w-full mt-2 shadow-md z-10`}>
        <div className="flex flex-col space-y-4 py-4 px-6">
          <Link
            to="/"
            className={`text-gray-700 hover:text-blue-600 ${
              isActive("/") ? "text-blue-600" : ""
            }`}>
            <Home className="w-4 h-4 inline" />
            صفحه اصلی
          </Link>
          <Link
            to="/pool"
            className={`text-gray-700 hover:text-blue-600 ${
              isActive("/pool") ? "text-blue-600" : ""
            }`}>
            <Pool className="w-4 h-4 inline" />
            استخر
          </Link>
          <Link
            to="/gym"
            className={`text-gray-700 hover:text-blue-600 ${
              isActive("/gym") ? "text-blue-600" : ""
            }`}>
            <Dumbbell className="w-4 h-4 inline" />
            باشگاه بدنسازی
          </Link>
          <Link
            to="/salon"
            className={`text-gray-700 hover:text-blue-600 ${
              isActive("/salon") ? "text-blue-600" : ""
            }`}>
            <Users className="w-4 h-4 inline" />
            سالن ورزشی
          </Link>
          <Link
            to="/about"
            className={`text-gray-700 hover:text-blue-600 ${
              isActive("/about") ? "text-blue-600" : ""
            }`}>
            <Info className="w-4 h-4 inline" />
            درباره ما
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className={`text-gray-700 hover:text-blue-600 ${
                isActive("/dashboard") ? "text-blue-600" : ""
              }`}>
              <UserCircle className="w-4 h-4 inline" />
              داشبورد
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
