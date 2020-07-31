export interface IRepositorie {
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  open_issues: number;
  updated_at: string;
  url: string;
  html_url: string;
}

export interface IResponseRepo {
  total_count: number;
  items: IRepositorie[];
}

export interface IUserSearch {
  login: string;
  avatar_url: string;
  id: number;
}

export interface IResponseUser {
  total_count: number;
  items: IUserSearch[];
}

export interface IUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface IDataResult {
  repositories: IRepositorie[];
  users: IUserSearch[];
}
