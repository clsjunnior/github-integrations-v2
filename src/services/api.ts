import { default as AxiosImport, AxiosInstance } from 'axios';
class Api {
  private axios: AxiosInstance;
  private BASE_URL: string = 'https://api.github.com/';

  constructor() {
    this.axios = AxiosImport.create({
      baseURL: this.BASE_URL,
    });
  }

  public getInstance(): AxiosInstance {
    return this.axios;
  }
}

export default new Api();
