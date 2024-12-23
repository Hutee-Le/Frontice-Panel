export type IGetAllRequestApproveTaskerParams = {
  page?: string | number;
  perPage?: string | number;
};

export type IApproveTaskerRequest = {
  tasker_id: string;
};

export type IRemoveTaskerParams = {
  tasker_id: string;
};
