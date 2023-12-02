import axios from '@/api/axios'
import octokit from '@/api/octokit'
import { GetOpenPullRequestsData, TrackTimeData } from '@/types/requests-data'
import { AllTasks, UserProjects } from '@/types/requests-output'

export const getGithubUserData = () => {
  return octokit.rest.users.getAuthenticated()
}

export const getUserOpenPullRequests = (username: GetOpenPullRequestsData) => {
  return octokit.rest.issues.list({
    author: username,
    state: 'open',
    type: 'pr',
  })
}

export const getHarvestUserData = () => {
  return axios.get('users/me')
}

export const getAllTasks = () => {
  return axios.get<AllTasks>('tasks')
}

export const createTaskAssignment = (data: {
  task_id: number
  project_id: number
}) => {
  const { task_id, project_id } = data
  return axios.post(`projects/${project_id}/task_assignments`, { task_id })
}

export const trackTimeViaDuration = (data: TrackTimeData) => {
  return axios.post('time_entries', data)
}

export const getUserProjects = () => {
  return axios.get<UserProjects>('user_assignments')
}
