import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const facilityTypeNames = {
  pool: 'استخرها',
  gym: 'باشگاه‌های بدنسازی',
  salon: 'سالن‌های ورزشی'
};

export const FacilityList: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const { branches } = useData();

  if (!type || !branches[type as keyof typeof branches]) {
    return <div>مجموعه مورد نظر یافت نشد</div>;
  }

  const facilities = branches[type as keyof typeof branches];
  const typeName = facilityTypeNames[type as keyof typeof facilityTypeNames];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{typeName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <Link
            key={facility.id}
            to={`/${type}/${facility.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105"
          >
            <img
              src={facility.image}
              alt={facility.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
              <p className="text-gray-600 mb-2">{facility.location}</p>
              <p className="text-gray-600 mb-4">{facility.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {facility.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <p className="text-blue-600 font-bold">
                {facility.price.toLocaleString()} تومان
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};