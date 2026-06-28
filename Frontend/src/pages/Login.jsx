import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      // Save user details
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("email", data.user.email);
      

      alert("Login Successful!");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-body">

              <h2 className="text-center mb-4">
                Login
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-4">

                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                <button
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading
                    ? "Logging In..."
                    : "Login"}
                </button>

              </form>

              <div className="text-center mt-3">

                Don't have an account?

                <Link
                  to="/register"
                  className="ms-2"
                >
                  Register
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;