import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const sections = [
    { id: 1, title: "Partners", route: "/partners" },
    { id: 2, title: "Reviews", route: "/reviews" },
    { id: 3, title: "Orders", route: "/orders" },
    { id: 4, title: "Analytics", route: "/analytics" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div
            key={section.id}
            onClick={() => navigate(section.route)}
            className="cursor-pointer bg-gray-100 shadow-md rounded-lg  p-6 text-center transition hover:bg-gray-200"
          >
            <h3 className="text-xl pb-20 py-3 rounded-lg text-gray-800 bg-[#3ebda1] font-semibold">
              {section.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
