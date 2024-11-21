import React, { useState } from 'react';
import Header from './Header';
import Toast from './Toast'; // Ensure Toast is implemented in your project
import contact102 from '../assets/contact102.png';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    queryType: '',
    email: '',
    phone: '',
    feedback: '', // Feedback initialized as an empty string
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.email) {
      setToastMessage('Please fill out required fields.');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    setToastMessage('Form submitted successfully!');
    setToastType('success');
    setShowToast(true);

    console.log('Form Data:', formData);
  };

  const handleFeedback = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      feedback: type,
    }));

    setToastMessage(`Feedback received: ${type}`);
    setToastType('info');
    setShowToast(true);

    console.log(`Feedback received: ${type}`);
  };

  return (
    <div>
      <Header />
   
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      )}
   
      {/* Removed top-28 and added padding */}
      <div className="bg-white font-inter min-h-screen flex items-center justify-center py-10">
        <div className="max-w-6xl w-full bg-white shadow-md rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side: Request a call form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 py-2 mb-6">Request a call.</h2>
            <p className="text-gray-600 mb-4">
              Give us some info so the right person can get back to you.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  aria-label="First name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  aria-label="Last name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <input
                type="text"
                name="queryType"
                placeholder="Query Type"
                aria-label="Query Type"
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                value={formData.queryType}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email"
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                aria-label="Phone"
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                value={formData.phone}
                onChange={handleChange}
              />
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-black text-white font-bold py-2 px-4 rounded"
                >
                  CONTACT ME
                </button>
              </div>
            </form>
            <div className="mt-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Leave us some feedback.</h2>
              <p className="text-gray-600">Good or bad, we love to hear it all.</p>
              <div className="flex gap-4 mt-2">
                <button
                  className="bg-blue-500 hover:bg-black text-white font-bold py-2 px-4 rounded-tr-lg"
                  onClick={() => handleFeedback('Good')}
                >
                  GOOD
                </button>
                <button
                  className="bg-blue-500 hover:bg-black text-white font-bold py-2 px-6 rounded-bl-lg"
                  onClick={() => handleFeedback('Bad')}
                >
                  BAD
                </button>
              </div>
              {formData.feedback && (
                <p className="mt-2 text-gray-600">Feedback: {formData.feedback}</p>
              )}
            </div>
          </div>

          {/* Right side: Contact options */}
          <div className="space-y-8">
            <div>
              <img src={contact102} alt="Contact" className="rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
