import { useState } from "react";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [currentFeature, setCurrentFeature] = useState(0);

  // Xử lý nút chuyển slide
  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) =>
      prev - 1 < 0 ? features.length - 1 : prev - 1
    );
  };

  return (
    
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <h1 className="text-2xl font-bold">Freelancer AI</h1>
        <ul className="flex gap-4">
          <li><a href="#" className="hover:underline">Trang chủ</a></li>
          <li><a href="#" className="hover:underline">Dự án</a></li>
          <li><a href="#" className="hover:underline">Freelancer</a></li>
          <li><a href="#" className="hover:underline">Đăng nhập</a></li>
          <li><button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">Đăng ký</button></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="bg-blue-500 text-white text-center py-20">
        <h1 className="text-4xl font-bold">Kết Nối Freelancer Với Dự Án Dùng AI</h1>
        <p className="mt-2">Tìm kiếm công việc hoặc freelancer phù hợp ngay hôm nay!</p>
        <input
          type="text"
          placeholder="Tìm kiếm công việc, freelancer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 p-2 mt-4 border rounded text-black"
        />
      </section>

      {/* Features Section */}
      <section className="relative w-full max-w-4xl mx-auto py-12">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">Tính năng nổi bật</h2>
        
        <div className="relative flex justify-center items-center w-full h-64 overflow-hidden">
          {features.map((feature, i) => {
            let position =
              i === currentFeature
                ? "translate-x-[-100%] opacity-75 scale-90"
                : i === (currentFeature + 1) % features.length
                ? "translate-x-0 opacity-100 scale-100"
                : i === (currentFeature + 2) % features.length
                ? "translate-x-[100%] opacity-75 scale-90"
                : "hidden";
            return (
              <div
                key={feature.id}
                className={`absolute w-1/3 transition-all duration-500 transform ${position}`}
              >
                <img src={feature.image} alt={feature.title} className="w-full h-48 object-cover rounded-lg shadow-lg" />
                <p className="text-center mt-2 text-black">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Nút điều hướng */}
        <button
          onClick={prevFeature}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          ◀
        </button>
        <button
          onClick={nextFeature}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          ▶
        </button>
      </section>

      {/* Danh sách dự án nổi bật */}
      <section className="text-center py-12 bg-gray-200">
        <h2 className="text-2xl font-semibold text-black">Dự án nổi bật</h2>
        <ul className="mt-6 space-y-4">
          {projects.map((project, index) => (
            <li key={index} className="bg-white p-4 shadow rounded-xl text-black">{project}</li>
          ))}
        </ul>
      </section>

      {/* Danh sách freelancer nổi bật */}
      <section className="text-center py-12">
        <h2 className="text-2xl font-semibold text-black">Freelancer nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-6">
          {freelancers.map((freelancer, index) => (
            <div key={index} className="p-4 bg-white shadow-lg rounded-2xl">
              <h3 className="text-xl font-bold text-black">{freelancer.name}</h3>
              <p className="text-gray-600">{freelancer.skill}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Đánh giá từ người dùng */}
      <section className="text-center py-12 bg-gray-200">
        <h2 className="text-2xl font-semibold text-black">Đánh giá từ người dùng</h2>
        <div className="mt-6 space-y-4">
          {reviews.map((review, index) => (
            <blockquote key={index} className="bg-white p-4 shadow rounded-xl text-black">{review}</blockquote>
          ))}
        </div>
      </section>

      {/* Câu hỏi thường gặp */}
      <section className="text-center py-12">
        <h2 className="text-2xl font-semibold text-black">Câu hỏi thường gặp</h2>
        <ul className="mt-6 space-y-4">
          {faq.map((item, index) => (
            <li key={index} className="bg-white p-4 shadow rounded-xl text-black">
              <h3 className="font-bold text-black">{item.question}</h3>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center py-10 bg-blue-500 text-white">
        <h2 className="text-2xl font-bold">Bắt đầu ngay hôm nay</h2>
        <p className="mt-2">Tham gia nền tảng và kết nối với hàng ngàn cơ hội</p>
        <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">Đăng ký ngay</button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        <p>&copy; 2025 Freelancer AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

const features = [
  { id: 0, title: "🔍 AI Matching", description: "Tìm kiếm freelancer phù hợp bằng AI.", image: "/AIMatching.jpg" },
  { id: 1, title: "💰 Thanh toán an toàn", description: "Hệ thống escrow bảo vệ cả đôi bên.", image: "/SecurePayment.jpg" },
  { id: 2, title: "💬 Chatbox AI", description: "Trợ lý AI hỗ trợ giao tiếp thông minh.", image: "/ChatBotAI.jpg" },
  { id: 3, title: "📊 Quản lý dự án", description: "Công cụ giúp theo dõi tiến độ công việc.", image: "/ManagementTool.jpg" }
];

const projects = [
  "Thiết kế website bán hàng",
  "Ứng dụng AI nhận diện khuôn mặt",
  "Phát triển ứng dụng mobile đặt đồ ăn"
];

const freelancers = [
  { name: "Nguyễn Văn A", skill: "Lập trình viên Frontend" },
  { name: "Trần Thị B", skill: "Thiết kế UI/UX" },
  { name: "Lê Văn C", skill: "Chuyên gia AI" }
];

const reviews = [
  "⭐️⭐️⭐️⭐️⭐️ Tuyệt vời! Freelancer làm việc rất chuyên nghiệp.",
  "⭐️⭐️⭐️⭐️ Rất hài lòng với dịch vụ trên nền tảng.",
  "⭐️⭐️⭐️⭐️⭐️ Chất lượng freelancer rất tốt!"
];

const faq = [
  { question: "Làm thế nào để đăng ký tài khoản?", answer: "Bạn có thể đăng ký bằng email hoặc tài khoản Google." },
  { question: "Thanh toán được thực hiện như thế nào?", answer: "Hệ thống hỗ trợ nhiều phương thức như PayPal, Stripe, Crypto." }
];