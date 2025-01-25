import React from 'react';
import { Facility } from '../types';

interface Props {
  facility: Facility;
  onSelect: (facility: Facility) => void;
}

export const FacilityCard: React.FC<Props> = ({ facility, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={facility.image}
        alt={facility.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
        <p className="text-gray-600 mb-4">ظرفیت: {facility.capacity} نفر</p>
        <p className="text-blue-600 font-bold mb-4">
          {facility.price.toLocaleString()} تومان
        </p>
        <button
          onClick={() => onSelect(facility)}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          رزرو
        </button>
      </div>
    </div>
  );
};