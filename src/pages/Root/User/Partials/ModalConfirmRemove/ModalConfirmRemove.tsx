import { ModalConfirmRemoveEmployee } from "./Employee";
import { ModalConfirmRemoveTaskee } from "./Taskee";
import { ModalConfirmRemoveTasker } from "./Tasker";

const ModalConfirmRemove = () => {
  return null;
};

ModalConfirmRemove.Employee = ModalConfirmRemoveEmployee;
ModalConfirmRemove.Tasker = ModalConfirmRemoveTasker;
ModalConfirmRemove.Taskee = ModalConfirmRemoveTaskee;

export default ModalConfirmRemove;
