"use client";

import React, { useState } from "react";
import TopNavigation from "@/components/topNavigation/topNavigation";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://gorest.co.in/public/v2/users",
        formData,
        {
          headers: {
            Authorization:
              "Bearer c967e5f5e4e50f03aa01f2a6e70d8ec3392d239a8ecf091244536420a0c36687",
          },
        }
      );
      alert("User added successfully!");
      setFormData({
        name: "",
        email: "",
        gender: "",
        status: "",
      });
    } catch (e) {
      console.error("Error adding user:", e);
      alert("Failed to add user. Please try again later.");
    }
  };

  return (
    <div>
      <TopNavigation />
      <div
        style={{
          backgroundImage: "linear-gradient(to right, #ff416c, #ff4b2b)",
        }}
      >
        <h1 className="text-center text-white text-2xl font-bold mb-4 mt-20 p-12 uppercase">
          Add User Here
        </h1>
      </div>

      <div className="mx-20 flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="space-y-4 w-1/2 mt-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Type name here..."
              required
              className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full text-[15px]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Type email here..."
              required
              className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full text-[15px]"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full text-[15px]"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full text-[15px]"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="text-center flex justify-between items-end">
            <button
              onClick={() => router.push("/users")}
              className="text-black border-2 py-1 px-6 mt-4 w-1/4 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" font-bold text-white border-2 py-1 px-6 mt-4 w-1/4 rounded-md bg-blue-400 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
