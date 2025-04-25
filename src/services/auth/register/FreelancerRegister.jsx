import React, { useState } from 'react';
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaBriefcase,
  FaCamera,
  FaIdCard,
  FaTimes,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import BirthAndPhoneSelect from '../../../components/register/BirthdayAndPhoneNumberSelect';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../../components/layout/AuthLayout';
import Select from 'react-select';
import { countryOptions } from '../../../data/CountryOption';
import { connectSocket } from "../../../services/socket";

export default function FreelancerRegister({ onBack }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fname: '',
    birthday: '',
    phone: '',
    experience: '',
    email: '',
    avatar: null,
    location: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarError, setAvatarError] = useState('');

  const navigate = useNavigate();
  const handleBack = () => {
    if(step===2){
      setStep(1);
      return;
    }
    if (onBack) {
      onBack();
    } else {
      navigate('/register');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (selectedOption) => {
    setFormData({ ...formData, location: selectedOption });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarError('');

    if (file) {
      console.log('File information:', {
        name: file.name,
        type: file.type,
        size: file.size
      });

      // Kiểm tra kích thước file (giới hạn 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setAvatarError('Kích thước ảnh không được vượt quá 5MB');
        return;
      }

      // Kiểm tra định dạng file
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type.toLowerCase())) {
        console.log('Invalid file type:', file.type);
        setAvatarError('Chỉ chấp nhận file ảnh định dạng JPG, JPEG hoặc PNG');
        return;
      }

      // Tạo URL preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      setFormData({ ...formData, avatar: file });
    } else {
      setAvatarPreview(null);
      setFormData({ ...formData, avatar: null });
    }
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    setFormData({ ...formData, avatar: null });
    setAvatarError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    // Log toàn bộ formData để kiểm tra
    console.log('Current formData:', formData);

    // Kiểm tra các trường bắt buộc
    if (!formData.username || !formData.password || !formData.email) {
      console.log('Missing required fields:', {
        username: formData.username,
        password: formData.password,
        email: formData.email
      });
      alert('Vui lòng điền đầy đủ thông tin Username, Password và Email');
      setStep(1);
      return;
    }

    try {
      // Tạo FormData object để gửi file
      const formDataToSend = new FormData();
      
      // Thêm các trường thông tin vào FormData
      Object.keys(formData).forEach(key => {
        if (key === 'avatar' && formData[key]) {
          formDataToSend.append('avatar', formData[key]);
        } else if (key === 'location' && formData[key]) {
          formDataToSend.append('location', formData[key].label);
        } else if (formData[key]) {
          formDataToSend.append(key, formData[key].toString());
        }
      });

      // Log ra để kiểm tra dữ liệu trước khi gửi
      console.log('FormData contents:');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await fetch(
        'http://localhost:3000/api/freelancer/register',
        {
          method: 'POST',
          body: formDataToSend,
        }
      );

      const data = await response.json();
      console.log('Server response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại!');
      }

      alert('Đăng ký thành công!');
      connectSocket();
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      if (error.message.includes('Username, password and email are required')) {
        setStep(1);
        alert('Vui lòng điền đầy đủ thông tin Username, Password và Email');
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {step === 1 ? 'Đăng ký Freelancer' : 'Hoàn tất hồ sơ'}
        </h1>
        <p
          onClick={handleBack}
          className="text-sm text-gray-400 mt-4 mb-2 hover:underline cursor-pointer"
        >
          {step===1 ? '← Quay lại chọn vai trò' : '← Trở về'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              {/* Họ và Tên */}
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="fname"
                  type="text"
                  value={formData.fname}
                  placeholder="Họ và tên"
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                  required
                />
              </div>
              {/*Username*/}
              <div className="relative">
                <FaIdCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  placeholder="Username"
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                  required
                />
              </div>

              {/* Ngày sinh & Số điện thoại */}
              <BirthAndPhoneSelect
                selectedDate={formData.birthday}
                setSelectedDate={(date) =>
                  setFormData({ ...formData, birthday: date })
                }
                phone={formData.phone}
                setPhone={(phone) => setFormData({ ...formData, phone })}
              />

              {/* Password */}
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Mật khẩu"
                  onChange={handleChange}
                  onBlur={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                  required
                />
              </div>
            </>
          ) : (
            <>
              {/* Kinh nghiệm */}
              <div className="relative">
                <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <textarea
                  name="experience"
                  placeholder="Mô tả kinh nghiệm làm việc của bạn"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm h-24"
                  required
                />
              </div>

              {/* Chọn địa điểm */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Địa điểm làm việc
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                  <Select
                    options={countryOptions}
                    value={formData.location}
                    onChange={handleLocationChange}
                    getOptionLabel={(e) => <div>{e.label}</div>}
                    placeholder="Chọn quốc gia làm việc"
                    isSearchable={false}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderRadius: "20px",
                        borderColor: state.isFocused ? "#000000" : "#000000",
                        padding: "0.5rem",
                        paddingLeft: "2.5rem",
                      }),
                    }}
                  />
                </div>
              </div>

              {/* Ảnh đại diện */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Ảnh đại diện
                </label>
                <div className="relative">
                  <FaCamera className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="file"
                    name="avatar"
                    onChange={handleFileChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </div>
                
                {avatarError && (
                  <p className="text-red-500 text-sm mt-1">{avatarError}</p>
                )}

                {avatarPreview && (
                  <div className="relative inline-block mt-2">
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
                    />
                    <button
                      type="button"
                      onClick={removeAvatar}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Nút Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold shadow-md"
          >
            {step === 1 ? 'Tiếp tục' : 'Tạo tài khoản'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
