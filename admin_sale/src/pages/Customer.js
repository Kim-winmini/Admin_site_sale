import React, { useState, useEffect } from 'react';

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Flask API에서 고객 정보를 가져오는 함수
  const fetchCustomers = async () => {
    try {
      const response = await fetch('/get_customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // 컴포넌트가 마운트될 때 고객 정보를 가져옴
  useEffect(() => {
    fetchCustomers();
  }, []);

  // 현재 페이지에 해당하는 항목을 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 총 페이지 수 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(customers.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1>고객 목록</h1>
      <ul>
        {currentCustomers.map((customer) => (
          <li key={customer.user_id}>
            <h2>{customer.user_name}</h2>
            <p>이메일: {customer.user_email}</p>
            <p>전화번호: {customer.user_phone}</p>
            <p>등급: {customer.user_grade}</p>
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

export default Customer;
