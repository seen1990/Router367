import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';

function Products() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.products);

    // เพิ่ม state สำหรับจัดการฟอร์ม
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: ''
    });

    const handleAddProduct = () => {
        // สร้างสินค้าใหม่จากข้อมูลที่กรอกในฟอร์ม
        dispatch(addProduct({
            id: productList.length + 1,
            name: newProduct.name,
            price: `$${newProduct.price}`,
            description: newProduct.description,
        }));
        setNewProduct({ name: '', price: '', description: '' }); // รีเซ็ตฟอร์มหลังเพิ่มสินค้า
    };

    const handleRemoveProduct = (id) => {
        dispatch(removeProduct(id));
    };

    // จัดการกับการกรอกข้อมูลในฟอร์ม
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    return (
      <div className="isolate bg-white px-16 py-8 sm:py-32 lg:px-8">
          <h2 className="text-6xl font-semibold py-5">Product List</h2>
          
          <div className="container"> {/* ใช้ container เพื่อจัดวาง flexbox */}
              {/* รายการสินค้า */}
              <ul className="product-list">
                  {productList.map(product => (
                      <li key={product.id}>
                          <Link to={`/product/${product.id}`} className='text-xl'>
                              {product.name} - {product.price}
                          </Link>
                          <button onClick={() => handleRemoveProduct(product.id)}
                              className='button:hover'>
                              Remove
                          </button>
                      </li>
                  ))}
              </ul>
  
              {/* ฟอร์มสำหรับเพิ่มสินค้า */}
              <div className="product-form">
                <h2 className="text-6xl font-semibold py-5">Add Product</h2>
                  <label htmlFor="name">Product Name :
                      <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleChange}
                        className="input-class"
                      />
                  </label>
                  <label htmlFor="price">Product Price :
                      <input
                          type="number"
                          name="price"
                          value={newProduct.price}
                          onChange={handleChange}
                          className="input-class"
                      />
                  </label>
                  <label htmlFor="description">Product Description :
                      <input
                          type="text"
                          name="description"
                          value={newProduct.description}
                          onChange={handleChange}
                          className="input-class"
                      />
                  </label>
                  <button onClick={handleAddProduct}
                      className='block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                      Add Product
                  </button>
              </div>
          </div>
      </div>
  );
  
}

export default Products;