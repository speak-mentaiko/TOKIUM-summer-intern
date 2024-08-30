import { atom } from "recoil";

type routeData = {
  from: string;
  via0: string | null;
  via1: string | null;
  via2: string | null;
  via3: string | null;
  via4: string | null;
  via5: string | null;
  to: string;
  distance: number;
  costs: string;
};

export const routeData = atom<routeData>({
  key: "routeData",
  default: {
    from: "",
    via0: null,
    via1: null,
    via2: null,
    via3: null,
    via4: null,
    via5: null,
    to: "",
    distance: 0,
    costs: "",
  },
});
