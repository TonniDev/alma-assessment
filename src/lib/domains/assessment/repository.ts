import { AxiosService } from '@lib/Network/AxiosService';
import { IRequestConfig } from '@lib/Network/types';

export class AssessmentRepository {
  BASE_URL = '/assessment';

  constructor(private readonly networkService: AxiosService<never>) {
    this.networkService = networkService;
  }

  async sendAssessment(config: IRequestConfig<FormData>): Promise<{ status: number; data: unknown }> {
    const response = await this.networkService.post(this.BASE_URL, {
      headers: { 'Content-Type': 'multipart/form-data', ...config.headers },
      ...config,
    });
    return response.data;
  }

  async getAssessments(config?: IRequestConfig) {
    const response = await this.networkService.get(this.BASE_URL, config);
    return response.data;
  }
}
