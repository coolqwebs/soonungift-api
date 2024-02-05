declare namespace Express {
  interface Request {
    user?: {
      userId: string;
      userEmail: string;
      [key: string]: any;
    };
  }
}
