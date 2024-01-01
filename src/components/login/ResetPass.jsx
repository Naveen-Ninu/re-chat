import React, { useState } from "react";
import { svgEye } from "../../common/Icons";
import { Link } from "react-router-dom";

const ResetPass = () => {
  const [inputFilds, setInputFilds] = useState({
    password: "",
    Confermpassword: "",
  });
  const [handlePassReveal, sethandlePassReveal] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section
        id="login-page"
        className={`bg-[#243151] min-h-screen  justify-center items-center relative z-10 flex `}>
        <div className=" fixed top-0 z-50 left-0 bg-[#00000071] backdrop-blur-[3px] h-screen w-screen flex justify-center items-center flex-col ">
          <h1 className=" text-white text-[72px] font-inter text-center capitalize w-full font-semibold">
            {" "}
            this service <br /> is currently <br />
            not available
          </h1>
          <h3>
            Back To{" "}
            <Link to="/Signup">
              {" "}
              <span>Sign Up</span>
            </Link>{" "}
            Page or{" "}
            <Link to="/login">
              {" "}
              <span>Sign In</span>
            </Link>{" "}
            Page
          </h3>
        </div>
        <div className="container ">
          <div className=" signup-container pb-20">
            <h2>Forgot Password</h2>
            <h3>
              Don't have an Account ? <span>Sign Up</span>
            </h3>
            <form action="" onSubmit={handleSignUp}>
              {/* email lable */}
              <div className="lable-parent relative">
                {" "}
                <label htmlFor="password">New Password</label>
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
              </div>

              {/* password lable */}
              <div className="lable-parent relative">
                {" "}
                <label htmlFor="password">Confirm Password</label>
                <input
                  className={`${
                    inputFilds.Confermpassword !== inputFilds.password
                      ? "!text-red-600"
                      : ""
                  }`}
                  onChange={(e) =>
                    setInputFilds({
                      ...inputFilds,
                      Confermpassword: e.target.value,
                    })
                  }
                  type={handlePassReveal ? "text" : "password"}
                  value={inputFilds.Confermpassword}
                />
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
              </div>

              <div className="btn-parent">
                <button type="submit">Done</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPass;
