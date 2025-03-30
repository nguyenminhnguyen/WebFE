import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt, FaPhone } from "react-icons/fa";
export default function BirthAndPhoneSelect({ selectedDate, setSelectedDate, phone, setPhone }) {
  const [error, setError] = useState("");
  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());
  
  useEffect(() => {
    const updateDates = () => {
      const today = new Date();
      setMinDate(
        new Date(today.getFullYear() - 99, today.getMonth(), today.getDate())
      );
      setMaxDate(
        new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
      );
    };

    updateDates();
    const interval = setInterval(updateDates, 24 * 60 * 60 * 1000); // Cập nhật mỗi ngày

    return () => clearInterval(interval);
  }, []);
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Kiểm tra nếu nhập toàn số và có độ dài từ 10 đến 12 số
    if (/^\d{0,12}$/.test(value)) {
      setPhone(value); // Cập nhật giá trị
    }
    if (value.length > 0 && (value.length < 10 || value.length > 12)) {
      setError("Số điện thoại phải có từ 10 đến 12 số");
    } else {
      setError("");
    }
  };
  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    if (date < minDate || date > maxDate) {
      setError("Ngày sinh phải trong khoảng từ 18 đến 99 tuổi.");
      setSelectedDate(null);
    } else {
      setError("");
      setSelectedDate(e.target.value);
    }
  };

  return (
    <div className="flex w-full gap-4">
      <div className="relative w-1/2">
        <FaRegCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="date"
          name="birthday"
          value={selectedDate || ""}
          onChange={handleDateChange}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
          required
        />
      </div>
      <div className="relative w-1/2">
        <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="tel"
          name="phone"
          value={phone}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
          placeholder="Số điện thoại"
          required
          onChange={handlePhoneChange}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
