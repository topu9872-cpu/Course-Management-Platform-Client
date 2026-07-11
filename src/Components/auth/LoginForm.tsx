"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "sonner";

const LoginForm = () => {
  const route = useRouter();
  const [visible, setVisible] = useState(false);

  interface formInfo {
    email: string;
    password: string;
    
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as Record<keyof formInfo, string>;

    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password
      
    });
    if (data) {
      toast.success("Login Successfull", {
        style: {
          background: "#ffffff",
          color: "#2563eb", 
          border: "1px solid #bfdbfe",
        },
      });
      route.push("/");
    }
    if (error) {
      toast.error("Failed to Logedin", {
        style: {
          background: "#ffffff",
          color: "#2563eb",
          border: "1px solid #bfdbfe",
        },
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
        {/* Logo */}
        <div className="mb-6 text-center">
          <h1 className="mt-3 text-2xl font-bold text-gray-800">
            Welcome Back
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Sign in to continue learning.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
              />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button className="btn btn-primary w-full">Login</button>
        </form>

        <div className="divider my-5">OR</div>

        <button className="btn btn-outline w-full">Continue with Google</button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/registration"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
