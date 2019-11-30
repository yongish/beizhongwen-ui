import React from "react";

export const dontMatch = (password, confirmPassword) => {
  return (
    password.length > 0 &&
    password !== confirmPassword && (
      <p style={{color: "red"}}>Passwords do not match</p>
    )
  );
};

export const failPasswordRequirements = password => {
  return (
    password.length > 0 &&
    (password.length < 8 ||
      !password.match(/[a-z]/) ||
      !password.match(/[A-Z]/) ||
      !/\d/.test(password)) && (
      <p style={{color: "red"}}>
        Password must have minimum of 8 characters, including at least 1 upper
        character, 1 lower character, and 1 number.
      </p>
    )
  );
};
