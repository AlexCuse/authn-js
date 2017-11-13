import { SessionStore } from "./types";

export default class MemorySessionStore implements SessionStore {
  private session: string | undefined;

  read() {
    return this.session;
  }

  update(val: string) {
    this.session = val;
  }

  delete() {
    this.session = undefined;
  }
}
