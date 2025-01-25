import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { format, addDays } from "date-fns-jalali";
import { Branch } from "../types";
import Slider from "react-slick";

export const FacilityPage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const {
    branches,
    timeSlots,
    getAvailableCapacity,
    addReservation,
    hasConflictingReservation,
  } = useData();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const facilityBranches = type ? branches[type as keyof typeof branches] : [];
  const selectedBranch = facilityBranches.find(
    (b) => b.id === parseInt(id || "0")
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const isPoolRestricted = (date: Date) => {
    if (type !== "pool" || !user) return false;
    const dayOfMonth = date.getDate();
    return (
      (dayOfMonth % 2 === 0 && user.gender === "female") ||
      (dayOfMonth % 2 === 1 && user.gender === "male")
    );
  };

  const handleReservation = (timeSlotId: number) => {
    if (!user || !selectedBranch || !type) return;

    const date = format(selectedDate, "yyyy-MM-dd");
    addReservation({
      userId: user.id,
      facilityType: type as "pool" | "gym" | "salon",
      branchId: selectedBranch.id,
      date,
      timeSlotId,
    });
  };

  const nextDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  if (!type || !selectedBranch) return <div>مجموعه مورد نظر یافت نشد</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <Slider {...sliderSettings}>
            {selectedBranch.images.map((image, index) => (
              <div key={index} className="mt-14">
                <img
                  src={image}
                  alt={`${selectedBranch.name} - تصویر ${index + 1}`}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{selectedBranch.name}</h1>
          <p className="text-gray-600 mb-6">{selectedBranch.description}</p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-bold mb-4">امکانات</h2>
              <ul className="list-disc list-inside space-y-2">
                {selectedBranch.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">قوانین</h2>
              <ul className="list-disc list-inside space-y-2">
                {selectedBranch.rules.map((rule, index) => (
                  <li key={index} className="text-gray-600">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">رزرو سانس</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {nextDays.map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-lg flex flex-col items-center min-w-[100px] ${
                    format(date, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd")
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}>
                  <span className="text-sm">{format(date, "EEEE")}</span>
                  <span className="font-bold">{format(date, "d MMMM")}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">سانس‌های موجود</h2>
            <div className="grid gap-4">
              {timeSlots.map((slot) => {
                const available = getAvailableCapacity(
                  type,
                  selectedBranch.id,
                  format(selectedDate, "yyyy-MM-dd"),
                  slot.id
                );
                const hasConflict =
                  user &&
                  hasConflictingReservation(
                    user.id,
                    format(selectedDate, "yyyy-MM-dd"),
                    slot.id
                  );
                const isRestricted = isPoolRestricted(selectedDate);

                return (
                  <div
                    key={slot.id}
                    className={`p-4 rounded-lg border ${
                      available === 0 || hasConflict || isRestricted
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold">
                          {slot.start} - {slot.end}
                        </span>
                        <span className="text-gray-600 mr-4">
                          ظرفیت باقیمانده: {available} نفر
                        </span>
                      </div>
                      <button
                        onClick={() => handleReservation(slot.id)}
                        disabled={
                          !user ||
                          available === 0 ||
                          hasConflict ||
                          isRestricted
                        }
                        className={`px-4 py-2 rounded ${
                          !user ||
                          available === 0 ||
                          hasConflict ||
                          isRestricted
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}>
                        {!user
                          ? "لطفا وارد شوید"
                          : hasConflict
                          ? "قبلاً رزرو کرده‌اید"
                          : isRestricted
                          ? "غیرمجاز برای جنسیت شما"
                          : "رزرو"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
