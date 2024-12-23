import { create } from "zustand";

type State = {
  isOpen: boolean;
  typeSolution: "all" | "responded" | "no-feedback";
  challengeOfSolution: number[];
};

type Action = {
  setIsOpen: (value: boolean) => void;
  setTypeSolution: (value: "all" | "responded" | "no-feedback") => void;
  setChallengeOfSolution: (value: number[]) => void;
  resetInitialValue: () => void;
};

const initialValue: State = {
  isOpen: false,
  typeSolution: "all",
  challengeOfSolution: [],
};

const useDrawerFilterSolutionFeedback = create<State & Action>((set, get) => ({
  ...initialValue,
  setIsOpen: (value) => set({ isOpen: value }),
  setTypeSolution: (value) => set({ typeSolution: value }),
  setChallengeOfSolution: (value) => set({ challengeOfSolution: value }),
  resetInitialValue: () =>
    set({ ...initialValue, typeSolution: get().typeSolution }),
}));

export default useDrawerFilterSolutionFeedback;
