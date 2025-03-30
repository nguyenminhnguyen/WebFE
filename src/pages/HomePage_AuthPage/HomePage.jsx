import React from "react";
import SearchUI from "../../components/content-box/SearchUI";
import FeatureSection from "../../components/content-box/FeatureSection";
import ContentBox from "../../components/content-box/contentbox";
import Footer from "../../components/content-box/footer";

function HomePage() {
  const categories = [
    { title: "Designer", subtitle: "(0 freelancer)" },
    { title: "Tiếp thị số", subtitle: "(0 freelancer)" },
    { title: "Content Writer", subtitle: "(5 freelancers)" },
    { title: "Dịch thuật", subtitle: "(2 freelancers)" },
    { title: "Tư vấn kinh doanh", subtitle: "(3 freelancers)" },
    { title: "Phát triển ứng dụng", subtitle: "(1 freelancer)" },
    { title: "Nhiếp ảnh", subtitle: "(4 freelancers)" },
    { title: "Biên tập video", subtitle: "(0 freelancers)" },
  ];

  const getBadge = (subtitle) => {
    const match = subtitle.match(/\d+/);
    const count = match ? parseInt(match[0]) : 0;
    if (count >= 5) return "🔥 Hot";
    if (count >= 3) return "⭐ Pro";
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="mt-6">
        <SearchUI />
      </section>

      <section className="mt-12">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
          Tìm kiếm công việc theo danh mục
        </h2>
        <p className="text-gray-600 text-base sm:text-lg font-medium">
          Bạn đang tìm kiếm công việc?{" "}
          <span className="text-green-600 font-bold hover:text-green-500 hover:underline cursor-pointer">
            Nhấn vào đây
          </span>
          {/* login ? du_an : login_modal */}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
          {categories.map((item, index) => (
            <ContentBox
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              badge={getBadge(item.subtitle)}
            />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
          Các tính năng nổi bật sử dụng AI
        </h2>
        <FeatureSection />
        <Footer />
      </section>
    </div>
  );
}

export default HomePage;
