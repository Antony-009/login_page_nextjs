"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import styled, { keyframes } from "styled-components";
import { FiMail, FiLock } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Successful!");
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <StyledWrapper>
      <motion.div
        className="outer-background"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="card"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <form className="form" onSubmit={handleSignup}>
            <p id="heading">Sign Up</p>

            <div className="field">
              <FiMail className="icon" />
              <input
                type="email"
                className="input-field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <FiLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>

            {errorMessage && <p className="error">{errorMessage}</p>}

            <div className="btn">
              <button className="button1" type="submit">
                Sign Up
              </button>
              <button
                className="button2"
                type="button"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </StyledWrapper>
  );
}

// ✅ Styled Components (TSX)
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledWrapper = styled.div`
  .outer-background {
    background: linear-gradient(135deg, #1a1a1a, #000000);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .card {
    background: linear-gradient(135deg, #00ff75, #3700ff);
    border-radius: 22px;
    padding: 3px;
    animation: ${fadeIn} 0.5s ease-in-out;
    box-shadow: 0px 0px 30px rgba(0, 255, 117, 0.3);
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 2em;
    background: #171717;
    border-radius: 20px;
    width: 300px;
  }

  #heading {
    text-align: center;
    margin: 1em 0;
    color: rgb(0, 255, 200);
    font-size: 1.5em;
    font-weight: bold;
  }

  .field {
    display: flex;
    align-items: center;
    gap: 0.5em;
    border-radius: 25px;
    padding: 0.8em;
    background-color: #1f1f1f;
    box-shadow: inset 2px 5px 10px rgba(5, 5, 5, 0.5);
    position: relative;
  }

  .icon {
    color: rgb(0, 255, 200);
    font-size: 1.2em;
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: rgb(0, 255, 200);
    font-size: 1em;
  }

  .toggle-visibility {
    position: absolute;
    right: 1em;
    cursor: pointer;
    color: rgb(0, 255, 200);
    transition: transform 0.3s;
  }

  .toggle-visibility:hover {
    transform: scale(1.2);
    color: #ff0000;
  }

  .btn {
    display: flex;
    justify-content: center;
    margin-top: 2em;
    gap: 1em;
  }

  .button1, .button2 {
    padding: 0.8em 1.5em;
    border-radius: 25px;
    border: none;
    transition: all 0.4s ease-in-out;
    background: linear-gradient(135deg, #00ff75, #3700ff);
    color: #000;
    font-weight: bold;
    cursor: pointer;
  }

  .button1:hover, .button2:hover {
    background: linear-gradient(135deg, #00642f, #13034b);
    color: rgb(0, 255, 200);
    transform: translateY(-2px);
  }

  .error {
    color: #ff0000;
    text-align: center;
    margin-top: 1em;
    font-size: 0.9em;
  }
`;