import React from "react";

interface IProps {
  children?: React.ReactNode;
  onPress?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({ children, onPress, type = "button" }: IProps) => {
  return (
    <button
      type={type}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={onPress}
    >
      {children}
    </button>
  );
};

export default Button;
