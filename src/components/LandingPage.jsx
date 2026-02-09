import React, { useState } from 'react';
import { db } from '../firebase'; // Your firebase config file
import { collection, addDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser'; 

const LandingPage = () => {
  // Form States
  const [email, setEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  
  // Loading States
  const [loading, setLoading] = useState(false);          // For Blueprint form
  const [bookingLoading, setBookingLoading] = useState(false); // For Calendar form
  
  // Status States
  const [status, setStatus] = useState({ type: '', msg: '' });               // For Blueprint
  const [bookingStatus, setBookingStatus] = useState({ type: '', msg: '' }); // For Calendar

  /**
   * HANDLER 1: Lead Capture & Email Delivery
   */
  const handleLeadCapture = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      // 1. Save to Firebase leads collection
      await addDoc(collection(db, "leads"), { 
        email, 
        timestamp: new Date() 
      });

      // 2. Trigger EmailJS
      const templateParams = {
        user_email: email,      
        email: email,           
        name: "Valued Guest",   
        title: "Growth Blueprint", 
        message: "Requested the 10-step business growth blueprint.",
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus({ type: 'success', msg: '✨ Success! The blueprint is heading to your inbox.' });
      setEmail('');
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({ type: 'error', msg: '❌ Error saving lead. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  /**
   * HANDLER 2: Strategy Call Booking
   */
  const handleBooking = async () => {
    if (!bookingDate) {
      setBookingStatus({ type: 'error', msg: 'Please select a date and time first.' });
      return;
    }

    setBookingLoading(true);
    setBookingStatus({ type: '', msg: '' });

    try {
      // 1. Save booking to Firebase
      await addDoc(collection(db, "bookings"), {
        email: email || "Not provided", // Uses email from hero if filled
        appointmentDate: bookingDate,
        createdAt: new Date(),
        status: "pending"
      });

      // 2. Success Feedback
      setBookingStatus({ 
        type: 'success', 
        msg: `✅ Confirmed! We'll see you on ${new Date(bookingDate).toLocaleString()}` 
      });
      
      // Optional: Clear date after success
      setBookingDate(''); 

    } catch (error) {
      console.error("Booking error:", error);
      setBookingStatus({ type: 'error', msg: '❌ Error saving booking. Please try again.' });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* 1. LEAD CAPTURE (Hero Section) */}
      <header className="bg-white py-24 px-6 text-center border-b">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Scale Your Business <span className="text-blue-600">Faster</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join 5,000+ entrepreneurs and get our exclusive 10-step growth blueprint delivered to your inbox instantly.
          </p>
          
          <form onSubmit={handleLeadCapture} className="flex flex-col md:flex-row justify-center items-stretch gap-3 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your work email" 
              className="px-5 py-4 border border-gray-200 rounded-xl md:flex-1 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              disabled={loading}
              className={`px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              }`}
            >
              {loading ? 'Sending...' : 'Get Free Blueprint'}
            </button>
          </form>

          {status.msg && (
            <div className={`mt-6 inline-block px-6 py-3 rounded-full text-sm font-semibold animate-fade-in ${
              status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
            }`}>
              {status.msg}
            </div>
          )}
        </div>
      </header>

      {/* 2. BOOKING SECTION */}
      <section className="py-20 px-6 bg-gray-50" id="booking">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Book a Strategy Call</h2>
            <p className="text-gray-500">Pick a time for a 1-on-1 growth audit with our team.</p>
          </div>
          <div className="space-y-6">
            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1 mb-2 block">Select Date & Time</label>
              <input 
                type="datetime-local" 
                className="w-full p-4 border border-gray-100 rounded-2xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
            </div>

            {/* Booking Status Message */}
            {bookingStatus.msg && (
              <div className={`text-center p-3 rounded-xl text-sm font-bold ${
                bookingStatus.type === 'success' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
              }`}>
                {bookingStatus.msg}
              </div>
            )}

            <button 
              disabled={bookingLoading}
              className={`w-full p-5 rounded-2xl font-bold text-white transition-all shadow-lg active:scale-[0.98] ${
                bookingLoading ? 'bg-gray-400' : 'bg-gray-900 hover:bg-black'
              }`}
              onClick={handleBooking}
            >
              {bookingLoading ? 'Saving Booking...' : 'Confirm & Schedule Call'}
            </button>
          </div>
        </div>
      </section>

      {/* 3. SALES / PRICING SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Transparent Pricing</h2>
          <p className="text-gray-500 text-lg">Choose the plan that matches your current stage of growth.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-center">
          
  {/* Starter Plan */}
  <div className="border border-gray-100 p-8 rounded-3xl bg-white hover:border-blue-200 hover:shadow-2xl transition-all flex flex-col group">
    <h3 className="text-lg font-bold uppercase text-gray-400 group-hover:text-blue-600 transition-colors">Starter</h3>
    <div className="text-5xl font-black my-6 tracking-tight">
      $49<span className="text-lg font-medium text-gray-400">/mo</span>
    </div>
    <ul className="text-gray-600 space-y-4 mb-10 flex-grow">
      <li className="flex items-center gap-3">✓ 5 Basic Reports</li>
      <li className="flex items-center gap-3">✓ Email Support</li>
      <li className="flex items-center gap-3">✓ 1 User Account</li>
    </ul>
    <button
      onClick={() => window.open("https://paystack.shop/pay/xp74mfvy27", "_blank")}
      className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all"
    >
      Buy Starter
    </button>
  </div>



          {/* Pro Plan */}
<div className="border-2 border-blue-600 p-10 rounded-[2.5rem] bg-white shadow-2xl relative flex flex-col md:scale-110 z-10">
  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-lg">
    Most Popular
  </div>
  <h3 className="text-lg font-bold uppercase text-blue-600">Professional</h3>
  <div className="text-5xl font-black my-6 tracking-tight">
    $149<span className="text-lg font-medium text-gray-400">/mo</span>
  </div>
  <ul className="text-gray-600 space-y-4 mb-10 flex-grow">
    <li className="flex items-center gap-3 font-medium text-gray-900">✓ Unlimited Reports</li>
    <li className="flex items-center gap-3 font-medium text-gray-900">✓ Priority 24/7 Support</li>
    <li className="flex items-center gap-3 font-medium text-gray-900">✓ 10 User Accounts</li>
    <li className="flex items-center gap-3 font-medium text-gray-900">✓ Custom Integrations</li>
  </ul>
  <button
    onClick={() => window.open("https://paystack.shop/pay/xp74mfvy27", "_blank")}
    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95"
  >
    Get Pro Access
  </button>
</div>


          {/* Enterprise Plan */}
<div className="border border-gray-100 p-8 rounded-3xl bg-white hover:border-blue-200 hover:shadow-2xl transition-all flex flex-col group">
  <h3 className="text-lg font-bold uppercase text-gray-400 group-hover:text-blue-600 transition-colors">Enterprise</h3>
  <div className="text-5xl font-black my-6 tracking-tight">
    $499<span className="text-lg font-medium text-gray-400">/mo</span>
  </div>
  <ul className="text-gray-600 space-y-4 mb-10 flex-grow">
    <li className="flex items-center gap-3">✓ Dedicated Manager</li>
    <li className="flex items-center gap-3">✓ On-site Training</li>
    <li className="flex items-center gap-3">✓ White-labeling</li>
  </ul>
  <button
    onClick={() => window.open("https://paystack.shop/pay/mgdsq870f4", "_blank")}
    className="w-full border-2 border-gray-900 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-900 hover:text-white transition-all"
  >
    Contact Sales
  </button>
</div>

        </div>
      </section>

    </div>
  );
};

export default LandingPage;