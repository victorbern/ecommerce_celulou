export class AppError extends Error {
    private _message: string;
    private _statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this._statusCode = statusCode;
    }

    get statusCode(): number {
        return this._statusCode;
    }

    get message(): string {
        return this._message;
    }
}