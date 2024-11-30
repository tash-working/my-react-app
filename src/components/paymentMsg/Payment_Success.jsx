import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import { FaCheckCircle } from 'react-icons/fa'; // Importing React Icons


function Payment_Success() {
  const socket = io(`http://localhost:5000/`);
  const { tranID } = useParams();
  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (tranID) => {
    try {
      const response = await fetch(`http://localhost:5000/getData/${tranID}`);
      const jsonData = await response.json();
      setData(jsonData); // Store the fetched data
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(tranID);
  }, [tranID]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
          <div className="flex justify-center mb-4">
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHevWCw9OwglL5vNOf4UovVnsyRf4pC2dmWg&s" alt="Logo" className="h-12" /> */}
          </div>
          <div className="text-center">
            <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800">Payment Successful!</h2>
            <p className="mt-2 text-gray-600">Thank you for your payment. Your transaction ID is:</p>
            {error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              <div className="mt-4">
                {data ? (
                  <p className="text-lg font-semibold text-gray-800">{data.transactionID || tranID}</p> // Display transaction ID
                ) : (
                  <p className="text-gray-500">Loading...</p>
                )}
              </div>
            )}
          </div>
          <div className="mt-6">
            <a href="/" className="block w-full text-center bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200">
              Go to Home
            </a>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Payment_Success;