import React, { useEffect, useState } from 'react';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Flask API에서 물품 정보를 가져오는 함수
  const fetchProducts = async () => {
    try {
      const response = await fetch('/get_products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // 컴포넌트가 마운트될 때 물품 정보를 가져옴
  useEffect(() => {
    fetchProducts();
  }, []);

  // 현재 페이지에 해당하는 항목을 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 총 페이지 수 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1>재고 목록</h1>
      <ul>
        {currentProducts.map((product) => (
          <li key={product.product_id}>
            <h2>{product.product_name}</h2>
            <p>가격: ${product.price}</p>
            <p>수량: {product.quantity}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
