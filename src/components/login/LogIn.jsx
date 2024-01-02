import React, { useState } from "react";
import { svgEye } from "../../common/Icons";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [inputFilds, setInputFilds] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [handlePassReveal, sethandlePassReveal] = useState(false);

  // const [shoLoader, setshoLoader] = useState(false);
  // setTimeout(() => {
  //   setshoLoader(true);
  // }, 1000);
  const handleSignUp = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section
        id="login-page"
        className={`bg-[#243151] min-h-screen  justify-center items-center relative z-10 flex py-10`}>
        <div className="container ">
          <div className=" signup-container pb-20">
            <h2>Sign In</h2>
            <h3>
              Don't have an Account ?{" "}
              <Link to="/Signup">
                {" "}
                <span>Sign Up</span>
              </Link>
            </h3>
            <form action="" onSubmit={handleSignUp}>
              {/* email lable */}
              <div className="lable-parent">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) =>
                    setInputFilds({
                      ...inputFilds,
                      email: e.target.value,
                    })
                  }
                  type="email"
                  value={inputFilds.email}
                />
              </div>

              {/* password lable */}
              <div className="lable-parent relative">
                {" "}
                <label htmlFor="password">Password</label>
                <input
                  onChange={(e) =>
                    setInputFilds({
                      ...inputFilds,
                      password: e.target.value,
                    })
                  }
                  type={handlePassReveal ? "text" : "password"}
                  value={inputFilds.password}
                />
                {inputFilds.password && (
                  <span
                    onClick={() => sethandlePassReveal(!handlePassReveal)}
                    className=" absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:bg-[#6ea4ef2d] transition-all duration-300 rounded-[4px]">
                    <span className="relative">
                      {" "}
                      <span
                        className={` absolute top-1/2 inline-block h-[2px] w-full bg-[#718096] rotate-[40deg] -translate-y-1/2 transition-all duration-100 ${
                          handlePassReveal ? " opacity-100" : "opacity-0"
                        }`}></span>{" "}
                      {svgEye}
                    </span>
                  </span>
                )}
              </div>
              <div className="flex justify-between w-full">
                {" "}
                <div className="remamber_me_forgot_pass flex items-center">
                  <input
                    className="h-[16px] w-[16px] "
                    id="checkbox"
                    type="checkbox"
                  />
                  <label className=" ms-2" htmlFor="">
                    Remember me
                  </label>
                </div>
                <div className="remamber_me_forgot_pass">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
              </div>
              <div className="btn-parent">
                <button type="submit">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogIn;
