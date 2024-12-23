export type ICommentEntity = {
  id: string;
  content: string;
  user: {
    username: String;
    firstname: string;
    lastname: string;
    image: string;
    url: string;
  };
  comment_id: string;
  parent_id: string | null;
  left: number;
  right: number;
  task_solution_id: string;
  is_edit: boolean;
  created_at: number;
  replies: number;
};
