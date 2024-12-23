import { useEffect, useState } from "react";
import { Button, Col, Flex, Form, Row, Typography, notification } from "antd";
import { OTPInput } from "../../../components/Components/OTPInput";
import { useLocation, useNavigate } from "react-router";
import { ResendOtp } from "./Partials/ResendOtp";
import { useMutation } from "@tanstack/react-query";
import mutationKey from "../../../constants/mutation";
import authService from "../../../service/authService";
import {
  IVerifyOtpParams,
  IVerifyOtpRequest,
} from "../../../types/request/auth";
import { toast } from "react-toastify";
import constantRoutesAuth from "../../../constants/routes/authentication";

type IParamsMutationVerifyOtp = {
  data: IVerifyOtpRequest;
  params: IVerifyOtpParams;
};

const { Title, Text } = Typography;

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [otp, setOtp] = useState<string>("");

  const location = useLocation();
  const emailVerify = location.state?.emailVerify;

  const handleSubmit = async () => {
    if (otp.length === 6) {
      const paramsMutationVerifyOtp: IParamsMutationVerifyOtp = {
        data: {
          otp,
        },
        params: { emailVerify },
      };
      return toast.promise(
        mutationVerifyOtp.mutateAsync(paramsMutationVerifyOtp).then(() => {
          const newPath = location.pathname.replace(
            constantRoutesAuth.tasker.verifyOtp,
            constantRoutesAuth.tasker.register,
          );
          return navigate(newPath, {
            state: {
              verifyEmailSucceess: true,
              emailRegistration: emailVerify,
            },
          });
        }),
        {
          pending: `Đang thực hiện xác thực OTP: ${otp}`,
          success: `Thực hiện xác thực OTP ${otp} thành công`,
          error: `Thực hiện xác thực OTP ${otp} thất bại`,
        },
      );
    } else {
      notification.error({ message: "Vui lòng nhập đầy đủ mã OTP!" });
    }
  };

  const mutationVerifyOtp = useMutation({
    mutationKey: [mutationKey.verifyOtp],
    mutationFn: async (params: IParamsMutationVerifyOtp) =>
      await authService.verifyOtp(
        { otp: params.data.otp },
        { emailVerify: params.params.emailVerify },
      ),
  });

  useEffect(() => {
    if (!emailVerify) {
      return navigate(-1);
    }
  }, [emailVerify]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Title level={2} style={{ textAlign: "center" }}>
        Xác thực OTP
      </Title>

      <Form form={form} name="otpForm" layout="vertical">
        <Form.Item
          label={
            <Flex vertical align="start" gap={4}>
              <Text>Nhập mã OTP</Text>
              {emailVerify && (
                <Text
                  copyable={{
                    tooltips: ["Sao chép email", "Đã sao chép email"],
                  }}
                >
                  {emailVerify}
                </Text>
              )}
            </Flex>
          }
        >
          <OTPInput length={6} value={otp} onChange={setOtp} />
        </Form.Item>

        <Row gutter={12}>
          <Col span={16}>
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{ width: "100%" }}
              loading={mutationVerifyOtp.isPending}
            >
              Xác thực
            </Button>
          </Col>
          <Col span={8}>
            <Button
              disabled={mutationVerifyOtp.isPending}
              type="default"
              style={{ width: "100%" }}
              onClick={() => navigate(-1)}
            >
              Quay lại
            </Button>
          </Col>
        </Row>

        <ResendOtp emailResend={emailVerify} />
      </Form>
    </div>
  );
};

export default VerifyOtpPage;
