import { UseAfter } from '@yunflyjs/yunfly';
import type { IResponseType } from '../types';
import { handleResponseType } from './handle';

export const ResponseType = function (type: IResponseType) {
  return UseAfter(handleResponseType(type, true));
};
