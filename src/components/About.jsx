import React from 'react';
import Header from './Header';
import aboutimage1 from '../assets/aboutimage1.jpg';
import whoweare from '../assets/whoweare.jpg';
import whyus from '../assets/whyus.jpg';

export default function About() {
  return (
    <div>
      <Header />
      <div className="bg-white min-h-screen flex items-center justify-center py-12 ">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 px-6">
          
          {/* Left Side: "Who We Are" Section */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-sm text-orange-500 font-bold tracking-wide uppercase">Who We Are</h3>
            <h2 className="text-5xl font-extrabold text-gray-900">Who We Are</h2>
            <p className="text-lg text-gray-700">
              At DreamView, we transform hand gestures into digital art. Our mission is to make creativity more intuitive by bridging physical gestures with digital expression.
            </p>
            <img src={whoweare} alt="Hand Gesture" className="w-full h-96 object-cover rounded-lg shadow-md" />
          </div>

          {/* Right Side: "Why Us" Section */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-sm text-orange-500 font-bold tracking-wide uppercase">Why Us</h3>
            <h2 className="text-5xl font-extrabold text-gray-900">Why Us</h2>
            <p className="text-lg text-gray-700">
              DreamView isn’t just tech—it’s a new way to create and interact. With a focus on innovation and ease, we empower users to express themselves in a unique, engaging way.
            </p>
            <img src={whyus} alt="Handshake" className="w-full h-96 object-cover rounded-lg shadow-md" />
          </div>

        </div>
      </div>

    </div>


  );
}
