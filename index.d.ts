declare global {
  namespace Express {
    interface Request {
      userId: string;
      sessionId: string;
    }
  }
}

export {};

declare global {
  namespace axios {
    interface AxiosResponse {
      responseStatus: number;
    }
  }
}

export {}