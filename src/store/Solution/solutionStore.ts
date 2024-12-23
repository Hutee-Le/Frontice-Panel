import { create } from "zustand";

type State = {
  solutionCount: number;
};

type Action = {
  changeSolutionCount: (count: number) => void;
};

const useSolutionStore = create<State & Action>((set) => ({
  solutionCount: 0,
  changeSolutionCount: (count) => set({ solutionCount: count }),
}));

export default useSolutionStore;
