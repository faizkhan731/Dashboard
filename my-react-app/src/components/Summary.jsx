import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state;

  if (!userData) {
    navigate("/");
    return null;
  }
  const isDark = userData.theme === "Dark";
  const themeClasses = isDark
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";
  const cardClasses = isDark
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-800";

  const layout = userData.layout;

  const items = [
    { title: "Team Members", count: 22 },
    { title: "Active Projects", count: 3 },
    { title: "Notifications", count: 103 },
  ];

  const chartData = [
    { name: "Mon", progress: 30 },
    { name: "Tue", progress: 45 },
    { name: "Wed", progress: 50 },
    { name: "Thu", progress: 65 },
    { name: "Fri", progress: 20 },
    { name: "Sat", progress: 90 },
    { name: "Sun", progress: 10 },
  ];

  return (
    <div className={`min-h-screen p-6 ${themeClasses}`}>
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-blue-500">
          Welcome, {userData.name}
        </h1>
        <p className="text-sm opacity-80">
          Theme: <strong>{userData.theme}</strong> | Layout:{" "}
          <strong>{userData.layout}</strong>
        </p>

        {layout === "Grid" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.title}
                className={`p-6 rounded-2xl shadow text-center ${cardClasses}`}
              >
                <h2 className="text-2xl font-bold">{item.count}</h2>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.title}
                className={`p-6 rounded-2xl shadow flex justify-between items-center ${cardClasses}`}
              >
                <p className="font-medium">{item.title}</p>
                <span className="text-xl font-bold">{item.count}</span>
              </div>
            ))}
          </div>
        )}

        <div className={`p-6 rounded-2xl shadow ${cardClasses}`}>
          <h2 className="mb-4 text-xl font-semibold">Weekly Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="progress" stroke="#3b82f6" />
              <CartesianGrid stroke={isDark ? "#444" : "#ccc"} />
              <XAxis dataKey="name" stroke={isDark ? "#fff" : "#000"} />
              <YAxis stroke={isDark ? "#fff" : "#000"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#2d2d2d" : "#fff",
                  borderColor: "#888",
                }}
                labelStyle={{ color: isDark ? "#fff" : "#000" }}
                itemStyle={{ color: isDark ? "#fff" : "#000" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
