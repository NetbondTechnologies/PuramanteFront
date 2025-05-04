import { useState } from "react";
import Dashboard from "../dashboard";

const initialProducts = [
  {
    id: 1,
    name: "Gold Necklace",
    price: "$99.99",
    stock: 10,
    image:
      "https://lh7-us.googleusercontent.com/18-UMH2EypsHUXNm5Z5yFe_BiBu76yKgaQNGpOO_w_9atZc6R1uwdG0imc51ueQTUwUCOJyG8Lqlbu--PeoUQGppYX16isumCocOR254QFo93e93K0B0NDykCH0ZBgqi38-ghvmaODzp2FKnF1P1rY4",
  },
  {
    id: 2,
    name: "Silver Ring",
    price: "$129.99",
    stock: 5,
    image:
      "https://assets.ajio.com/medias/sys_master/root/20230818/h5W3/64de9e8aafa4cf41f5599946/-473Wx593H-466470410-silver-MODEL.jpg",
  },
  {
    id: 3,
    name: "Pearl Earrings",
    price: "$79.99",
    stock: 8,
    image:
      "https://www.purepearls.in/wp-content/uploads/2023/05/image00014-1024x1024.jpeg",
  },
];

export default function AdminProductList() {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({ ...prev, [name]: value }));
  };

  const saveEditProduct = () => {
    setProducts(
      products.map((product) =>
        product.id === editingProduct.id
          ? { ...editingProduct, stock: parseInt(editingProduct.stock, 10) }
          : product
      )
    );
    setEditingProduct(null);
  };

  return (
    <div>
      <Dashboard />
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg overflow-x-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Admin Product List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left border border-gray-300">Image</th>
                <th className="p-3 text-left border border-gray-300">
                  Product Name
                </th>
                <th className="p-3 text-left border border-gray-300">Price</th>
                <th className="p-3 text-left border border-gray-300">Stock</th>
                <th className="p-3 text-left border border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-100 transition-all"
                >
                  <td className="p-3 border border-gray-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 font-medium text-gray-700">
                    {product.name}
                  </td>
                  <td className="p-3 border border-gray-300 text-gray-600">
                    {product.price}
                  </td>
                  <td className="p-3 border border-gray-300 text-gray-700">
                    {product.stock}
                  </td>
                  <td className="p-3 border border-gray-300 flex flex-wrap gap-2">
                    <button
                      onClick={() => openEditForm(product)}
                      className="bg-background-sky hover:bg-button-hover text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editingProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-background-sky bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <input
                className="border p-2 w-full mb-2"
                name="name"
                value={editingProduct.name}
                onChange={handleEditChange}
                placeholder="Product Name"
              />
              <input
                className="border p-2 w-full mb-2"
                name="price"
                value={editingProduct.price}
                onChange={handleEditChange}
                placeholder="Price"
              />
              <input
                className="border p-2 w-full mb-2"
                name="stock"
                value={editingProduct.stock}
                onChange={handleEditChange}
                placeholder="Stock"
                type="number"
              />
              <input
                className="border p-2 w-full mb-2"
                name="image"
                value={editingProduct.image}
                onChange={handleEditChange}
                placeholder="Image URL"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={saveEditProduct}
                  className="bg-background-sky hover:bg-button-hover text-white py-1 px-3 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="bg-red-400 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
