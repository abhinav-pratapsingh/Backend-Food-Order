import React from "react";

const Ooo = () => {
  const handleCompleteOrder = async () => {
    try {
      const orderData = await axios.post("/api/order/new", {
        userId: userId,
        restroId: restroId,
        items: cartItems,
        amount: totalAmount,
        address: shippingAddress,
      });

      if (orderData.data.success) {
        const razorpayOrder = orderData.data.razorpayOrder;

        var options = {
          key: orderData.data.key, // Your Razorpay Key
          amount: razorpayOrder.amount, // in paise (e.g., 50000 = 500 INR)
          currency: razorpayOrder.currency,
          name: "Tomato order",
          order_id: razorpayOrder.id, // Send the Razorpay order ID
          handler: function (response) {
            // Payment successful handler
            // Send the payment details to your backend to verify the payment
            verifyPayment(response);
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open(); // Opens the Razorpay checkout popup
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const verifyPayment = async (response) => {
    try {
      // Send payment details to backend for verification
      const verificationResponse = await axios.post("/api/order/verify", {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        orderId: response.order_id, // send the order ID you created
      });

      const data = verificationResponse.data;
      if (data.success) {
        alert("Payment verified successfully!");
        // Handle success actions like updating UI or redirecting to success page
      } else {
        alert("Payment verification failed!");
        // Handle failure actions like retry or show error message
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return <div>Ooo</div>;
};

export default Ooo;
