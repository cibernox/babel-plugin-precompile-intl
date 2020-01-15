import { plural } from 'helpers';

export default {
  nearby: "Find places near your location",
  kilometer: (count) =>`${count} ${plural(count,{1: "kilometer", other: "kilometers"})}`
};
