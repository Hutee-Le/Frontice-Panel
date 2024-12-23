import { DescriptionsProps } from "antd";
import { ISubscriptionEntity } from "../../../../types/entity/subscription";
import { formatCurrencyVND } from "../../../../utils/helper";
import { convertTimestampToVietnamTime } from "../../../../utils/convertTime";

const generateItemsDescriptionSubscription: (
  subscriptionData: ISubscriptionEntity,
) => DescriptionsProps["items"] = (subscriptionData) => {
  return [
    {
      label: "Tên gói",
      key: "name",
      children: subscriptionData.name,
    },
    {
      label: "Loại gói",
      key: "type",
      children:
        subscriptionData.type.split("-")[1] === "monthly"
          ? "Tháng"
          : subscriptionData.type === "monthly"
            ? "Tháng"
            : subscriptionData.type === "yearly"
              ? "Năm"
              : "",
    },
    {
      label: "Giá tiền",
      key: "price",
      children: `${formatCurrencyVND(subscriptionData.price)} VNĐ`,
    },
    {
      label: "Thời gian tạo gói",
      key: "created_at",
      children: convertTimestampToVietnamTime(subscriptionData.created_at),
    },
    {
      label: "Thời gian cập nhật gói",
      key: "updated_at",
      children: convertTimestampToVietnamTime(subscriptionData.updated_at),
    },
  ];
};

export { generateItemsDescriptionSubscription };
