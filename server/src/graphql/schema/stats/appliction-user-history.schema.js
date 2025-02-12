const types = `#graphql
    scalar Date
    type UserActiveHistoryObject {
        totalRequestsToday: Int!
        totalUsers: Int!
        newUsers: Int!
        adminCount: Int!
        date: Date!
    }

    type UserActiveHistoryData {
        data: [UserActiveHistoryObject]!
    }
`;
const query = `#graphql
        getUserActiveHistory(duration: Int!): UserActiveHistoryData
`;
const getUserActiveHistory={types,query}
export default getUserActiveHistory;
