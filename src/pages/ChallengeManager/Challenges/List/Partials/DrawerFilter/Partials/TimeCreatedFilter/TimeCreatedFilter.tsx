import { FC, useState } from "react";
import { BoxFilter } from "../BoxFilter";
import { DatePicker, Select } from "antd";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import useDrawerChallengesFilterStore from "../../../../../../../../store/DrawerChallengesFilter/DrawerChallengesFilterStore";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

interface ITimeCreatedFilterProps {
  isLoading: boolean;
  minDate: number;
  maxDate: number;
}

dayjs.extend(utc);

const optionSelectTimeCreated = [
  { label: "Thời gian cụ thể", value: 1, disabled: true },
  { label: "Trong khoảng", value: 2 },
];

const TimeCreatedFilter: FC<ITimeCreatedFilterProps> = ({
  isLoading,
  minDate,
  maxDate,
}) => {
  const [optionTimePicker, setOptionTimePicker] = useState<number>(2);

  const setTimeCreatedFilter = useDrawerChallengesFilterStore(
    (state) => state.setTimeCreated,
  );
  const timeCreated = useDrawerChallengesFilterStore(
    (state) => state.timeCreated,
  );

  const handleChangeRangePicker: RangePickerProps["onChange"] = (dates) => {
    if (dates) {
      const [start, end] = dates;
      const startTimestamp = start?.startOf("day").unix() || null;
      const endTimestamp = end?.endOf("day").unix() || null;

      if (startTimestamp && endTimestamp) {
        setTimeCreatedFilter([startTimestamp, endTimestamp]);
      }
    }
  };

  const handleChangeDatePicker: DatePickerProps["onChange"] = (date) => {
    if (date) {
      const timestamp = date.valueOf();
      setTimeCreatedFilter([timestamp]);
    }
  };

  const disabledDateConfig: DatePickerProps["disabledDate"] = (current) => {
    if (!current) return false;
    const minTime = dayjs.unix(minDate).utc(true).startOf("day").valueOf();
    const maxTime = dayjs.unix(maxDate).utc(true).endOf("day").valueOf();

    // So sánh current với min và max
    const currentTime = current.valueOf();
    return currentTime < minTime || currentTime > maxTime;
  };

  return (
    <BoxFilter isLoading={isLoading} nameFilter="Thời gian đăng tải">
      <Select
        defaultValue={optionTimePicker}
        style={{ width: "100%" }}
        value={optionTimePicker}
        onChange={(value) => setOptionTimePicker(value)}
        options={optionSelectTimeCreated}
      />
      {optionTimePicker === 2 && (
        <DatePicker.RangePicker
          format={"DD-MM-YYYY"}
          onChange={handleChangeRangePicker}
          placement="bottomRight"
          disabledDate={disabledDateConfig}
          value={
            timeCreated?.length === 2
              ? [dayjs(timeCreated[0] * 1000), dayjs(timeCreated[1] * 1000)]
              : null
          }
        />
      )}
      {optionTimePicker === 1 && (
        <DatePicker
          onChange={handleChangeDatePicker}
          disabledDate={disabledDateConfig}
          format={"DD-MM-YYYY"}
          placement="bottomRight"
        />
      )}
    </BoxFilter>
  );
};

export default TimeCreatedFilter;
