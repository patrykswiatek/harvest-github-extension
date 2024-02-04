import { AxiosResponse } from 'axios'
import { useEffect, useRef, useState } from 'react'

import {
  getAllTasks,
  getGithubUserData,
  getUserOpenPullRequests,
  getUserProjects,
} from '@/api'
import { AppData, DataType } from '@/types/app-data'
import { mapDataToSelectOptions } from '@/utils/map-data-to-select-options'

export const useAppDataFetcher = () => {
  const [appData, setAppData] = useState<AppData>({
    pullRequests: [],
    projects: [],
    tasks: [],
    user: null,
  })
  const [isLoading, setIsLoading] = useState(false)

  const isDataFetchedRef = useRef(false)

  const fetchAndMapDataToState = async <
    T,
    K extends { id: number; name: string }[]
  >(
    dataType: DataType,
    fetchFunction: () => Promise<AxiosResponse<T>>,
    mapFunction: (data: T) => K
  ) => {
    try {
      const { data } = await fetchFunction()
      const mappedData = mapFunction(data)

      setAppData((prevData: AppData) => ({
        ...prevData,
        [dataType]: mapDataToSelectOptions(mappedData, ['id', 'name']),
      }))
    } catch (error) {
      console.error(`Error fetching ${dataType}: `, error)
    }
  }

  const fetchAndMapGithubDataToState = async () => {
    try {
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
    } catch (error) {
      console.error('Error fetching Github user data: ', error)
    }
  }

  useEffect(() => {
    if (isDataFetchedRef.current) return

    setIsLoading(true)

    const fetchData = async () => {
      await Promise.all([
        fetchAndMapGithubDataToState(),
        fetchAndMapDataToState(
          'projects',
          getUserProjects,
          ({ user_assignments }) =>
            user_assignments.map(({ project }) => project)
        ),
        fetchAndMapDataToState('tasks', getAllTasks, ({ tasks }) => tasks),
      ])
    }

    fetchData().finally(() => {
      isDataFetchedRef.current = true
      setIsLoading(false)
    })
  }, [])

  return { ...appData, isLoading }
}
