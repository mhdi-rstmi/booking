import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useData } from "../context/DataContext";
import { ChevronLeft } from "lucide-react";
import hero from "../assets/hero.png";

const FacilitySection: React.FC<{
  title: string;
  type: "pool" | "gym" | "salon";
  facilities: any[];
}> = ({ title, type, facilities }) => {
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          to={`/${type}`}
          className="flex items-center text-blue-600 hover:text-blue-700">
          مشاهده همه
          <ChevronLeft className="w-5 h-5" />
        </Link>
      </div>
      <Slider {...sliderSettings}>
        {facilities.map((facility) => (
          <div key={facility.id} className="px-2">
            <Link
              to={`/${type}/${facility.id}`}
              className="block bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105">
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full h-48 object-cover" // تصویر به‌صورت ریسپانسیو
              />
              <div className="p-4 text-right">
                <h3 className="text-xl font-bold mb-2 text-sm sm:text-base lg:text-xl">
                  {" "}
                  {/* سایز متن برای ریسپانسیو */}
                  {facility.name}
                </h3>
                <p className="text-gray-600 mb-2 text-xs sm:text-sm lg:text-base">
                  {" "}
                  {/* سایز متن برای ریسپانسیو */}
                  {facility.location}
                </p>
                <p className="text-blue-600 font-bold text-sm sm:text-base lg:text-lg">
                  {facility.price.toLocaleString()} تومان
                </p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export const Home: React.FC = () => {
  const { branches } = useData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-right sm:text-left">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4">
            ورزش یاب
          </h1>
          <p className="text-gray-600 text-lg sm:text-2xl mt-4 sm:mt-8">
            بهترین امکانات ورزشی در خدمت شما
          </p>
        </div>
        <div className="flex justify-center sm:justify-end mt-6 sm:mt-0">
          <img
            src={hero}
            alt="hero"
            className="w-10/12 sm:w-9/12 lg:w-9/12 h-auto object-contain rounded-lg"
          />
        </div>
      </div>

      <FacilitySection
        title="استخرهای برتر"
        type="pool"
        facilities={branches.pool}
      />

      <FacilitySection
        title="باشگاه‌های برتر"
        type="gym"
        facilities={branches.gym}
      />

      <FacilitySection
        title="سالن‌های ورزشی برتر"
        type="salon"
        facilities={branches.salon}
      />
    </div>
  );
};
