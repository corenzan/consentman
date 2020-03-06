export enum Policy {
  Undefined = "undefined",
  Allow = "allow",
  Deny = "deny"
}

export interface Policies {
  [key: string]: Policy;
}
