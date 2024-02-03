declare namespace Express {
  interface Request {
    user?: Record<string, string>;
  }
}
