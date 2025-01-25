import React from "react";

export const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">ورزش یاب</h1>
        <div className="space-y-6 text-gray-600">
          <p>
            مجموعه ورزش یاب با هدف ارائه خدمات ورزشی با کیفیت و حرفه‌ای به
            شهروندان عزیز تأسیس شده است. این مجموعه با بهره‌گیری از مدرن‌ترین
            تجهیزات و کادری مجرب، محیطی امن و سالم را برای ورزش و تفریح فراهم
            کرده است.
          </p>
          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              امکانات مجموعه:
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>استخر مجهز با سیستم تصفیه پیشرفته</li>
              <li>سالن بدنسازی با دستگاه‌های مدرن</li>
              <li>سالن‌های ورزشی چندمنظوره</li>
              <li>رختکن و سرویس‌های بهداشتی مجزا</li>
              <li>پارکینگ اختصاصی</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              ساعات کاری:
            </h2>
            <p>همه روزه از ساعت ۸ صبح تا ۲۰ شب</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              تماس با ما:
            </h2>
            <p>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
            <p>آدرس: سبزوار، خیابان ولیعصر، خیابان ستاره</p>
          </div>
        </div>
      </div>
    </div>
  );
};
