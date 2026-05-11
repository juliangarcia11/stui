export class TokenResetError extends Error {
  constructor(message?: string) {
    super(message ?? "Token reset detected");
    this.name = "TokenResetError";
  }
}
