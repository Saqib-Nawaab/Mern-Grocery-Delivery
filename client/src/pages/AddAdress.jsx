import React, { useRef, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, name, value, handleChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={handleChange}
    className="w-full border border-gray-500/30 text-gray-500 focus:border-primary transition px-2 py-2.5 rounded outline-none"
    required
  />
);

function AddAdress() {
  const { axios, navigate, user, setshowUserLogin } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const fullAddress = {
        name: `${address.firstName} ${address.lastName}`,
        email: address.email,
        address: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        zipcode: Number(address.zipcode),
        phone: Number(address.phone),
      };

      const { data } = await axios.post("/api/address/add", {
        address: fullAddress
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const hasPromptedLogin = useRef(false);

  useEffect(() => {
    if (!user && !hasPromptedLogin.current) {
      toast.error("Please login to continue");
      setshowUserLogin(true);
      hasPromptedLogin.current = true;
    }
  }, []);

  return (
    <div className="mt-16 pb-16 px-4 md:px-12">
      <p className="text-2xl md:text-3xl text-gray-800 mb-8">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse lg:flex-row justify-between gap-8">
        <div className="flex-1 max-w-lg">
          <form className="space-y-4 text-sm" onSubmit={onSubmitHandler}>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="text"
                name="firstName"
                placeholder="First Name"
                value={address.firstName}
                handleChange={handleChange}
              />
              <InputField
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={address.lastName}
                handleChange={handleChange}
              />
            </div>

            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={address.email}
              handleChange={handleChange}
            />

            <InputField
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={address.phone}
              handleChange={handleChange}
            />

            <InputField
              type="text"
              name="street"
              placeholder="Street"
              value={address.street}
              handleChange={handleChange}
            />

            <InputField
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              value={address.zipcode}
              handleChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                handleChange={handleChange}
              />
              <InputField
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                handleChange={handleChange}
              />
            </div>

            <InputField
              type="text"
              name="country"
              placeholder="Country"
              value={address.country}
              handleChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dull text-white font-medium py-2.5 rounded transition"
            >
              Save Address
            </button>
          </form>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img
            src={assets.add_address_iamge}
            alt="Address Illustration"
            className="w-full max-w-[500px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default AddAdress;
