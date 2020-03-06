import { Policy } from "./policy";
export declare enum States {
    Idle = "idle",
    Installed = "installed",
    Skipped = "skipped",
    Removed = "removed"
}
export declare class Module {
    policy: string;
    state: States;
    callbacks: {
        install: () => null;
        remove: () => null;
        skip: () => null;
    };
    install(): void;
    remove(): void;
    skip(): void;
    update(policy: Policy): void;
}
