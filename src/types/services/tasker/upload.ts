import { IBaseResponse } from "../../base/response";
import {
  IDeleteFilesTaskRequest,
  IUploadFigmaTaskRequest,
  IUploadImageTaskRequest,
  IUploadSourceTaskRequest,
} from "../../request/tasker/upload";
import {
  IUploadFigmaTaskResponse,
  IUploadImageTaskResponse,
  IUploadSourceTaskResponse,
} from "../../response/tasker/upload";

export type IUploadTaskService = {
  image: (
    data: IUploadImageTaskRequest,
  ) => Promise<IBaseResponse<IUploadImageTaskResponse>>;
  source: (
    data: IUploadSourceTaskRequest,
  ) => Promise<IBaseResponse<IUploadSourceTaskResponse>>;
  figma: (
    data: IUploadFigmaTaskRequest,
  ) => Promise<IBaseResponse<IUploadFigmaTaskResponse>>;
  deleteFiles: (data: IDeleteFilesTaskRequest) => Promise<IBaseResponse<null>>;
};
