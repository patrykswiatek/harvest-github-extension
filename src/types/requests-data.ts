export interface GetOpenPullRequestsData {
  username: string
}

export interface CreateTaskData {
  name: string
}

export interface TrackTimeData {
  project_id: number
  task_id: number
  spent_date: string
  hours: number
}
