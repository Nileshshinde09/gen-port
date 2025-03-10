export interface UserType{
    _id: string;
    username: string;
    email: string;
    fullName: string;
    gender: "male"|"female"|"other";
    avatarUrl: string;
    bio:  string;
    isAdmin: boolean;
    isGuest: boolean;
    guestExpiresAt: string;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    blockStatus: {
      isBlocked: false,
    },
    status: "active"|"inactive",
}