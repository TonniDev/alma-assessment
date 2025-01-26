import { AxiosService } from '@lib/Network/AxiosService';
import { IRequestConfig } from '@lib/Network/types';

export class AuthRepository {
  BASE_URL = '/auth';

  constructor(private readonly networkService: AxiosService<never>) {
    this.networkService = networkService;
  }

  async login(config: IRequestConfig): Promise<{ status: number }> {
    return await this.networkService.post(this.BASE_URL, {
      ...config,
    });
  }

  async logout(): Promise<void> {
    const response = await this.networkService.get(`${this.BASE_URL}/logout`);
    return response.data;
  }
}
