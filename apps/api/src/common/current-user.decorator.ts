import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { findUserById, IUser, USER_ID_HEADER } from '@live/shared';
import { Request } from 'express';

export function resolveCurrentUser(request: Request): IUser {
  const header = request.headers[USER_ID_HEADER];
  const userId = Array.isArray(header) ? header[0] : header;
  const user = userId ? findUserById(userId) : undefined;
  if (!user) {
    throw new UnauthorizedException(`Missing or unknown ${USER_ID_HEADER} header`);
  }
  return user;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): IUser => resolveCurrentUser(context.switchToHttp().getRequest<Request>()),
);
