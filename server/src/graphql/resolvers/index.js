import HelloResolver from "./hello.js";
import applicationStats from "./stats/application-user-history.resolvers.js";
import DateScalar from "./scalers/date.js"
import feedback from "./helpdesk/feedback.js";
export const resolvers = {
  Date: DateScalar,
  Query: {
    ...HelloResolver,
    ...applicationStats,
    ...feedback
  },
};
  