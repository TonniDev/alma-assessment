import { AxiosService } from '@lib/Network/AxiosService';
import { IRequestConfig } from '@lib/Network/types';

export class AssessmentRepository {
  BASE_URL = '/assessment';

  constructor(private readonly networkService: AxiosService<unknown>) {
    this.networkService = networkService;
  }

  async sendAssessment(config: IRequestConfig<FormData>) {
    return await this.networkService.post(this.BASE_URL, {
      headers: { 'Content-Type': 'multipart/form-data', ...config.headers },
      ...config,
    });
  }

  async getAssessments(config?: IRequestConfig) {
    return await this.networkService.get(this.BASE_URL, config);
  }
}
