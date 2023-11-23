import { useEffect, useRef, useState } from 'react'

import { getGithubUserData, getUserOpenPullRequests, getUserProjects } from '@/api'
import { SelectOption } from '@/types/props/select.props'
import { mapDataToSelectOptions } from '@/utils/map-data-to-select-options'

export const useFormData = () => {
  const [{ openPullRequests, projects }, setData] = useState<
    Record<'openPullRequests' | 'projects', SelectOption[]>
  >({
    openPullRequests: [],
    projects: [],
  })

  const isDataFetchedRef = useRef(false)

  const getGithubData = async () => {
    const { data } = await getGithubUserData()
    const { data: pullRequests } = await getUserOpenPullRequests({
      username: data.login,
    })

    setData((data) => ({
      ...data,
      openPullRequests: mapDataToSelectOptions(pullRequests, ['id', 'title']),
    }))
  }

  const getProjects = async () => {
    const { data: projects } = await getUserProjects()
    const mappedProjects = projects.user_assignments.map(({ project }) => project)

    setData((data) => ({
      ...data,
      projects: mapDataToSelectOptions(mappedProjects, ['id', 'name']),
    }))
  }

  useEffect(() => {
    if (isDataFetchedRef.current) return

    getGithubData()
    getProjects()
    isDataFetchedRef.current = true
  }, [])

  return { openPullRequests, projects }
}
