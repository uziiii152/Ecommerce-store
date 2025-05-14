import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/user/addtoCart', {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
        },
      });

      const cartData = res.data;
      setCart(cartData);

      // Calculate total
      let total = 0;
      for (let item of cartData.items) {
        total += item.product.price * item.quantity;
      }
      setTotalAmount(total);

    } catch (err) {
      setError('Failed to load cart');
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkOut = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        'http://localhost:5000/api/user/orderCheckout',
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem('authToken')}`,
          },
        }
      );
      setOrderSuccess(true);
      setOrderDetails(res.data.data);
      // Optional: navigate('/checkout'); // if you have a separate page
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to checkout');
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (orderSuccess) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold text-green-500">Order Placed Successfully!</h2>
        <p className="mt-2">Order ID: {orderDetails._id}</p>
        <p>Total Amount: ${orderDetails.totalAmount}</p>
        <p>Status: {orderDetails.status}</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cart.items.map((item) => (
          <div key={item.product._id} className="bg-gray-800 p-4 rounded shadow text-white">
            <h3 className="font-semibold text-lg">{item.product.title}</h3>
            <p>Price: ${item.product.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ${item.product.price * item.quantity}</p>
            <img
              src={item.product.imageUrl}
              alt={item.product.title}
              className="w-full h-32 object-cover mt-2 rounded"
            />
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Total: ${totalAmount}</h3>
        <button
          onClick={checkOut}
          className="mt-2 bg-amber-600 p-2 rounded-md text-white hover:bg-amber-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
