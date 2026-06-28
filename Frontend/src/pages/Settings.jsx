import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {

  const navigate = useNavigate();

  const [name, setName] = useState(
    localStorage.getItem("userName") || ""
  );

  const [email, setEmail] = useState(
    localStorage.getItem("email") || ""
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const handleSave = () => {

    localStorage.setItem("userName", name);

    localStorage.setItem("email", email);

    localStorage.setItem("theme", theme);

    alert("Settings Saved Successfully!");

    navigate("/");
  };

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-7">

          <div className="card shadow border-0">

            <div className="card-body">

              <h2 className="mb-4">
                ⚙ Account Settings
              </h2>

              <div className="mb-3">

                <label className="form-label">
                  Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

              <div className="mb-4">

                <label className="form-label">
                  Theme
                </label>

                <select
                  className="form-select"
                  value={theme}
                  onChange={(e) =>
                    setTheme(e.target.value)
                  }
                >
                  <option value="light">
                    🌞 Light
                  </option>

                  <option value="dark">
                    🌙 Dark
                  </option>

                </select>

              </div>

              <div className="d-flex gap-3">

                <button
                  className="btn btn-success"
                  onClick={handleSave}
                >
                  Save Changes
                </button>

                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;