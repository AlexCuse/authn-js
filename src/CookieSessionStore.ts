import { SessionStore } from "./types";

export interface CookieSessionStoreOptions {
  path?: string;
  sameSite?: "Lax" | "Strict" | "None";
  ttlSeconds?: number | undefined;
}

export default class CookieSessionStore implements SessionStore {
  private readonly sessionName: string;
  private readonly secureFlag: string;
  private readonly path: string;
  private readonly sameSite: string;
  private readonly ttlSeconds: number | undefined;

  constructor(cookieName: string, opts: CookieSessionStoreOptions = {}) {
    this.sessionName = cookieName;

    this.path = !!opts.path ? `; path=${opts.path}` : "";
    this.sameSite = !!opts.sameSite ? `; SameSite=${opts.sameSite}` : "";
    this.ttlSeconds = opts.ttlSeconds;

    if (typeof window !== "undefined") {
      this.secureFlag = window.location.protocol === "https:" ? "; secure" : "";
    }
  }

  read(): string | undefined {
    if (typeof document !== "undefined") {
      return document.cookie.replace(
        new RegExp(
          `(?:(?:^|.*;\\\s*)${this.sessionName}\\\s*\\\=\\\s*([^;]*).*$)|^.*$`
        ),
        "$1"
      );
    }
  }

  update(val: string) {
    if (typeof document !== "undefined") {
      let expires = "";
      if (!!this.ttlSeconds) {
        const exp = new Date();
        exp.setTime(exp.getTime() + this.ttlSeconds);
        expires = `; expires=${exp.toUTCString()}`;
      }
      document.cookie = `${this.sessionName}=${val}${this.secureFlag}${expires}${this.path}${this.sameSite}`;
    }
  }

  delete() {
    if (typeof document !== "undefined") {
      document.cookie =
        this.sessionName + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
  }
}
