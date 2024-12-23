import { FC } from "react";
import { BoxFilter } from "../BoxFilter";
import { Avatar, Badge, Checkbox, CheckboxProps, List } from "antd";
import { IGetFilterInforamtion } from "../../../../../../../../types/response/challenge";
import useAuthStore from "../../../../../../../../store/Auth/authStore";
import useDrawerChallengesFilterStore from "../../../../../../../../store/DrawerChallengesFilter/DrawerChallengesFilterStore";

interface IOwnerFilterProps {
  isLoading: boolean;
  ownersData: IGetFilterInforamtion["owners"];
}

const OwnerFilter: FC<IOwnerFilterProps> = ({ isLoading, ownersData }) => {
  const profile = useAuthStore((state) => state.profile);
  const owners = useDrawerChallengesFilterStore((state) => state.owners);
  const setOwners = useDrawerChallengesFilterStore((state) => state.setOwners);
  const handleChangeOwner: CheckboxProps["onChange"] = (e) => {
    if (e.target.checked) {
      const newOwnersId = [...(owners || []), e.target.value];
      setOwners(newOwnersId);
    } else {
      const newOwnersId = owners?.filter(
        (ownerId) => ownerId !== e.target.value,
      );
      setOwners(newOwnersId || []);
    }
  };

  return (
    <BoxFilter isLoading={isLoading} nameFilter="Người đăng">
      <List
        itemLayout="horizontal"
        dataSource={ownersData}
        renderItem={(item, index) => {
          if (item.id === profile?.id) {
            return (
              <Badge.Ribbon text="Me" color="pink">
                <List.Item style={{ gap: "12px" }}>
                  <Checkbox
                    checked={owners?.includes(item.id)}
                    value={item.id}
                    onChange={handleChangeOwner}
                  />
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                      />
                    }
                    title={item.fullname}
                    description={item.email}
                  />
                </List.Item>
              </Badge.Ribbon>
            );
          }
          return (
            <List.Item style={{ gap: "12px" }}>
              <Checkbox
                checked={owners?.includes(item.id)}
                value={item.id}
                onChange={handleChangeOwner}
              />
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={item.fullname}
                description={item.email}
              />
            </List.Item>
          );
        }}
      />
    </BoxFilter>
  );
};

export default OwnerFilter;
