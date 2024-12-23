import axiosClient from "../../../axios/axiosClient";
import constantTaskerApi from "../../../constants/api/tasker";
import {
  IDeleteFilesTaskRequest,
  IUploadFigmaTaskRequest,
  IUploadImageTaskRequest,
  IUploadSourceTaskRequest,
} from "../../../types/request/tasker/upload";
import { IUploadTaskService } from "../../../types/services/tasker/upload";

const uploadService: IUploadTaskService = {
  image: (data: IUploadImageTaskRequest) => {
    const { image } = data;
    const formData = new FormData();
    formData.append("image", image);
    return axiosClient.post(constantTaskerApi.upload.image, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  source: (data: IUploadSourceTaskRequest) => {
    const { source } = data;
    const formData = new FormData();
    formData.append("source", source);
    return axiosClient.post(constantTaskerApi.upload.source, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  figma: (data: IUploadFigmaTaskRequest) => {
    const { figma } = data;
    const formData = new FormData();
    formData.append("figma", figma);
    return axiosClient.post(constantTaskerApi.upload.figma, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteFiles: (data: IDeleteFilesTaskRequest) => {
    return axiosClient.delete(constantTaskerApi.upload.delete, {
      data,
    });
  },
};

export default uploadService;
