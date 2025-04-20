import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [freelancerId, setFreelancerId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    const storedFreelancerId = localStorage.getItem("freelancerId");

    if (storedUser && storedFreelancerId) {
      setUser(JSON.parse(storedUser));
      setFreelancerId(storedFreelancerId);
    }

    setLoading(false);
  }, []);

  const login = (userData, id) => {
    setUser(userData);
    setFreelancerId(id);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("freelancerId", id);
  };

  const logout = () => {
    setUser(null);
    setFreelancerId(null);
    localStorage.removeItem("user");
    localStorage.removeItem("freelancerId");
  };

  return (
    <AuthContext.Provider
      value={{ user, freelancerId, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
