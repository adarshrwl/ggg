import React, { useState } from "react";
import axios from "axios";
import './ContactUs.css';
import backgroundImage from './bg.jpg';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/user/send-email", {
        ...formData,
        to: "adarshrawal321@gmail.com"
      });
      alert("Email sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  return (
    <div className='contact-us-container' style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='contact-form-container mt-3'>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="form-control" 
          />
          
          <label htmlFor="email" className="mt-2">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="form-control" 
          />
          
          <label htmlFor="message" className="mt-2">Message</label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
            className="form-control"
            rows="4"
          ></textarea>
          
          <button type="submit" className="btn btn-primary w-100 mt-2">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
