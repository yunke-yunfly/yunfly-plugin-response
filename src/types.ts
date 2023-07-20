import type { Context } from '@yunflyjs/yunfly';

export interface ServiceResponse<T = any> {
  'code': number;
  'data'?: T;
  'error'?: any;
  'error_detail'?: any;
}

export interface Response {
  response_type?: string;
  [propname: string]: any;
}

export enum IResponseType {
  'json' = 'json',
  'txt' = 'txt',
  'html' = 'html',
  'xml' = 'xml',
  'xlsx' = 'xlsx',
  'custom' = 'custom',
  'default' = 'default',
}

export interface ResponseConfig {
  enable: boolean;
  succCode?: number;
  customResponse?: (ctx: Context, next: (err?: any) => Promise<any>) => any;
  [attr: string]: any;
}
