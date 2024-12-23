import { IBaseResponse } from "../../../base/response";
import { IUploadAvatarFormData } from "../../../request/upload/avatar";
import { IUploadAvatarResponse } from "../../../response/upload/avatar";

type IAvatarService = {
  upload: (
    dataBody: IUploadAvatarFormData,
  ) => Promise<IBaseResponse<IUploadAvatarResponse>>;
};

export default IAvatarService;
