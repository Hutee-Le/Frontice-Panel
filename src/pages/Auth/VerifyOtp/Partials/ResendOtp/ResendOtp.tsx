import { Button, notification } from "antd";
import { FC, useState } from "react";

interface IResendOtpProps {
  emailResend: string;
}
const ResendOtp: FC<IResendOtpProps> = ({}) => {
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const handleResendOtp = () => {
    if (isResendDisabled) return;
    notification.success({ message: "Mã OTP đã được gửi lại!" });
    setIsResendDisabled(true);

    let timer = countdown;
    const interval = setInterval(() => {
      if (timer > 0) {
        setCountdown((prev) => prev - 1);
      } else {
        clearInterval(interval);
        setIsResendDisabled(false);
        setCountdown(30);
      }
    }, 1000);
  };
  return (
    <div style={{ marginTop: "10px", textAlign: "center" }}>
      <Button type="link" onClick={handleResendOtp} disabled={isResendDisabled}>
        {isResendDisabled ? `Gửi lại mã trong ${countdown}s` : "Gửi lại mã"}
      </Button>
    </div>
  );
};

export default ResendOtp;
