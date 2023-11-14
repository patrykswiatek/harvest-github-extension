import axios from '@/api/axios'
import octokit from '@/api/octokit'

export const getGithubUserData = () => {
  return octokit.rest.users.getAuthenticated()
}

export const getUserOpenPullRequests = (username: string) => {
  return octokit.rest.issues.list({
    author: username,
    state: 'open',
    type: 'pr',
  })
}

export const getHarvestUserData = () => {
  return axios.get('users/me')
}
