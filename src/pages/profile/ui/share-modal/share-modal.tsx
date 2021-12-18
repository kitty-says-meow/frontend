import {
  Button,
  Form,
  InputNumber,
  Modal,
  notification,
  Select,
  Spin,
} from 'antd'
import { Dispatch, useCallback, useState } from 'react'
import { useDebounce } from 'shared/lib'
import {
  sendUserScore,
  useUserContext,
  useUsersSearch,
} from 'entities/users/lib'
import { mutate } from 'swr'

interface Props {
  isVisible: boolean
  setVisible: Dispatch<boolean>
}

export const ShareModal = ({ isVisible, setVisible }: Props) => {
  const [search, setSearch] = useState<string>()
  const debouncedSearch = useDebounce(search, 300)
  const { data: users, isValidating } = useUsersSearch(debouncedSearch)
  const { user } = useUserContext()

  const [form] = Form.useForm()

  const handleShare = useCallback(
    async ({
      username,
      score,
    }: Paths.UsersScoreSendCreate.RequestBody &
      Paths.UsersScoreSendCreate.PathParameters) => {
      if (!user) {
        return
      }
      await sendUserScore(username, score)
      notification.success({ message: `Баллы успешно отправлены` })
      await mutate(`/users/${user.id}`)
      setVisible(false)
    },
    [setVisible, user],
  )

  return (
    <Modal
      title='Подарить баллы другу'
      visible={isVisible}
      onCancel={() => setVisible(false)}
      width={384}
      footer={[
        <Button key='share' type='primary' onClick={form.submit}>
          Подарить
        </Button>,
      ]}
    >
      <Form layout='vertical' form={form} onFinish={handleShare}>
        <Form.Item label='Сколько баллов ты хочешь подарить?' name='score'>
          <InputNumber placeholder='122' />
        </Form.Item>
        <Form.Item label='Пользователь' name='username'>
          <Select
            showSearch
            options={users?.map((user) => ({
              label: `${user.firstName} ${user.lastName}, ${user.username}`,
              value: user.username,
            }))}
            onSearch={setSearch}
            notFoundContent={isValidating && <Spin style={{ width: `100%` }} />}
            filterOption={() => true}
            placeholder='Поиск по имени, фамилии и id в ИСУ'
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
