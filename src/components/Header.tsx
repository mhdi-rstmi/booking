import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Wallet } from "lucide-react";

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold">ورزش یاب</h1>
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              <span>{user.balance.toLocaleString()} تومان</span>
            </div>
            <span>{user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              خروج
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
              ورود
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-400">
              ثبت نام
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
