import { Flex, Space, Avatar, Button } from "antd";
import { FC, useState } from "react";
import { AvatarMentorChangeModal } from "./Partials/AvatarMentorChangeModal";

interface IAvatarMentorProps {
  currentAvatar: string | null;
}

const AvatarMentor: FC<IAvatarMentorProps> = ({ currentAvatar }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  return (
    <>
      <Flex vertical align="center" gap={12} justify="center">
        <Space
          style={{
            padding: "4px",
            border: "1px solid #bbbbbb",
            borderRadius: "100%",
          }}
        >
          <Avatar
            style={{ flexShrink: "0" }}
            src={
              currentAvatar ||
              "https://img.freepik.com/premium-vector/man-empty-avatar-casual-business-style-vector-photo-placeholder-social-networks-resumes_885953-434.jpg"
            }
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          />
        </Space>
        <Button onClick={() => setIsShowModal(true)}>Đổi ảnh đại diện</Button>
      </Flex>

      <AvatarMentorChangeModal
        isShow={isShowModal}
        currentAvatar={currentAvatar}
        onClose={() => setIsShowModal(false)}
      />
    </>
  );
};

export default AvatarMentor;
