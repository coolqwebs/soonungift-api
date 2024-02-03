declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      JWT_ACCESS_EXPIRE: string;
      JWT_REFRESH_EXPIRE: string;
      ENV?: 'test' | 'dev' | 'prod';
    }
  }
}

export {};
