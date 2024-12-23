import { useNavigate } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Slider,
  Switch,
  UploadProps,
  FormProps,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import { FC, useState } from "react";
import Title from "antd/es/typography/Title";
import { toast } from "react-toastify";
import challengeManagerService from "../../../../service/ChallengeManager/challengeManagerService";
import { ICreateChallengeRequest } from "../../../../types/request/challenge";
import useUploadChallengePageLogic from "./uploadChallengePage.logic";
import constantRoutesChallengeManager from "../../../../constants/routes/challengeManager";

const { TextArea } = Input;

const ChallengeUploadPage: FC = () => {
  const navigate = useNavigate();
  const [sourcePath, setSourcePath] = useState<string | null>(null);
  const [figmaPath, setFigmaPath] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [_, setTechnicalList] = useState<string[]>([]);
  const [plusPoint, setPlusPoint] = useState<number>(0);
  const normFile = (e: any) => {
    console.log(e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const { mutationCreateChallenge } = useUploadChallengePageLogic({});

  const propsDraggerSource: UploadProps = {
    name: "file",
    listType: "picture",
    maxCount: 1,
    customRequest: async ({ file, onSuccess, onError }) => {
      if (file) {
        return toast.promise(
          challengeManagerService.challenge
            .uploadSource({
              source: file as File,
            })
            .then((response) => {
              if (response.data.path) {
                setSourcePath(response.data.path);
                onSuccess && onSuccess(response.data.path);
                return;
              }

              toast.error("Không tìm thấy đường dẫn thư mục cung cấp đăng tải");
            })
            .catch((error) => {
              onError && onError(error);
              throw error;
            }),
          {
            pending: "Đang thực hiện đăng tải thư mục cung cấp",
            success: "Đăng tải thư mục cung cấp thành công",
            error: "Đăng tải thư mục cung cấp thất bại",
          },
        );
      }
    },
    accept: ".zip",
    // onChange: async (info) => {
    // },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    onRemove: async () => {
      if (sourcePath) {
        return toast.promise(
          challengeManagerService.challenge
            .deleteFile({
              path: [sourcePath],
            })
            .then(() => {
              setSourcePath(null);
            }),
          {
            pending: "Đang thực hiện xóa thư mục cung cấp",
            success: "Xóa thư mục cung cấp thành công",
            error: "Xóa thư mục cung cấp thất bại",
          },
        );
      }

      return;
    },
  };

  const propsDraggerFigma: UploadProps = {
    name: "file",
    maxCount: 1,
    listType: "picture",
    customRequest: async ({ file, onSuccess, onError }) => {
      if (file) {
        return toast.promise(
          challengeManagerService.challenge
            .uploadFigma({
              figma: file as File,
            })
            .then((response) => {
              if (response.data.path) {
                setFigmaPath(response.data.path);
                onSuccess && onSuccess(response.data.path);
                return;
              }

              toast.error("Không tìm thấy đường dẫn file thiết kế đăng tải");
            })
            .catch((error) => {
              onError && onError(error);
              throw error;
            }),
          {
            pending: "Đang thực hiện đăng tải file thiết kế",
            success: "Đăng tải file thiết kế thành công",
            error: "Đăng tải file thiết kế thất bại",
          },
        );
      }
    },
    accept: ".zip",
    onRemove: async () => {
      if (figmaPath) {
        return toast.promise(
          challengeManagerService.challenge
            .deleteFile({
              path: [figmaPath],
            })
            .then(() => {
              setFigmaPath(null);
              return;
            }),
          {
            pending: "Đang thực hiện xóa file thiết kế",
            success: "Xóa file thiết kế thành công",
            error: "Xóa file thiết kế thất bại",
          },
        );
      }

      return;
    },
    // onChange: async (info) => {
    // },
  };

  const propsDraggerImage: UploadProps = {
    name: "file",
    maxCount: 1,
    listType: "picture",
    customRequest: async ({ file, onSuccess, onError }) => {
      if (file) {
        return toast.promise(
          challengeManagerService.challenge
            .uploadImage({
              image: file as File,
            })
            .then((response) => {
              if (response.data.path) {
                setImagePath(response.data.path);
                onSuccess && onSuccess(response.data.path);
                return;
              }

              toast.error(
                "Không tìm thấy đường dẫn ảnh bìa thử thách đăng tải",
              );
            })
            .catch((error) => {
              onError && onError(error);
              throw error;
            }),
          {
            pending: "Đang thực hiện đăng tải ảnh bìa thử thách",
            success: "Đăng tải file ảnh bìa thử thách",
            error: "Đăng tải ảnh bìa thử thách thất bại",
          },
        );
      }
    },
    accept: ".jpg, .png, .webp",
    onRemove: async () => {
      if (imagePath) {
        return toast.promise(
          challengeManagerService.challenge
            .deleteFile({
              path: [imagePath],
            })
            .then(() => {
              setImagePath(null);
              return;
            }),
          {
            pending: "Đang thực hiện xóa file thiết kế",
            success: "Xóa file thiết kế thành công",
            error: "Xóa file thiết kế thất bại",
          },
        );
      }

      return;
    },
    // onChange: async (info) => {
    // },
  };

  const handleSubmit: FormProps<ICreateChallengeRequest>["onFinish"] = (
    formValue,
  ) => {
    formValue.source = sourcePath as string;
    formValue.figma = figmaPath as string;
    formValue.image = imagePath as string;
    formValue.desc = "{}";

    console.log("submit create challenge: ", formValue);
    toast.promise(
      mutationCreateChallenge.mutateAsync(formValue).then(() => {
        navigate(`/${constantRoutesChallengeManager.pages.challenges.root}`);
      }),
      {
        pending: "Đang thực hiện đăng tải thử thách...",
        success: "Đăng tải thử thách thất bại",
        error: "Đăng tải thử thách thành công",
      },
    );
  };

  return (
    <>
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Title
          style={{ textAlign: "center", width: "100%", marginBottom: "32px" }}
        >
          Tạo thử thách
        </Title>
        <Flex justify="space-between" align="stretch" gap={24}>
          <Form.Item<ICreateChallengeRequest>
            name="title"
            rules={[
              {
                required: true,
                message: "Tên thử thách không được bỏ trống !",
              },
            ]}
            label="Tiêu đề thử thách"
            style={{ flex: "1" }}
          >
            <Input placeholder="Nhập tiêu đề thử thách" />
          </Form.Item>
          <Form.Item<ICreateChallengeRequest>
            label="Premium"
            name="premium"
            initialValue={isPremium}
            valuePropName="checked"
          >
            <Switch
              value={isPremium}
              onChange={(checkedValue) => setIsPremium(checkedValue)}
            />
          </Form.Item>
        </Flex>
        <Flex justify="space-between" align="stretch" gap={24}>
          <Form.Item<ICreateChallengeRequest>
            name="technical"
            rules={[
              {
                required: true,
                message: "Công nghệ sử dụng không được để trống",
              },
            ]}
            label="Công nghệ sử dụng"
            style={{ flex: "2" }}
          >
            <Select
              mode="tags"
              tokenSeparators={[","]}
              placeholder="Chọn các công nghệ sử dụng cho thử thách"
              onChange={(value) => setTechnicalList(value)}
            >
              <Select.Option value="html">HTML</Select.Option>
              <Select.Option value="css">CSS</Select.Option>
              <Select.Option value="javascript">Javascript</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<ICreateChallengeRequest>
            name="level_id"
            rules={[{ required: true, message: "Cấp độ không được để trống" }]}
            label="Cấp độ thử thách"
            style={{ flex: "1" }}
          >
            <Select placeholder="Chọn cấp độ của thử thách">
              <Select.Option value="1">Người mới</Select.Option>
              <Select.Option value="2">Đồng</Select.Option>
              <Select.Option value="3">Bạc</Select.Option>
              <Select.Option value="4">Vàng</Select.Option>
              <Select.Option value="5">Kim cương</Select.Option>
            </Select>
          </Form.Item>
        </Flex>
        <Form.Item<ICreateChallengeRequest>
          name="point"
          label="Điểm số cộng thêm cho thử thách "
          initialValue={0}
        >
          <Slider
            max={50}
            defaultValue={plusPoint}
            onChange={(value) => setPlusPoint(value)}
          />
        </Form.Item>
        <Form.Item<ICreateChallengeRequest>
          name="short_des"
          label="Mô tả ngắn"
          rules={[
            { required: true, message: "Mô tả ngắn không được bỏ trống" },
          ]}
        >
          <TextArea placeholder="Nhập mô tả ngắn cho thử thách" rows={4} />
        </Form.Item>
        <Form.Item<ICreateChallengeRequest>
          name="source"
          label="Đăng tải thư mục cung cấp thử thách"
          valuePropName="fileList"
          rules={[
            {
              required: !sourcePath,
              message: "Bạn phải đăng tải thư mục cung cấp",
            },
          ]}
          getValueFromEvent={normFile}
        >
          <Dragger {...propsDraggerSource}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item<ICreateChallengeRequest>
          getValueFromEvent={normFile}
          name="figma"
          rules={[
            {
              required: !figmaPath,
              message: "Bạn phải đăng tải file thiết kế",
            },
          ]}
          label="Đăng tải file thiết kế của thử thách"
          valuePropName="fileList"
        >
          <Dragger {...propsDraggerFigma}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item<ICreateChallengeRequest>
          getValueFromEvent={normFile}
          name="image"
          label="Đăng tải hình ảnh thử thách"
          valuePropName="fileList"
          rules={[
            {
              required: !imagePath,
              message: "Bạn phải đăng tải hình ảnh của thứ thách,",
            },
          ]}
        >
          <Dragger {...propsDraggerImage}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Form.Item>

        <Flex justify="stretch" align="stretch" gap={12}>
          <Button
            type="primary"
            style={{ flex: "2" }}
            size="large"
            htmlType="submit"
          >
            Đăng tải
          </Button>
          <Button
            variant="dashed"
            color="danger"
            style={{ flex: "1" }}
            size="large"
            onClick={() =>
              Modal.confirm({
                title: "Xác nhận thoát",
                content:
                  "Khi thoát bạn các dữ liệu sẽ được gỡ bỏ khỏi hệ thống",
                okText: "Chấp nhận",
                cancelText: "Hủy bỏ",
                onOk: async () => {
                  if (
                    imagePath !== null ||
                    sourcePath !== null ||
                    figmaPath !== null
                  ) {
                    return toast.promise(
                      challengeManagerService.challenge
                        .deleteFile({
                          path: [
                            imagePath as string,
                            sourcePath as string,
                            figmaPath as string,
                          ],
                        })
                        .then(() => {
                          setImagePath(null);
                          setSourcePath(null);
                          setFigmaPath(null);
                          return navigate(-1);
                        })
                        .catch((error) => {
                          console.log(error);
                        }),
                      {
                        pending: "Đang thực hiện hủy bỏ",
                        success: "Hủy bỏ thành công",
                        error: "Hủy bỏ thất bại",
                      },
                    );
                  }

                  navigate(-1);
                },
              })
            }
          >
            Quay lại
          </Button>
        </Flex>
      </Form>
    </>
  );
};

export default ChallengeUploadPage;
