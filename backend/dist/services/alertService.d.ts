import { CreateAlertRequest, IAlert } from "../types";
export declare const getAllAlerts: (page?: number, limit?: number) => Promise<{
    alerts: IAlert[];
    total: number;
}>;
export declare const createAlert: (data: CreateAlertRequest) => Promise<IAlert>;
export declare const toggleRead: (id: string) => Promise<IAlert>;
export declare const markAllRead: () => Promise<any>;
export declare const deleteAlert: (id: string) => Promise<boolean>;
export declare const getReadAlerts: (page?: number, limit?: number) => Promise<{
    alerts: IAlert[];
    total: number;
}>;
export declare const getUnreadAlerts: (page?: number, limit?: number) => Promise<{
    alerts: IAlert[];
    total: number;
}>;
export declare const getExternalAlerts: (page?: number, limit?: number) => Promise<IAlert[]>;
//# sourceMappingURL=alertService.d.ts.map