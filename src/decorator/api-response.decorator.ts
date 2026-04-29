import { ApiOkResponse } from '@nestjs/swagger';
import { ClassConstructor } from '../interceptors/serialize.interceptor';
import { applyDecorators } from '@nestjs/common';

export const ApiResponse = ({
  dto,
  isArray = false,
}: {
  dto: ClassConstructor;
  isArray?: boolean;
}) => {
  // We cannot return a decorator using @ inside a function, so to create a reusable decorator we must use applyDecorators;
  return applyDecorators(
    ApiOkResponse({
      type: dto,
      isArray: isArray,
    }),
  );
};