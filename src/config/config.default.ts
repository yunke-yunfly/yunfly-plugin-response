import type { Config } from '@yunflyjs/yunfly';
import type { ResponseConfig } from '../types';

/**
 *
 * @export
 * @param {KoaApp} app
 * @returns
 */
export default function config(): Config {
  const config: Config & { response?: ResponseConfig } = {};

  // response config
  config.response = {
    enable: true,
  };

  return config;
}
