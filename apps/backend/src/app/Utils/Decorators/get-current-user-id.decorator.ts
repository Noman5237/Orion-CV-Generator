import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): number => {
    const req = context.switchToHttp().getRequest();
    //console.log('req.user: ', req.user);
    return req.user['sub'];
  }
);
