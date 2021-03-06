import { useEffect, useState } from 'react'

export const QUERY = gql`
  query PollCurrentVersionQuery {
    redwood {
      currentUser
      version
      prismaVersion
    }
  }
`

export const beforeQuery = () => {
  return {
    pollInterval: 20000,
  }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <pre className="text-red-700 bg-red-200 p-5 rounded-lg">
    Error: {error.message}
  </pre>
)

export const Success = ({ redwood }) => {
  const [lastUpdate, setLastUpdate] = useState('lastUpdate')

  useEffect(() => {
    setLastUpdate(new Date().toLocaleTimeString())
  }, [redwood])

  return (
    <div className="w-full overflow-x-auto overflow-y-auto text-sm max-h-80">
      <h3>Polling output</h3>
      <p>Last Changed {lastUpdate}</p>
      <pre className="text-green-700 w-1/2">
        {JSON.stringify(redwood, null, 2)}
      </pre>
    </div>
  )
}
