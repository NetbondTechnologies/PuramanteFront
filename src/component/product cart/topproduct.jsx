import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import BaseURL from "../../baseurl";
import { Link } from "react-router-dom";
import { useCart } from "../newcomponent/cartcontext";

export default function TopProduct() {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [clickedProductId, setClickedProductId] = useState(null); // Track clicked product ID
  
  const { addToCart } = useCart();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-out-cubic" });
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    fetchProducts();
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BaseURL}/api/products`); // Replace with actual API URL
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const updateItemsPerPage = () => {
    if (window.innerWidth < 640) setItemsPerPage(2);
    else if (window.innerWidth < 1024) setItemsPerPage(3);
    else setItemsPerPage(4);
  };

  const scrollLeft = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    setStartIndex((prev) => Math.min(prev + 1, products.length - itemsPerPage));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setClickedProductId(product._id); // Set clicked product ID to change its button text

    setTimeout(() => {
      setClickedProductId(null); // Reset clicked product ID after 4 seconds
    }, 4000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-cyan-50 via-white to-cyan-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <div data-aos="zoom-in" className="text-center p-7 mb-12 relative">
          <h2 className="text-3xl p-4 sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 bg-clip-text text-transparent relative z-10">
            Best Selling Selections
          </h2>
          <div className="w-32 h-1 bg-cyan-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="relative flex items-center">
          <button
            onClick={scrollLeft}
            disabled={startIndex === 0}
            className={`absolute left-2 md:left-0 top-1/2 transform -translate-y-1/2 bg-cyan-600 text-white p-3 rounded-full shadow-lg z-10 transition ${
              startIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-cyan-700"
            }`}
          >
            ◀
          </button>

          <div className="flex space-x-4 md:space-x-6 overflow-hidden w-full justify-center p-4">
            {products
              .slice(startIndex, startIndex + itemsPerPage)
              .map((product, index) => (
                <div
                  key={product._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                  className="w-1/2 sm:w-64 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-cyan-100"
                >
                  <Link to={`/singleproduct/${product._id}`}>
                    <div className="relative flex justify-between items-center h-40 sm:h-56 overflow-hidden">
                      <img
                        src={product.image ? product.image : product.imageurl}
                        alt={product.title}
                        className="w-full h-full object-contain transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link to={`/singleproduct/${product._id}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs sm:text-sm text-cyan-600 font-medium bg-cyan-50 px-2 py-1 rounded-full capitalize">
                          {product.name}
                        </span>
                        <span className="text-xs text-cyan-500 font-mono bg-cyan-50 px-2 py-1 rounded-full">
                          {product.code}
                        </span>
                      </div>
                    </Link>
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2">
                      {product.title}
                    </h3>
                    <Link to={`/singleproduct/${product._id}`}>
                      <p className="text-xs line-clamp-2 sm:text-sm text-gray-600 mb-2">
                        {product.description}
                      </p>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-4 w-full bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
                    >
                      {clickedProductId === product._id ? "Product Added✅" : "Add To List"}
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <button
            onClick={scrollRight}
            disabled={startIndex >= products.length - itemsPerPage}
            className={`absolute right-2 md:right-0 top-1/2 transform -translate-y-1/2 bg-cyan-600 text-white p-3 rounded-full shadow-lg z-10 transition ${
              startIndex >= products.length - itemsPerPage
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-cyan-700"
            }`}
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
