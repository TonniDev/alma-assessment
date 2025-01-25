import { IAxiosService } from '@lib/Network/types';
import { AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { axiosInstance as axiosClient } from './axios.instance';

export class AxiosService<ResponseFormat, PayloadFormat = unknown, ParamsFormat = Record<string, unknown>>
  implements IAxiosService<ResponseFormat, PayloadFormat, ParamsFormat>
{
  constructor(readonly axiosInstance: AxiosInstance = axiosClient) {
    this.axiosInstance = axiosInstance;
  }

  getDefaultHeaders(): AxiosRequestHeaders {
    return new AxiosHeaders({
      'Content-Type': 'application/json',
    });
  }

  async get<Response extends AxiosResponse<ResponseFormat> = AxiosResponse<ResponseFormat>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    return await this.axiosInstance.get(url, {
      headers: this.getDefaultHeaders(),
      ...config,
    });
  }

  async post<
    Payload extends PayloadFormat | undefined = PayloadFormat,
    Response extends AxiosResponse<ResponseFormat> = AxiosResponse<ResponseFormat>,
  >(url: string, config?: AxiosRequestConfig<Payload>): Promise<Response> {
    return await this.axiosInstance.post(url, config?.data, {
      headers: this.getDefaultHeaders(),
      ...config,
    });
  }

  async put<
    Payload extends PayloadFormat | undefined = PayloadFormat,
    Response extends AxiosResponse<ResponseFormat> = AxiosResponse<ResponseFormat>,
  >(url: string, config?: AxiosRequestConfig<Payload>): Promise<Response> {
    return await this.axiosInstance.put(url, config?.data, {
      headers: this.getDefaultHeaders(),
      ...config,
    });
  }

  async patch<
    Payload extends PayloadFormat | undefined = PayloadFormat,
    Response extends AxiosResponse<ResponseFormat> = AxiosResponse<ResponseFormat>,
  >(url: string, config?: AxiosRequestConfig<Payload>): Promise<Response> {
    return await this.axiosInstance.patch(url, config?.data, {
      headers: this.getDefaultHeaders(),
      ...config,
    });
  }

  async delete<Response extends AxiosResponse<ResponseFormat> = AxiosResponse<ResponseFormat>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Response> {
    return await this.axiosInstance.delete(url, {
      headers: this.getDefaultHeaders(),
      ...config,
    });
  }
}
