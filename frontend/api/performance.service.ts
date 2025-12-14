// api/performance.service.ts
import api from './axios';

interface PerformanceStats {
  active_appraisals: number;
  pending_reviews: number;
  completed: number;
  avg_rating: number;
  pending_disputes: number;
}

class PerformanceService {
  // ========== STATS ==========
  async getStats(): Promise<PerformanceStats> {
    const response = await api.get('/performance/stats');
    return response.data;
  }

  // ========== TEMPLATES ==========
  async getTemplates() {
    const response = await api.get('/performance/templates');
    return response.data;
  }

  async createTemplate(data: any) {
    const response = await api.post('/performance/templates', data);
    return response.data;
  }

  async getTemplateById(id: string) {
    const response = await api.get(`/performance/templates/${id}`);
    return response.data;
  }

  async updateTemplate(id: string, data: any) {
    const response = await api.patch(`/performance/templates/${id}`, data);
    return response.data;
  }

  async deleteTemplate(id: string) {
    const response = await api.delete(`/performance/templates/${id}`);
    return response.data;
  }

  // ========== CYCLES ==========
  async getCycles() {
    const response = await api.get('/performance/cycles');
    return response.data;
  }

  async createCycle(data: any) {
    const response = await api.post('/performance/cycles', data);
    return response.data;
  }

  async getCycleById(id: string) {
    const response = await api.get(`/performance/cycles/${id}`);
    return response.data;
  }

  async updateCycle(id: string, data: any) {
    const response = await api.patch(`/performance/cycles/${id}`, data);
    return response.data;
  }

  async activateCycle(id: string) {
    const response = await api.patch(`/performance/cycles/${id}/activate`);
    return response.data;
  }

  async closeCycle(id: string) {
    const response = await api.patch(`/performance/cycles/${id}/close`);
    return response.data;
  }

  async archiveCycle(id: string) {
    const response = await api.patch(`/performance/cycles/${id}/archive`);
    return response.data;
  }

  async publishCycleResults(id: string) {
    const response = await api.patch(`/performance/cycles/${id}/publish-results`);
    return response.data;
  }

  async getCycleAppraisals(cycleId: string) {
    const response = await api.get(`/performance/cycles/${cycleId}/appraisals`);
    return response.data;
  }

  // ========== APPRAISALS ==========
  async createAppraisal(data: any) {
    const response = await api.post('/performance/appraisals', data);
    return response.data;
  }

  async updateAppraisal(id: string, data: any) {
    const response = await api.patch(`/performance/appraisals/${id}`, data);
    return response.data;
  }

  async updateAppraisalStatus(id: string, data: any) {
    const response = await api.patch(`/performance/appraisals/${id}/status`, data);
    return response.data;
  }

  async publishAppraisal(id: string, data: any) {
    const response = await api.patch(`/performance/appraisals/${id}/publish`, data);
    return response.data;
  }

  // ========== MY APPRAISALS (Employee) ==========
  async getMyAppraisals() {
    const response = await api.get('/performance/my-appraisals');
    return response.data;
  }

  async getMyAppraisalById(id: string) {
    const response = await api.get(`/performance/my-appraisals/${id}`);
    return response.data;
  }

  async acknowledgeAppraisal(id: string, comment: string) {
    const response = await api.patch(`/performance/my-appraisals/${id}`, {
      employeeAcknowledgementComment: comment
    });
    return response.data;
  }

  // ========== DISPUTES ==========
  async createDispute(appraisalId: string, data: any) {
    const response = await api.post(`/performance/appraisals/${appraisalId}/disputes`, data);
    return response.data;
  }

  async getDisputes(status?: string) {
    const params = status ? { status } : {};
    const response = await api.get('/performance/disputes', { params });
    return response.data;
  }

  async getDisputeById(id: string) {
    const response = await api.get(`/performance/disputes/${id}`);
    return response.data;
  }

  async resolveDispute(id: string, data: any) {
    const response = await api.patch(`/performance/disputes/${id}/resolve`, data);
    return response.data;
  }

  async deleteDispute(id: string) {
    const response = await api.delete(`/performance/disputes/${id}`);
    return response.data;
  }
}

export default new PerformanceService();