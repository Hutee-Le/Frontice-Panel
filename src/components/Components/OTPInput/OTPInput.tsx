import React, { useState, FC, ClipboardEvent } from "react";
import { Input } from "antd";
import styled from "@emotion/styled";

interface OTPInputProps {
  length?: number; // Số ký tự OTP, mặc định là 6
  value?: string; // Giá trị hiện tại
  onChange?: (value: string) => void; // Callback khi giá trị thay đổi
}

const OTPContainer = styled.div<{ length: number }>`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;

  // Đặt kích thước tối thiểu của ô dựa trên số lượng
  & > input {
    flex: 1 1 calc(100% / ${({ length }) => Math.max(1, length)} - 8px);
    aspect-ratio: 1;
    font-size: 16px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #40a9ff;
      box-shadow: 0 0 4px #40a9ff;
    }
  }
`;

const OTPInput: FC<OTPInputProps> = ({ length = 6, value = "", onChange }) => {
  const [otpValues, setOtpValues] = useState<string[]>(
    value
      .split("")
      .slice(0, length)
      .concat(Array(length - value.length).fill("")),
  );

  const handleChange = (val: string, index: number) => {
    if (!/^[0-9]?$/.test(val)) return;

    const updatedValues = [...otpValues];
    updatedValues[index] = val;

    setOtpValues(updatedValues);

    const newOtpValue = updatedValues.join("");
    onChange?.(newOtpValue);

    if (val && index < length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasteData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;

    const updatedValues = pasteData
      .split("")
      .concat(Array(length - pasteData.length).fill(""));
    setOtpValues(updatedValues);

    const newOtpValue = updatedValues.join("");
    onChange?.(newOtpValue);

    const lastFilledIndex = pasteData.length - 1;
    const nextInput = document.getElementById(
      `otp-input-${Math.min(lastFilledIndex, length - 1)}`,
    );
    nextInput?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <OTPContainer length={length}>
      {otpValues.map((digit, index) => (
        <Input
          key={index}
          id={`otp-input-${index}`}
          value={digit}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, index)}
          onPaste={handlePaste}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </OTPContainer>
  );
};

export default OTPInput;
