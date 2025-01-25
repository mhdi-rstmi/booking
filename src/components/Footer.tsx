import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* بخش درباره ما */}
        <div>
          <h3 className="text-xl font-bold mb-4">درباره ما</h3>
          <p className="text-gray-400 leading-relaxed">
            ورزش‌یاب، پلتفرمی برای رزرو آنلاین استخرها، سالن‌های ورزشی و
            باشگاه‌های بدنسازی است. با ما، بهترین تجربه ورزشی را داشته باشید.
          </p>
        </div>

        {/* بخش لینک‌های مفید */}
        <div>
          <h3 className="text-xl font-bold mb-4">لینک‌های مفید</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/" className="hover:text-white">
                خانه
              </a>
            </li>
            <li>
              <a href="/gym" className="hover:text-white">
                باشگاه‌های بدنسازی
              </a>
            </li>
            <li>
              <a href="/pool" className="hover:text-white">
                استخرها
              </a>
            </li>
            <li>
              <a href="/salon" className="hover:text-white">
                سالن‌های ورزشی
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                تماس با ما
              </a>
            </li>
          </ul>
        </div>

        {/* بخش تماس با ما */}
        <div>
          <h3 className="text-xl font-bold mb-4">تماس با ما</h3>
          <ul className="space-y-2 text-gray-400">
            <li>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</li>
            <li>ایمیل: info@varzeshyab.com</li>
            <li>آدرس: سبزوار، خیابان ولیعصر، خیابان ستاره</li>
          </ul>
          {/* آیکون شبکه‌های اجتماعی */}
          <div className="flex space-x-4 mt-4 ">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white">
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white">
              <Facebook className="w-6 h-6 mr-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
        <p className="text-lg">
          <span className="text-red-800 text-2xl"> ❤ </span>
          CREATE WITH
        </p>
      </div>
    </footer>
  );
};

export default Footer;
