import Api from '../services/api';

class GitHubAPI {
  async getSearchRepo(repo: string, page: number) {
    const resp = await Api.getInstance().get<IResponse>(
      `search/repositories?q=${repo}&sort=stars&order=desc&page=${page}&per_page=10`
    );
    const { items, total_count } = resp.data;
    return { repos: items, total: total_count };
  }
}

export interface IResponse {
  total_count: number;
  items: IRepositorie[];
}

export interface IRepositorie {
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  open_issues: number;
  updated_at: string;
  url: string;
}

export default new GitHubAPI();
