import React, { useState, useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const { axios } = useAppContext();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);
  const [positionInfo, setPositionInfo] = useState({ x: 0, y: 0 });
  const [positionForm, setPositionForm] = useState({ x: 0, y: 0 });
  const infoCardRef = useRef(null);
  const formCardRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const { data } = await axios.post("/api/contact", form);

      if (data?.success) {
        toast.success("Thank you for contacting us!");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMouseMoveInfo = (e) => {
    const bounds = infoCardRef.current.getBoundingClientRect();
    setPositionInfo({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  const handleMouseMoveForm = (e) => {
    const bounds = formCardRef.current.getBoundingClientRect();
    setPositionForm({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] via-[#ebedee] to-[#d6e4f0] py-16 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 transition-all duration-500">
      <Toaster />
      {/* Heading */}
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
          Contact{" "}
          <span className="bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
            Us
          </span>
        </h2>
        <p className="text-gray-600 mt-3 text-lg max-w-md mx-auto">
          We'd love to hear from you. Reach out with questions, suggestions, or
          just to say hello!
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* Contact Info */}
        <div
          ref={infoCardRef}
          onMouseMove={handleMouseMoveInfo}
          onMouseEnter={() => setVisibleInfo(true)}
          onMouseLeave={() => setVisibleInfo(false)}
          className="relative rounded-2xl p-1 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-100"
        >
          {visibleInfo && (
            <div className="pointer-events-none blur-2xl absolute top-0 left-0 w-full h-full" />
          )}
          <div className="relative z-10 bg-white rounded-[12px] p-10 space-y-8 overflow-hidden">
            <h3 className="text-2xl font-semibold text-gray-800">
              Get in Touch
            </h3>
            <p className="text-gray-500">
              We typically respond within 24 hours. Let us know how we can help.
            </p>

            <div className="flex items-center gap-4">
              <div className="p-2 border border-transparent rounded-full transition-all duration-300 hover:border-primary">
                <img src={assets.email} alt="Email" className="w-6 h-6" />
              </div>
              <a
                href="mailto:support@yourstore.com"
                className="text-gray-700 hover:text-primary transition"
              >
                support@yourstore.com
              </a>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-2 border border-transparent rounded-full transition-all duration-300 hover:border-primary">
                <img src={assets.telephone} alt="Phone" className="w-6 h-6" />
              </div>
              <a
                href="tel:+923123456789"
                className="text-gray-700 hover:text-primary transition"
              >
                +92 312 3456789
              </a>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-2 border border-transparent rounded-full transition-all duration-300 hover:border-primary">
                <img src={assets.location} alt="Location" className="w-6 h-6" />
              </div>
              <p className="text-gray-700">
                123, Market Road, Lahore, Pakistan
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          ref={formCardRef}
          onMouseMove={handleMouseMoveForm}
          onMouseEnter={() => setVisibleForm(true)}
          onMouseLeave={() => setVisibleForm(false)}
          onSubmit={handleSubmit}
          className="relative rounded-2xl p-1 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-100"
          aria-label="Contact Form"
        >
          {visibleForm && (
            <div
              className="pointer-events-none blur-2xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 size-48 absolute z-0 transition-opacity duration-300"
              style={{ top: positionForm.y - 96, left: positionForm.x - 96 }}
            />
          )}
          <div className="relative z-10 bg-white rounded-[12px] p-10 space-y-6 overflow-hidden">
            {error && (
              <p className="text-red-500 text-sm text-center animate-pulse">
                {error}
              </p>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Type your message..."
                rows="5"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dull hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
