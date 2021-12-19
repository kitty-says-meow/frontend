import { Button, Result } from 'antd'
import { generatePath, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { PATH } from 'shared/config'

export const ProfileShopSuccess = () => {
  const { code, userId } = useParams<{ code: string; userId: string }>()

  return (
    <>
      <Result
        status='success'
        title={`${code.slice(0, 3)}-${code.slice(3, 6)}`}
        subTitle='Ваш промокод для получения приза'
        extra={
          <Link to={generatePath(PATH.PROFILE, { userId })}>
            <Button size='large'>В профиль</Button>
          </Link>
        }
      />
    </>
  )
}
