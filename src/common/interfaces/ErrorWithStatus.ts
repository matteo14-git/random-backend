export class ErrorWithStatus extends Error {
  constructor(message?: string) {
    if (typeof message === 'string') {
      super(message);
      return;
    }
    super();
  }
  status?: number;
  stack?: string;
}
