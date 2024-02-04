export interface UserAssignment {
  id: number
  is_project_manager: true
  is_active: true
  use_default_rates: true
  created_at: string
  updated_at: string
  hourly_rate: string | null
  budget: string | null
  project: {
    id: number
    name: string
    code: string | null
  }
  user: {
    id: number
    name: string
  }
}

export interface UserProjects {
  user_assignments: UserAssignment[]
  per_page: number
  total_pages: number
  total_entries: number
  next_page: number | null
  previous_page: number | null
  page: number
  links: {
    first: string
    next: string | null
    previous: string | null
    last: string
  }
}

interface Task {
  id: number
  name: string
  billable_by_default: boolean
  default_hourly_rate: null
  is_default: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AllTasks {
  tasks: Task[];
  per_page: number
  total_pages: number
  total_entries: number
  next_page: number | null
  previous_page: number | null
  page: number
  links: {
    first: string | null
    next: string | null
    previous: string | null
    last: string | null
  }
}
