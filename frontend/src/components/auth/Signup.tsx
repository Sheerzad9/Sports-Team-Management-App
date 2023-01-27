import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleUserSignup } from "../../reducers/UserReducer";
import { useDispatch } from "react-redux";
import store, { AppDispatch } from "../../store";
import * as authenticationModels from "../../models/AuthModels";
import "./Signup.css";

const Signup = () => {
  useEffect(() => {
    setRole("Player");
  }, []);

  const navigate = useNavigate();
  // Subcribing so we can redirect after successful login
  store.subscribe(() => {
    const { user } = store.getState();
    if (user) navigate("/");
  });

  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [birthDay, setBirthday] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);

  // For errors

  const [errors, setErrors] = useState([]);
  const [errFields, setErrFields] = useState([]);
  const [formContainsErrors, setFormContainsErrors] = useState(false);

  const currDay = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setFormContainsErrors(errors.length > 0);
  }, [errors]);

  const dispatch: AppDispatch = useDispatch();

  const validate = () => {
    const errs = [];
    const errFields = [];
    if (name?.length === 0 || !name) {
      errs.push("Name can't be empty");
      errFields.push("Name");
    }

    if (username?.length === 0 || !username) {
      errs.push("Username can't be empty");
      errFields.push("Username");
    }

    if (!birthDay) {
      errs.push("Birthday can't be empty");
      errFields.push("Birthday");
    }

    if (email?.length < 5 || !email) {
      errs.push("Email should be at least 5 charcters long");
      errFields.push("Email");
    }
    if (
      email?.length >= 5 &&
      email?.split("").filter((x) => x === "@")?.length !== 1
    ) {
      errs.push("Email should contain a @");
      errFields.push("Email");
    }

    if (password?.length < 6 || !password) {
      errs.push("Password should be at least 6 characters long");
      errFields.push("Password");
    }
    if (password?.normalize() !== passwordConfirm?.normalize()) {
      errs.push("Password don't match!");
      errFields.push("PasswordConfirm");
    }

    setErrors(errs);
    setErrFields(errFields);
    return errs.length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      let signUpData: authenticationModels.SignUpData;
      signUpData = {
        name,
        username,
        password,
        birthDay,
        email,
      };

      dispatch(handleUserSignup(signUpData));
    }
  };

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>
                  {formContainsErrors ? (
                    <div className="alert alert-danger" role="alert">
                      <h4>Please give the required inputs</h4>
                      <ul>
                        {errors.map((err) => (
                          <li key={err}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}

                  <form>
                    <div className="form-outline mb-4">
                      <input
                        placeholder="Username..."
                        type="text"
                        id="form3Example1cg"
                        className={
                          errFields.includes("Username")
                            ? "form-control form-control-lg is-invalid"
                            : "form-control form-control-lg"
                        }
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label className="form-label">
                        Your Username (must be unique)
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        placeholder="Name..."
                        type="text"
                        id="form3Example1cg"
                        onChange={(e) => setName(e.target.value)}
                        className={
                          errFields.includes("Name")
                            ? "form-control form-control-lg is-invalid"
                            : "form-control form-control-lg"
                        }
                      />
                      <label className="form-label">Your Name</label>
                    </div>

                    <div
                      id="date-picker-example"
                      className="md-form md-outline input-with-post-icon datepicker"
                    >
                      <input
                        placeholder="Select date"
                        type="date"
                        id="example"
                        className={
                          errFields.includes("Birthday")
                            ? "form-control form-control-md is-invalid"
                            : "form-control form-control-md"
                        }
                        onChange={(e) => setBirthday(e.target.value)}
                        max={currDay}
                      />
                      <label>Date of birth</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        placeholder="Email..."
                        type="email"
                        id="form3Example3cg"
                        className={
                          errFields.includes("Email")
                            ? "form-control form-control-lg is-invalid"
                            : "form-control form-control-lg"
                        }
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label">Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <label>Select role</label>
                      <select
                        defaultValue={"Plauer"}
                        className="form-control form-control-md"
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="Player">Player</option>
                        <option value="Manager">Manager</option>
                        <option value="Coach">Coach</option>
                        <option value="Staff">Staff</option>
                      </select>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        placeholder="Password..."
                        type="password"
                        id="form3Example4cg"
                        className={
                          errFields.includes("Password")
                            ? "form-control form-control-lg is-invalid"
                            : "form-control form-control-lg"
                        }
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label">Password</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        placeholder="Retype password..."
                        type="password"
                        id="form3Example4cdg"
                        className={
                          errFields.includes("PasswordConfirm")
                            ? "form-control form-control-lg is-invalid"
                            : "form-control form-control-lg"
                        }
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                      <label className="form-label">Repeat your password</label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        onClick={handleSignup}
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link className="fw-bold text-body" to={"/login"}>
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
