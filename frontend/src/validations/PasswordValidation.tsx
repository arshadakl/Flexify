import React, { useState, useEffect } from "react";

interface PasswordValidationProps {
  password: string;
  confirmPassword: string;
}

const PasswordValidation: React.FC<PasswordValidationProps> = ({
  password,
  confirmPassword,
}) => {
  const [hasNumber, setHasNumber] = useState<boolean>(false);
  const [hasUppercase, setHasUppercase] = useState<boolean>(false);
  const [hasSpecialChar, setHasSpecialChar] = useState<boolean>(false);
  const [hasLowercase, setHasLowercase] = useState<boolean>(false);

  // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

  const handlePasswordChange = (password: string) => {
    setHasNumber(password.match(/\d/) !== null);
    setHasUppercase(password.match(/[A-Z]/) !== null);
    setHasSpecialChar(password.match(/[\W_]/) !== null);
    setHasLowercase(password.match(/[a-z]/) !== null);
  };

  useEffect(() => {
    handlePasswordChange(password);
  }, [password]);

  return (
    <div className="flex flex-col space-y-2 w-full text-xs">
      <div className="flex items-center space-x-2 w-1/2">
        {hasNumber ? (
          <i className="fa-thin fa-circle-check" style={{ color: "#28f036" }} />

        ) : (
          <i className="fa-sharp fa-thin fa-circle-xmark text-red-700 fa-fade" />
        )}
        <span>Numbers (0-9)</span>
      </div>
      <div className="flex items-center space-x-2 w-1/2">
        {hasUppercase ? (
         <i className="fa-thin fa-circle-check" style={{ color: "#28f036" }} />

        ) : (
          <i className="fa-sharp fa-thin fa-circle-xmark text-red-700 fa-fade" />
        )}
        <span>Uppercase letters (A-Z)</span>
      </div>
      <div className="flex items-center space-x-2">
        {hasSpecialChar ? (
         <i className="fa-thin fa-circle-check" style={{ color: "#28f036" }} />

        ) : (
          <i className="fa-sharp fa-thin fa-circle-xmark text-red-700 fa-fade" />
        )}
        <span> Special characters (!@#$%^&*) </span>
      </div>
      <div className="flex items-center space-x-2">
        {hasLowercase ? (
         <i className="fa-thin fa-circle-check" style={{ color: "#28f036" }} />

        ) : (
          <i className="fa-sharp fa-thin fa-circle-xmark text-red-700 fa-fade" />
        )}
        <span>Lowercase letters (a-z)</span>
      </div>
      {password !== confirmPassword && confirmPassword.length > 0 && (
        <div className="flex items-center space-x-2 text-red-700">
          <i className="fa-sharp fa-thin fa-circle-xmark text-red-700 fa-fade" />

          <span>Passwords do not match</span>
        </div>
      )}
    </div>
  );
};

export default PasswordValidation;
