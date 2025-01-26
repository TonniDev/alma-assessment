import { Leads } from '@lib/definitions';
import { AxiosService } from '@lib/Network/AxiosService';
import { IRequestConfig } from '@lib/Network/types';

export interface AssessmentResponse {
  status: number;
  results: Leads[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface UpdateLeadStatusPayload {
  id: string;
  status: string;
}

export interface IAssessmentRepository {
  sendAssessment(config: IRequestConfig<FormData>): Promise<{ status: number; data: Leads }>;
  getAssessments(config?: IRequestConfig): Promise<AssessmentResponse>;
  changeLeadStatus(config: IRequestConfig<UpdateLeadStatusPayload>): Promise<AssessmentResponse>;
}

export class AssessmentRepository implements IAssessmentRepository {
  BASE_URL = '/assessment';

  constructor(private readonly networkService: AxiosService<never>) {
    this.networkService = networkService;
  }

  async sendAssessment(config: IRequestConfig<FormData>): Promise<{ status: number; data: Leads }> {
    const response = await this.networkService.post(this.BASE_URL, {
      headers: { 'Content-Type': 'multipart/form-data', ...config.headers },
      ...config,
    });
    return response.data;
  }

  async getAssessments(config?: IRequestConfig): Promise<AssessmentResponse> {
    const response = await this.networkService.get(this.BASE_URL, config);
    return response.data;
  }

  async changeLeadStatus(config: IRequestConfig<UpdateLeadStatusPayload>): Promise<AssessmentResponse> {
    const response = await this.networkService.patch(this.BASE_URL, config);
    return response.data;
  }
}
