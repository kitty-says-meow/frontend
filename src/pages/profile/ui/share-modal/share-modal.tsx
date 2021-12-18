import { Button, Form, InputNumber, Modal, Select, Spin } from 'antd'
import { Dispatch, useState } from 'react'
import { useDebounce } from 'shared/lib'
import { useUsersSearch } from 'entities/user/lib'

interface Props {
  isVisible: boolean
  setVisible: Dispatch<boolean>
}

export const ShareModal = ({ isVisible, setVisible }: Props) => {
  const [search, setSearch] = useState<string>()
  const debouncedSearch = useDebounce(search, 300)
  const { data: users, isValidating } = useUsersSearch(debouncedSearch)

  console.log(users)

  return (
    <Modal
      title='Подарить баллы другу'
      visible={isVisible}
      onCancel={() => setVisible(false)}
      width={384}
      footer={[
        <Button key='share' type='primary'>
          Подарить
        </Button>,
      ]}
    >
      <Form layout='vertical'>
        <Form.Item label='Сколько баллов ты хочешь подарить?'>
          <InputNumber placeholder='122' />
        </Form.Item>
        <Form.Item label='Пользователь'>
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
