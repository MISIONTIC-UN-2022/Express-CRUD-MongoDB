const TYPES = {
  SERVER: 'server',
  CLIENT: 'client',
  UN_AUTHORIZED: 'un-authorized',
  TOKEN_EXPIRED: 'token-expired',
  NOT_FOUND: 'not-found',
};

class ServerError extends Error {
  constructor(message) {
    super();

    this.name = this.constructor.name;
    this.message = message;
    this.type = TYPES.SERVER;
    this.statusCode = 500;

    if (this instanceof ClientError) {
      this.type = TYPES.CLIENT;
      this.statusCode = 400;
    } else if (this instanceof UnAuthorizedError) {
      this.type = TYPES.UN_AUTHORIZED;
      this.statusCode = 401;
    } else if (this instanceof TokenExpiredError) {
      this.type = TYPES.TOKEN_EXPIRED;
      this.statusCode = 403;
    } else if (this instanceof NotFoundError) {
      this.type = TYPES.NOT_FOUND;
      this.statusCode = 404;
    }
  }
}

class ClientError extends ServerError {}
class NotFoundError extends ServerError {}
class TokenExpiredError extends ServerError {}
class UnAuthorizedError extends ServerError {}

export { ClientError, NotFoundError, TokenExpiredError, UnAuthorizedError };
