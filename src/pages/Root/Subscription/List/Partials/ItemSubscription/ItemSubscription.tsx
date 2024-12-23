import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Card,
  Descriptions,
  Flex,
  Input,
  InputProps,
  List,
  Modal,
  Typography,
} from 'antd';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import mutationKey from '../../../../../../constants/mutation';
import constantRootQueryKeys from '../../../../../../constants/queryKey/root';
import rootService from '../../../../../../service/Root/RootService';
import { ISubscriptionEntity } from '../../../../../../types/entity/subscription';
import { formatCurrencyVND } from '../../../../../../utils/helper';
import { generateItemsDescriptionSubscription } from '../../list.config';

interface IItemSubscriptionProps {
  subscriptionData: ISubscriptionEntity;
}

const { Title, Text } = Typography;

const ItemSubscription: FC<IItemSubscriptionProps> = ({ subscriptionData }) => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [priceUpdateValue, setPriceUpdateValue] = useState<number>(
    subscriptionData.price
  );
  const mutationUpdatePrice = useMutation({
    mutationKey: [mutationKey.updatePriceSubscription, subscriptionData.id],
    mutationFn: async () =>
      rootService.subscription.updatePrice(
        { subscriptionId: subscriptionData.id },
        { price: priceUpdateValue }
      ),
  });

  const removeNonNumeric = (value: string): string => {
    return value.replace(/[^0-9]/g, '');
  };

  const handleChangePrice: InputProps['onChange'] = (e) => {
    const rawValue = removeNonNumeric(e.target.value);
    const numericValue = parseInt(rawValue, 10);
    setPriceUpdateValue(numericValue);
  };

  const handleOnOkModal = async () => {
    if (priceUpdateValue === subscriptionData.price) {
      return toast.error('Giá tiền thay đổi không được bằng với giá tiền cũ !');
    }

    if (priceUpdateValue < 1000) {
      return toast.error('Giá tiền thay đổi không bé hơn 1.000 VNĐ !');
    }

    return await toast.promise(
      mutationUpdatePrice.mutateAsync().then(() => {
        queryClient.refetchQueries({
          queryKey: [constantRootQueryKeys.subscription.getAllSubscription],
        });
        setShowModal(false);
      }),
      {
        pending: 'Đang thực hiện thay đổi giá',
        success: 'Thay đổi giá thành công',
        error: 'Thay đổi giá thất bại',
      }
    );
  };

  return (
    <>
      <List.Item>
        <Card
          title={
            <Flex justify="space-between" align="center">
              <Title style={{ margin: '0' }} level={5}>
                Gói {subscriptionData.name}
              </Title>
              <Button onClick={() => setShowModal(true)}>
                Thay đổi giá tiền
              </Button>
            </Flex>
          }
        >
          <Descriptions
            items={generateItemsDescriptionSubscription(subscriptionData)}
          />
        </Card>
      </List.Item>

      <Modal
        title={`Thay đổi giá gói ${subscriptionData.name}`}
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleOnOkModal}
        okButtonProps={{ loading: mutationUpdatePrice.isPending }}
        cancelButtonProps={{ disabled: mutationUpdatePrice.isPending }}
        okText="Thay đổi"
        cancelText="Hủy"
      >
        <Flex vertical gap={24}>
          <Flex vertical gap={12}>
            <Text>Giá hiện tại</Text>
            <Input disabled value={formatCurrencyVND(subscriptionData.price)} />
          </Flex>
          <Flex vertical gap={12}>
            <Text>Giá cập nhật</Text>
            <Input
              value={formatCurrencyVND(priceUpdateValue)}
              placeholder="Nhập giá bạn muốn cập nhật"
              onChange={handleChangePrice}
            />
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default ItemSubscription;
