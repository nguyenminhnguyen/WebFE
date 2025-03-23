import React, { useState } from "react";

export default function Login_Modal() {
  const [modal, SetModal] = useState(false);
  const toggleModal = () => {
    SetModal(!modal);
  };
  const a = () => {
    alert("dang nhap thanh cong");
  };
  return (
    <>
      <button
        onClick={toggleModal}
        className="text-black py-2 hover:text-green-700"
      >
        Đăng nhập
      </button>

      {modal && (
        <div className="modal">
          <div className="modal fixed inset-0 flex justify-center items-center z-50">
            {/* Overlay mờ */}
            <div className="overlay absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>

            {/* Nội dung của modal */}
            <div className="modal-content bg-white p-8 rounded-lg shadow-lg relative z-10">
              <h2 className="text-center text-xl mb-4">Đăng nhập</h2>

              {/* Form đăng nhập hoặc nội dung khác */}
              <form>
                <div className="mb-4">
                  <label htmlFor="username" className="inline">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="border px-4 py-2 w-full"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="border px-4 py-2 w-full"
                    required
                  />
                </div>

                <button
                  onClick={a}
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-600 w-full"
                >
                  Đăng nhập
                </button>
              </form>

              {/* Nút đóng modal */}
              <button
                className="close-btn absolute top-2 right-2 text-black text-2xl"
                onClick={toggleModal}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
