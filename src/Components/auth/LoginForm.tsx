'use client'
import Link from "next/link";


const LoginForm = () => {

const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
const formData=Object.fromEntries(new FormData(e.currentTarget))
console.log(formData)
}


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
            name='email'
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
            name='password'
              type="password"
              placeholder="********"
              className="input input-bordered w-full"
            />
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

          <button className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="divider my-5">OR</div>

        <button className="btn btn-outline w-full">
          Continue with Google
        </button>

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