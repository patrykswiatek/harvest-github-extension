import { useEffect, useRef, useState } from 'react'

import {
  getAllTasks,
  getGithubUserData,
  getUserOpenPullRequests,
  getUserProjects,
} from '@/api'
import { AppData } from '@/types/app-data'
import { mapDataToSelectOptions } from '@/utils/map-data-to-select-options'

export const useAppData = () => {
  const [appData, setAppData] = useState<AppData>({
    pullRequests: [],
    projects: [],
    tasks: [],
    user: null,
  })
  const [isLoading, setIsLoading] = useState(false)

  const isDataFetchedRef = useRef(false)

  const fetchGithubData = async () => {
    const { data: userData } = await getGithubUserData()
    const { avatar_url: avatarUrl, login, name } = userData
    const { data: pullRequests } = await getUserOpenPullRequests({
      username: login,
    })

    setAppData((data) => ({
      ...data,
      pullRequests: mapDataToSelectOptions(pullRequests, ['id', 'title']),
      user: { avatarUrl, name },
    }))
  }

  const fetchProjects = async () => {
    const { data: projects } = await getUserProjects()
    const mappedProjects = projects.user_assignments.map(
      ({ project }) => project
    )

    setAppData((data) => ({
      ...data,
      projects: mapDataToSelectOptions(mappedProjects, ['id', 'name']),
    }))
  }

  const fetchTasks = async () => {
    const { data: tasks } = await getAllTasks()

    setAppData((data) => ({
      ...data,
      tasks: mapDataToSelectOptions(tasks.tasks, ['id', 'name']),
    }))
  }

  useEffect(() => {
    if (isDataFetchedRef.current) return

    setIsLoading(true)
    Promise.all([fetchGithubData(), fetchProjects(), fetchTasks()]).finally(
      () => {
        isDataFetchedRef.current = true
        setIsLoading(false)
      }
    )
  }, [])

  return { ...appData, isLoading }
}
