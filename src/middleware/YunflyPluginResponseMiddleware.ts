import {Middleware} from '@yunflyjs/yunfly';
import type { KoaMiddlewareInterface} from '@yunflyjs/yunfly';
import { DefaultResponse, handleResponseType } from '../response/handle';
import type { ServiceResponse, Response, IResponseType } from '../types';

@Middleware({ type: 'after' })
export default class YunflyPluginSuccessMiddleware implements KoaMiddlewareInterface {
  async use(context: any, next: (err?: any) => Promise<ServiceResponse>): Promise<ServiceResponse> {

    const responseConfig = context.config.response || {};

    if (!responseConfig.enable || context._yunfly_plugin_response_decorator) {
      return await next();
    }

    if (responseConfig.customResponse && typeof (responseConfig.customResponse) === 'function') {
      return await responseConfig.customResponse(context, next);
    }

    const contentType = context.response.header['content-type'] || '';
    const { response_type = '' }: Response = context.response.body || {};
    const isJsonResponse = ['text/plain', 'application/json'].includes(contentType.split(';')[0]);

    // 'text/plain', 'application/json' special processing, unified as JSON for return.
    if (isJsonResponse && !response_type) {
      DefaultResponse(context, responseConfig);
      return await next();
    }

    if (response_type) {
      return handleResponseType(response_type as IResponseType)(context, next);
    }

    return await next();
  }
}
