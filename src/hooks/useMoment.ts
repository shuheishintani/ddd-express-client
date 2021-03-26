import moment from "moment";

export const useMoment = () => {
  moment.locale("ja");
  return { moment };
};
