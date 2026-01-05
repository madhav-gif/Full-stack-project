import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await axiosInstance.post("login/", values);

      // ✅ JWT access token check
      if (res?.data?.access) {
        // ✅ Save tokens
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        message.success("Login successful");
        navigate("/");
      } else {
        message.error("Token not returned by server");
      }
    } catch (error) {
      message.error("Invalid email or password");
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url('/src/assets/images/bg pic.avif')` }}
    >
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl border border-gray-200">

        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Login
        </h1>

        <Form
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" }
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-blue-600 hover:!bg-blue-700"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
