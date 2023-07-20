import { IResponseType } from '../types';

const setOriginalBody = (context: any) => {
  if (!context._yunfly_original_body) {
    context._yunfly_original_body = context.response.body;
  }
};

const getBody = (context: any) => context._yunfly_body || context.response.body;

// html
const HtmlResponse = (context: any) => {
  const body = getBody(context);
  context.response.body = body.data;
  context.set('Content-Type', 'text/html; charset=utf-8');
};

// xml
const XmlResponse = (context: any) => {
  const body = getBody(context);
  context.response.body = body.data;
  context.set('Content-Type', 'text/xml; charset=utf-8');
};


// txt
const TxtResponse = (context: any) => {
  const body = getBody(context);
  context.response.body = body.data;
  context.set('Content-Type', 'text/txt; charset=utf-8');
};

// xlsx
const XlsxResponse = (context: any) => {
  const body = getBody(context);
  context.response.body = body.data;
  context.set('Content-Disposition', `inline;filename=${body.fileName || 'FileName'}.xlsx`);
  context.set('Content-type', 'application/xlsx');
};

// 默认
export const DefaultResponse = (context: any, responseConfig?: any) => {
  if (!responseConfig) {
    responseConfig = context.config.response || {};
  }

  context.set('Content-Type', 'application/json; charset=utf-8');
  const status = context.response.status;
  if (status === 200) {
    context.response.body = {
      code: responseConfig.succCode || 0,
      data: context.response.body,
    };
    return;
  }

  context.status = status;
  context.response.body = context.response.message;
};

// custom
const CustomResponse = (context: any) => {
  const body = getBody(context);
  context.response.body = body.data;
};

// 处理不同格式
export const handleResponseType = (type?: IResponseType, useDecorator?: boolean) => async (context: any, next: (err?: any) => Promise<any>): Promise<any> => {
  setOriginalBody(context);

  switch (type) {
    case IResponseType.txt:
      TxtResponse(context);
      break;
    case IResponseType.html:
      HtmlResponse(context);
      break;
    case IResponseType.xml:
      XmlResponse(context);
      break;
    case IResponseType.xlsx:
      XlsxResponse(context);
      break;
    case IResponseType.custom:
      CustomResponse(context);
      break;
    case IResponseType.json, IResponseType.default:
      DefaultResponse(context);
      break;
    default:
      DefaultResponse(context);
      break;
  }
  if (useDecorator) {
    context._yunfly_plugin_response_decorator = true;
  }
  await next();
};
