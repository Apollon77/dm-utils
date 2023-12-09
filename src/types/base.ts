import { ActionContext } from "..";
import { ApiVersion, DeviceRefresh, DeviceStatus, RetVal } from "./common";

type ActionType = "api" | "adapter";

export type Color = "primary" | "secondary" | string & {}; // color (you can use primary, secondary or color rgb value or hex)

export interface ActionBase<T extends ActionType> {
    id: string;
    /**
     * This can either be the name of a font awesome icon (e.g. "fa-signal") or the URL to an icon.
     */
    icon: string; // base64 or url
    description?: ioBroker.StringOrTranslated;
    disabled?: T extends "api" ? boolean : never;
    color?: Color;
    backgroundColor?: Color; // background color of button (you can use primary, secondary or color rgb value or hex)
}

export interface InstanceAction<T extends ActionType = "api"> extends ActionBase<T> {
    handler?: T extends "api" ? never : (context: ActionContext) => RetVal<{ refresh: boolean }>;
    title: ioBroker.StringOrTranslated;
}

export interface DeviceAction<T extends ActionType = "api"> extends ActionBase<T> {
    handler?: T extends "api"
        ? never
        : (deviceId: string, context: ActionContext) => RetVal<{ refresh: DeviceRefresh }>;
}

export interface InstanceDetails<T extends ActionType = "api"> {
    apiVersion: ApiVersion;
    actions?: InstanceAction<T>[];
}

export interface DeviceInfo<T extends ActionType = "api"> {
    id: string;
    icon?: string; // base64 or url
    manufacturer?: ioBroker.StringOrTranslated;
    model?: ioBroker.StringOrTranslated;
    color?: Color; // color of name
    backgroundColor?: Color; // background color of card (you can use primary, secondary or color rgb value or hex)
    name: ioBroker.StringOrTranslated;
    status?: DeviceStatus | DeviceStatus[];
    actions?: DeviceAction<T>[];
    hasDetails?: boolean;
}
