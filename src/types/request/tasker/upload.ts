export type IUploadSourceTaskRequest = {
  source: File;
};

export type IUploadFigmaTaskRequest = {
  figma: File;
};

export type IUploadImageTaskRequest = {
  image: File;
};

export type IDeleteFilesTaskRequest = {
  path: string[];
};
