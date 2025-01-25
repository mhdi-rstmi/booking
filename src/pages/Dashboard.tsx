import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { format } from 'date-fns-jalali';

export const Dashboard: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { branches, timeSlots, getUserReservations } = useData();
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

  const userReservations = getUserReservations(user.id);

  const getBranchName = (type: string, branchId: number) => {
    const branch = branches[type as keyof typeof branches].find(b => b.id === branchId);
    return branch?.name || '';
  };

  const getTimeSlot = (timeSlotId: number) => {
    const slot = timeSlots.find(ts => ts.id === timeSlotId);
    return slot ? `${slot.start} - ${slot.end}` : '';
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updates: { email?: string; password?: string } = {};
    if (email !== user.email) updates.email = email;
    if (password) updates.password = password;
    updateUser(updates);
    setIsEditing(false);
    setPassword('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">پروفایل کاربری</h2>
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">ایمیل</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">رمز عبور جدید</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="خالی بگذارید اگر نمی‌خواهید تغییر دهید"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  ذخیره تغییرات
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEmail(user.email);
                    setPassword('');
                  }}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  انصراف
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">نام</p>
                <p className="font-bold">{user.name}</p>
              </div>
              <div>
                <p className="text-gray-600">ایمیل</p>
                <p className="font-bold">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-600">موجودی حساب</p>
                <p className="font-bold text-blue-600">
                  {user.balance.toLocaleString()} تومان
                </p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                ویرایش پروفایل
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">رزروهای من</h2>
          <div className="space-y-4">
            {userReservations.length === 0 ? (
              <p className="text-gray-600">شما هنوز رزروی ثبت نکرده‌اید</p>
            ) : (
              userReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">
                      {getBranchName(reservation.facilityType, reservation.branchId)}
                    </h3>
                    <span className="text-gray-600">
                      {format(new Date(reservation.date), 'yyyy/MM/dd')}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    ساعت: {getTimeSlot(reservation.timeSlotId)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};