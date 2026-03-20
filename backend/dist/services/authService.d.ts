import { RegisterRequest, LoginRequest, IUser } from "../types";
export declare const registerUser: ({ name, email, password, }: RegisterRequest) => Promise<Pick<IUser, "_id" | "name" | "email">>;
export declare const logoutUser: (token: string) => Promise<{
    message: string;
}>;
export declare const loginUser: ({ email, password }: LoginRequest) => Promise<{
    token: string;
    user: {
        _id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
    };
}>;
//# sourceMappingURL=authService.d.ts.map