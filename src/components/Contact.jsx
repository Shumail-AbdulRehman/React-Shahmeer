import React, { useState } from "react";
import Navbar from './navbar'; // Import the Navbar component

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Your response has been recorded. Thank you!");

    // Trigger the browser notification
    if (Notification.permission === "granted") {
      new Notification("Form Submitted", {
        body: "Your response has been recorded. Thank you!",
        icon: "https://via.placeholder.com/50", // Replace with your icon URL
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Form Submitted", {
            body: "Your response has been recorded. Thank you!",
            icon: "https://via.placeholder.com/50", // Replace with your icon URL
          });
        }
      });
    }

    // Clear the form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      {/* Add Navbar here */}
      <Navbar />

      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-12 rounded-lg shadow-2xl max-w-lg w-full">
          <h1 className="text-4xl font-semibold text-center mb-6 text-gray-800">
            Contact Us
          </h1>
          <p className="text-center text-gray-600 mb-8 text-lg font-serif">
            We’d love to hear from you! Please send us a message below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-sans"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-sans"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-sans"
                placeholder="Write your message here"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-xl font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
          {status && (
            <p className="mt-6 text-center text-lg text-green-500 font-serif">
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
