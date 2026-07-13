"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

import { emailPost } from "@/app/api/ServerAction";
import { ImageBB } from "../UI/ImageBB";

const RegisterPage = () => {
  const [Role, setRole] = useState("student");
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const route = useRouter();
  const userSub = Role === "student" ? "student_free" : null;
  interface formInfo {
    email: string;
    password: string;
    name: string;
    role: string;
    image: any;
    subscription: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as Record<keyof formInfo, string>;
    const imageUrl = await ImageBB(image!);
    const { data, error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: imageUrl,
      role: Role,
      subscription: userSub,
    });
console.log(data)
    if (data) {
      route.push("/");
      toast.success("Account Created", {
        style: {
          background: "#ffffff",
          color: "#2563eb",
          border: "1px solid #bfdbfe",
        },
      });
      await emailPost({
        email: data.user.email,
        name: data.user.name,
      });
    }
    if (error) {
      toast.error("Failed to create account", {
        style: {
          background: "#ffffff",
          color: "#2563eb",
          border: "1px solid #bfdbfe",
        },
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
        {/* Logo */}
        <div className="mb-6 text-center">
          <h1 className="mt-3 text-2xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create your account to continue.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="mb-2 block text-sm font-medium">Password</label>

            <input
              name="password"
              type={visible ? "text" : "password"}
              placeholder="********"
              className="input input-bordered w-full"
            />
            <button
              className='absolute right-3 top-2/3 -translate-y-1/2 text-gray-500 transition-colors hover:text-blue-600" '
              onClick={() => setVisible(!visible)}
            >
              {visible ? <FaEye size="16" /> : <FaEyeSlash size="16" />}
            </button>
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Profile Image
            </label>

            <input
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) {
                  setImage(file);
                }
              }}
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`py-2 text-sm font-semibold rounded-md transition-all ${
                Role === "student"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("instructor")}
              className={`py-2 text-sm font-semibold rounded-md transition-all ${
                Role === "instructor"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Instructor
            </button>
          </div>

          {/* Register */}
          <button className="btn btn-primary w-full">Create Account</button>
        </form>

        {/* Divider */}
        <div className="divider my-5">OR</div>

        {/* Google */}
        <button className="btn btn-outline w-full">Continue with Google</button>

        {/* Login */}
        <p className="mt-5 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
