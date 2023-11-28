import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSentCount, setOtpSentCount] = useState(0);

  const emailIsValid = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSendOtp = async () => {
    if (!emailIsValid(email)) {
      alert('Please enter a valid email.');
      return;
    }

    if (otpSentCount < 3) {
      
    const formData = new FormData();
    formData.append('action', 'sendotp');
    formData.append('email', email);

    try {
      // Sending POST request with Auth header
      const response = await axios.post('http://adhyapak-app.test/', formData, {
        headers: {
          'Authorization': 'Bearer youarenotallowed'
        }
      });

      if (response.status === 200) {
        if (response.data && response.data.otp) {
          // Setting OTP in local storage
          localStorage.setItem('otp', response.data.otp);  
        }

        console.log(`OTP sent to ${email}`);
        setOtpSentCount(otpSentCount + 1);
      } else {
        console.log(`Failed to send OTP: ${response.data}`);
      }

    } catch (error) {
      console.error('Error sending OTP:', error);
    }

    } else {
      alert('Maximum OTP resend attempts reached.');
    }
  };

  const handleValidateOtp = async () => {
    
    // Read OTP from local storage
  const storedOtp = localStorage.getItem('otp');

  if (storedOtp === null) {
    // No OTP was stored in local storage
    console.log('No OTP found in local storage. Please request an OTP first.');
    alert('No OTP found. Please request an OTP first.');
    return;
  }

  if (otp === storedOtp) {
    // OTPs match, proceed with the desired actions
    console.log('OTP validated successfully.');

    // Initialize form data for POST request
    const formData = new FormData();
    formData.append('action', 'get_user_info');
    formData.append('email', email);

    try {
      // Send POST request
      const response = await axios.post('http://adhyapak-app.test/', formData, {
        headers: {
          'Authorization': 'Bearer youarenotallowed'
        }
      });

      if (response.status === 200) {
        // You can add logic here to handle the user information you get from the API
        console.log("User information received:", response.data);
        localStorage.setItem('auth', true);
        localStorage.setItem('user_id', response.data.user_info.id);
        localStorage.setItem('user_name', response.data.user_info.name);
        localStorage.setItem('user_email', response.data.user_info.email);
        localStorage.setItem('user_phone', response.data.user_info.phone);
        localStorage.setItem('user_role', response.data.user_info.role);
        localStorage.setItem('user_status', response.data.user_info.status);


        alert('OTP validated successfully.');


        // Remove the OTP from local storage if necessary
        localStorage.removeItem('otp');
        window.location.reload(); // Reload the page

      } else {
        console.log(`Failed to fetch user info: ${response.data}`);
      }

    } catch (error) {
      console.log('An error occurred while fetching user info:', error);
    }

  
  } else {
    // OTPs do not match, show an error message
    console.log('Invalid OTP. Please try again.');
    alert('Invalid OTP. Please try again.');
  }

  };

  

// Random education-related image from Unsplash
  const bgImageUrl = "https://source.unsplash.com/random?education";  
  
  return (
    <div  style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} className="flex flex-col items-center justify-center h-screen">
      <div className="p-8 border rounded-md bg-white">
        <h1 className="text-2xl mb-4">Login</h1>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <button onClick={handleSendOtp} className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700">
          Send OTP
        </button>
        <div className="mt-4">
          <label className="block text-sm font-bold mb-2">Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <button onClick={handleValidateOtp} className="px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded-full hover:bg-green-700">
          Validate OTP
        </button>
        <button onClick={handleSendOtp} className="px-4 py-2 mt-4 ml-4 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700">
          Resend OTP
        </button>
        {otpSentCount > 0 && <p className="mt-4">OTP Sent: {otpSentCount} 
        <br/> Please check your email account.
         </p>} 
      </div>
    </div>
  );
};

export default Login;
