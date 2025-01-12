import React from "react";
import { useEffect } from "react";
import Navbar from './navbar'; // Import the Navbar component

const About = () => {
  useEffect(() => {
    // Adding animations on scroll
    const elements = document.querySelectorAll(".animate-on-scroll");
    window.addEventListener("scroll", () => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("fade-in");
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 py-10 px-6">
      {/* Navbar added here */}
      <Navbar />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-on-scroll">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 transition-transform duration-500 hover:scale-110">
            About SHAHMEER
          </h1>
          <p className="text-lg text-gray-600 font-serif">
            A Scalable Solution for Content Creators and Administrators
          </p>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="animate-on-scroll">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 transition-all duration-300 hover:text-blue-600">
              What is SHAHMEER?
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              SHAHMEER is a robust video content platform tailored for creators
              and administrators. It features scalable client-server
              architecture built with modern web technologies to ensure
              flexibility, modularity, and ease of maintenance.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Key Features:
            </h3>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
              <li>
                <strong>RBAC System:</strong> Role-Based Access Control allows
                tailored access for Admins and Creators.
              </li>
              <li>
                <strong>Admin Dashboard:</strong> Manage users, view analytics,
                and monitor platform performance.
              </li>
              <li>
                <strong>Creator Dashboard:</strong> Upload, manage, and
                personalize your video content.
              </li>
              <li>
                <strong>Video Management:</strong> Advanced video handling with
                search functionality.
              </li>
              <li>
                <strong>Role-Based Navigation:</strong> Dynamic navigation and
                protected routes based on user roles.
              </li>
              <li>
                <strong>Error Handling:</strong> Seamless error handling with a
                NotFound page.
              </li>
            </ul>
          </div>

          {/* Image Content */}
          <div className="flex justify-center animate-on-scroll">
            <img
              src="./assets/logo.png" // Replace with a relevant SHAHMEER-themed image
              alt="SHAHMEER Overview"
              className="rounded-lg shadow-lg transition-transform duration-500 transform hover:scale-110"
            />
          </div>
        </div>

        {/* System Design Section */}
        <div className="mt-16 animate-on-scroll">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            System Design
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            SHAHMEER leverages a layered architectural model to guarantee
            scalability, modularity, and ease of maintenance:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-2xl hover:scale-105">
              <h3 className="text-2xl font-semibold text-blue-800 mb-2">
                Frontend
              </h3>
              <p className="text-gray-600">
                Developed with React.js for a responsive and dynamic user
                interface.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-2xl hover:scale-105">
              <h3 className="text-2xl font-semibold text-green-800 mb-2">
                Backend
              </h3>
              <p className="text-gray-600">
                Powered by Node.js and Express for a reliable and scalable API
                layer.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-2xl hover:scale-105">
              <h3 className="text-2xl font-semibold text-indigo-800 mb-2">
                Database
              </h3>
              <p className="text-gray-600">
                MongoDB ensures efficient data storage and retrieval for user
                and video data.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-2xl hover:scale-105">
              <h3 className="text-2xl font-semibold text-purple-800 mb-2">
                Media Handling
              </h3>
              <p className="text-gray-600">
                Integration with Cloudinary for smooth and scalable media
                management.
              </p>
            </div>
          </div>
        </div>

        {/* Conclusion Section */}
        <div className="mt-16 text-center animate-on-scroll">
          <p className="text-gray-700 text-lg">
            SHAHMEER is designed to empower content creators and administrators
            with robust tools and seamless user experiences. Whether managing
            users or creating content, SHAHMEER ensures secure and scalable
            operations for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
