import { ITaskEntity } from "./task";

export type ITaskSolutionEntity = {
  id: string;
  taskee: {
    username: string;
    firstname: string;
    lastname: string;
    image: string;
    gold_account: boolean;
    url: string;
  };
  task: Pick<
    ITaskEntity,
    "id" | "title" | "owner" | "technical" | "image" | "requiredPoint"
  >;
  title: string;
  github: string;
  liveGithub: string;
  submitedAt: number;
  status: string;
};
