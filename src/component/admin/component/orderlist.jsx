import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../dashboard";
import BaseURL from "../../../baseurl";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BaseURL}/api/orders`);
        setOrders(response.data.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      order._id?.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.firstName?.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.email?.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.companyName?.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.country?.toLowerCase().includes(lowerCaseSearchTerm) ||
      (Array.isArray(order.orderDetails) && order.orderDetails.some((item) =>
        item.name?.toLowerCase().includes(lowerCaseSearchTerm)))
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Dashboard />
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
            Recent Orders
          </h2>

          <input
            type="text"
            placeholder="Search orders..."
            className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading ? (
            <p className="text-gray-500 text-center py-4">Loading orders...</p>
          ) : error ? (
            <p className="text-red-500 text-center py-4">{error}</p>
          ) : (
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse min-w-[40rem]">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    {["Order ID", "Customer", "Email", "Company", "Country", "Order Details", "Created At", "Download Excel"].map((header) => (
                      <th key={header} className="p-3 text-left border-b border-gray-300">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                      <tr key={order._id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-all`}>
                        <td className="p-3 border-b border-gray-200 font-medium text-gray-700">{order.orderId}</td>
                        <td className="p-3 border-b border-gray-200 text-gray-600">{order.firstName}</td>
                        <td className="p-3 border-b border-gray-200 text-gray-700">{order.email}</td>
                        <td className="p-3 border-b border-gray-200 text-gray-700">{order.companyName || "-"}</td>
                        <td className="p-3 border-b border-gray-200 text-gray-700">{order.country}</td>
                        <td className="p-3 border-b border-gray-200 text-gray-700">
                          {Array.isArray(order.orderDetails) ? (
                            order.orderDetails.map((item, i) => (
                              <div key={i} className="text-sm">
                                {item.name} (x{item.quantity})
                              </div>
                            ))
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="p-3 border-b border-gray-200 text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="p-3 border-b border-gray-200 text-gray-700">
                          {order.excelFilePath ? (
                            <a
                            href={`${BaseURL}/api/orders${order.excelFilePath.replace("/uploads", "/download")}`}
                              download
                              className="text-blue-600 hover:underline"
                            >
                              Download
                            </a>
                          ) : (
                            "No File"
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="p-4 text-gray-500 text-center">No orders found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
