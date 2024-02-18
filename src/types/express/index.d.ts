declare namespace Express {
  interface Request {
    user?: {
      userId: string;
      userEmail: string;
      role: Roles;
      [key: string]: any;
    };
  }
}
