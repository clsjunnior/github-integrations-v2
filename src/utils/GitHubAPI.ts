import Api from '../services/api';
import { IResponseRepo, IResponseUser, IUser } from './Intefaces';
class GitHubAPI {
  async getSearchRepo(repo: string, page: number) {
    const resp = await Api.getInstance().get<IResponseRepo>(
      `search/repositories?q=${repo}&sort=stars&order=desc&page=${page}&per_page=10`
    );
    const { items, total_count } = resp.data;
    return { repos: items, total: total_count };
  }

  async getSearchUser(user: string, page: number) {
    const resp = await Api.getInstance().get<IResponseUser>(
      `search/users?q=${user}&page=${page}&per_page=10`
    );
    const { items, total_count } = resp.data;
    return { users: items, total: total_count };
  }

  async getUser(user: string) {
    const resp = await Api.getInstance().get<IUser>(`users/${user}`);
    return resp.data;
  }
}

export default new GitHubAPI();
