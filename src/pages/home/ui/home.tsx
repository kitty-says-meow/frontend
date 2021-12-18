import { useUser } from 'entities/user/lib'

import { useEffect } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { PATH } from 'shared/config'

export const Home = () => {
  const { user } = useUser()
  const history = useHistory()

  useEffect(() => {
    if (user?.id) {
      history.push(generatePath(PATH.PROFILE, { userId: user.id }))
    }
  }, [history, user?.id])

  return null
}
