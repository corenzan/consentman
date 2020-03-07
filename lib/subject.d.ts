import { Entry } from "./entry";
export declare enum State {
    Idle = "idle",
    Allowed = "allowed",
    Skipped = "skipped",
    Blocked = "blocked"
}
export declare type Callback = (state: State) => void;
export declare class Subject {
    name: string;
    state: State;
    callback: Callback;
    constructor(name: string, callback: Callback);
    update(entry: Entry): void;
}
