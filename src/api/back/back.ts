import axiosBack from './axios-back';

export const searchGitRepos = (repo: string) =>
  axiosBack.get(`auth/github/org/${repo}/repos`);

