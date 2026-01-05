import React from "react";
import { Form, Input, Button, message } from "antd";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";

// ✅ Correct way (VITE/REACT) to load image
import bgImage from "../assets/images/bg pic.avif";

export default function Signup() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await axiosInstance.post("/signup/", values);

      message.success("Account created successfully!");
      navigate("/login");

    } catch (error) {
      console.error("Signup Error:", error.response?.data);

      if (error.response?.data) {
        message.error(JSON.stringify(error.response.data));
      } else {
        message.error("Signup failed! Please try again.");
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 
        rounded-2xl shadow-2xl border border-gray-200 
        transform transition-all duration-300 hover:scale-105"
      >
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Create Account
        </h2>

        <Form
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* Username */}
          <Form.Item
            label={<span className="text-gray-700">Username</span>}
            name="username"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input className="py-2" placeholder="Enter your username" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label={<span className="text-gray-700">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input className="py-2" placeholder="Enter your email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label={<span className="text-gray-700">Password</span>}
            name="password"
            rules={[
              { required: true, message: "Please enter password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password className="py-2" placeholder="Enter password" />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 !bg-blue-600 hover:!bg-blue-700"
            >
              Signup
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-sm text-gray-700 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
