import { useState } from "react";
import axiosInstance from "../lib/axios";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import LoginPageTable from "../Components/LoginPageTable";
import toast from "react-hot-toast";

const LoginPage = ({ handleLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required!", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    try {
      const response = await axiosInstance.post(
        "https://bootcamp2025.depster.me/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      const token = response.data?.data.token;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");
        handleLogin();
        toast.success("Login successful!", {
          duration: 2000,
          position: "top-center",
        });
      } else {
        toast.error("Login failed: No token received", {
          duration: 3000,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Invalid email or password!", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-white text-black p-6 rounded-lg">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <h1 className="text-2xl font-bold mt-2 ">Welcome back</h1>
              <p>Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <span className="font-medium">Email</span>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5" />
                </div>
                <input
                  type="email"
                  className={`input border-1 w-full rounded-lg pl-10 p-1`}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <span className="font-medium">Password</span>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input border-1 rounded-lg w-full pl-10 p-1`}
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full bg-rose-500 text-white p-1"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* right*/}
      <LoginPageTable
        title="Welcome to Countries Fetching App"
        subtitle="Crete list of your favourite countries."
      />
    </div>
  );
};

export default LoginPage;
