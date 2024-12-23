import { create } from "zustand";
import { ITypeOfChallenges } from "../../types/other/challenge";

type State = {
  isOpen: boolean;
  typeOfChallenges: ITypeOfChallenges;
  timeCreated: number[] | null;
  technical: string[] | null;
  level: number[] | null;
  point: number[] | null;
  owners: string[] | null;
  premium: boolean;
};

type Action = {
  openDrawerFilter: () => void;
  closeDrawerFilter: () => void;
  changeTypeOfChallenge: (value: ITypeOfChallenges) => void;
  getAllFilterValue: () => Omit<State, "isOpen">;
  setTechnical: (technical: string[]) => void;
  setTimeCreated: (timeCreated: number[]) => void;
  setLevel: (levels: number[]) => void;
  setPoint: (pointValue: number[] | null) => void;
  setOwners: (owners: string[]) => void;
  setPremium: (value: boolean) => void;
  clearFilter: () => void;
};

const initialState: State = {
  isOpen: false,
  typeOfChallenges: "all_challenges",
  technical: null,
  point: null,
  owners: null,
  level: null,
  timeCreated: null,
  premium: false,
};

const useDrawerChallengesFilterStore = create<State & Action>((set, get) => ({
  ...initialState,
  openDrawerFilter: () => {
    set(() => ({
      isOpen: true,
    }));
  },
  closeDrawerFilter: () => {
    set(() => ({
      isOpen: false,
    }));
  },
  changeTypeOfChallenge: (value) => {
    set(() => ({
      typeOfChallenges: value,
    }));
  },
  setPremium: (value) => {
    set(() => ({
      premium: value,
    }));
  },

  clearFilter: () => {
    const stateOpenDrawer = get().isOpen;
    const typeOfChallenges = get().typeOfChallenges;
    set(() => ({
      ...initialState,
      isOpen: stateOpenDrawer,
      typeOfChallenges: typeOfChallenges,
    }));
  },

  getAllFilterValue: () => {
    const typeOfChallenges = get().typeOfChallenges;
    const technical = get().technical;
    const point = get().point;
    const owners = get().owners;
    const level = get().level;
    const timeCreated = get().timeCreated;
    const premium = get().premium;

    return {
      typeOfChallenges,
      technical,
      point,
      owners,
      level,
      timeCreated,
      premium,
    };
  },

  setTechnical: (technicalList) => {
    set(() => ({
      technical: technicalList,
    }));
  },

  setLevel: (levels) => {
    set(() => ({
      level: levels,
    }));
  },

  setPoint: (points) => {
    set(() => ({
      point: points,
    }));
  },

  setOwners: (owners) => {
    set(() => ({
      owners: owners,
    }));
  },

  setTimeCreated: (timeCreated) => {
    set(() => ({
      timeCreated: timeCreated,
    }));
  },
}));

export default useDrawerChallengesFilterStore;
