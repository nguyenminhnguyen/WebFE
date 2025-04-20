// JobStep4.js
import React, { useState } from "react";
import Select from "react-select";
import { regionOptions } from "../../../../data/RegionOption";
import { countryOptions } from "../../../../data/CountryOption";

const JobStep4 = ({ selectedOption, handleSelectChange }) => {
  return (
    <>
      <div className="w-2/5">
        <h2 className="block text-3xl font-medium">
          Chọn khu vực mà bạn ưu tiên
        </h2>
        <p className="mt-4 text-gray-700">
          Chọn khu vực hoặc quốc gia ưu tiên giúp bạn kết nối với các
          freelancer phù hợp, đảm bảo sự đồng bộ về múi giờ và văn hóa làm
          việc.
        </p>
      </div>
      <div className="mb-4 ml-5 w-3/5 ml-6">
        <h3 className="font-medium">
          Ưu tiên khu vực hoặc quốc gia{" "}
          <span className="font-normal text-gray-500">(không bắt buộc)</span>
        </h3>
        {/* Khung chọn khu vực hoặc quốc gia */}
        <div className="mt-4">
          <Select
            options={[
              { label: "Khu vực", options: regionOptions },
              { label: "Quốc gia", options: countryOptions },
            ]}
            value={selectedOption}
            onChange={handleSelectChange}
            getOptionLabel={(e) => <div>{e.label}</div>}
            placeholder="Chọn khu vực hoặc quốc gia"
            isSearchable={false} // Bỏ tìm kiếm
            styles={{
              control: (base, state) => ({
                ...base,
                borderRadius: "20px", // Thêm viền bo tròn cho Select
                borderColor: state.isFocused ? "#000000" : "#000000",
                padding: "0.5rem", // Padding của khung Select
              }),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default JobStep4;
