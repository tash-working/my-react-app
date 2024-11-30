import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/footer'
import { FaTimesCircle } from 'react-icons/fa';
function PaymentFail() {
     // localStorage.setItem(
      //   "user",
      //   JSON.stringify({
      //     phoneNumber: formData.phoneNumber,
      //     sector: formData.sector,
      //     road: formData.road,
      //     house: formData.house,
      //   })
      // );

      
      // const updatedOrders = [];
      // setOrders(updatedOrders);

      // const totalQuantity = updatedOrders.reduce(
      //   (acc, order) => acc + order.quantity,
      //   0
      // );
      // setCount(totalQuantity);
      // localStorage.setItem("orders", JSON.stringify(updatedOrders));

      // // Show success toast
      // toast.success("Order placed successfully!", {
      //   duration: 3000,
      //   position: "top-center",
      // });

      // // Show confetti
      // setShowConfetti(true);
      // setTimeout(() => setShowConfetti(false), 5000);

      // // Reset form
      // setFormData({
      //   phoneNumber: "",
      //   sector: "",
      //   road: "",
      //   house: "",
      // });
      return (
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <div className="flex-grow flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
              <div className="flex justify-center mb-4">
                <FaTimesCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">Payment Failed</h2>
                <p className="mt-2 text-gray-600">We're sorry, but your payment could not be processed.</p>
                <p className="mt-2 text-gray-600">Please try again or contact support for assistance.</p>
              </div>
              <div className="mt-6">
                <a href="/" className="block w-full text-center bg-red-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-red-700 transition duration-200">
                  Go to Homepage
                </a>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
}

export default PaymentFail