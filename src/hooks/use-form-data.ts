import { useEffect, useRef, useState } from 'react'

import {
  getAllTasks,
  getGithubUserData,
  getUserOpenPullRequests,
  getUserProjects,
} from '@/api'
import { SelectOption } from '@/types/props/select.props'
import { mapDataToSelectOptions } from '@/utils/map-data-to-select-options'

export const useFormData = () => {
  const [{ openPullRequests, projects, tasks }, setData] = useState<
    Record<'openPullRequests' | 'projects' | 'tasks', SelectOption[]>
  >({
    openPullRequests: [],
    projects: [],
    tasks: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  const isDataFetchedRef = useRef(false)

  const fetchGithubData = async () => {
    const { data } = await getGithubUserData()
    const { data: pullRequests } = await getUserOpenPullRequests({
      username: data.login,
    })

    setData((data) => ({
      ...data,
      openPullRequests: mapDataToSelectOptions(pullRequests, ['id', 'title']),
    }))
  }

  const fetchProjects = async () => {
    const { data: projects } = await getUserProjects()
    const mappedProjects = projects.user_assignments.map(
      ({ project }) => project
    )

    setData((data) => ({
      ...data,
      projects: mapDataToSelectOptions(mappedProjects, ['id', 'name']),
    }))
  }

  const fetchTasks = async () => {
    const { data: tasks } = await getAllTasks()

    setData((data) => ({
      ...data,
      tasks: mapDataToSelectOptions(tasks.tasks, ['id', 'name']),
    }))
  }

  useEffect(() => {
    if (isDataFetchedRef.current) return

    setIsLoading(true)
    Promise.all([fetchGithubData(), fetchProjects(), fetchTasks()]).finally(() => {
      isDataFetchedRef.current = true
      setIsLoading(false)
    })
  }, [])

  return { openPullRequests, projects, tasks, isLoading }
}
