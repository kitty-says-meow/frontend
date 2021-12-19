import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Spin,
  Typography,
  Upload,
} from 'antd'
import { Dispatch, useEffect, useState } from 'react'
import styles from './report-modal.module.scss'
import { roles } from 'shared/config'
import { UploadOutlined } from '@ant-design/icons'
import { useDebounce } from 'shared/lib'
import { useUsersSearch } from 'entities/users/lib'
import { sendReport } from 'entities/events/lib'
import { mutate } from 'swr'

interface Props {
  event?: Components.Schemas.Event
  isVisible: boolean
  setVisible: Dispatch<boolean>
}

interface Values {
  report: { file: File }
  achievements: Components.Schemas.Achievement[]
  organizers: Components.Schemas.Achievement[]
}

export const ReportModal = ({ isVisible, setVisible, event }: Props) => {
  const [search, setSearch] = useState<string>()
  const debouncedSearch = useDebounce(search, 300)
  const { data: users, isValidating } = useUsersSearch(debouncedSearch)
  const [form] = Form.useForm()
  const [file, setFile] = useState<File>()

  useEffect(() => {
    form.setFieldsValue({
      organizers: event?.achievements.filter(
        ({ name }) => !!roles.find(({ value }) => value === name),
      ),
      achievements: event?.achievements.filter(
        ({ name }) => !roles.find(({ value }) => value === name),
      ),
    })
  }, [event?.achievements, form])

  const handleSubmit = async ({ achievements, organizers }: Values) => {
    if (!file || !event?.id) {
      return
    }

    const users = [...achievements, ...organizers].sort((a, b) => a.id - b.id)

    const formData = new FormData()
    formData.append(`report`, file)
    users.forEach(({ user }) => formData.append(`users`, user))

    await sendReport(event.id, formData)
    await mutate(`/events/${event.id}`)
    notification.success({ message: `Отчёт отправлен` })
    setVisible(false)
  }

  return (
    <Modal
      title='Отправить отчёт'
      visible={isVisible}
      onCancel={() => setVisible(false)}
      footer={[
        <Button type='primary' onClick={form.submit}>
          Отправить
        </Button>,
      ]}
    >
      <Form layout='vertical' form={form} onFinish={handleSubmit}>
        <Form.Item name='report' label='Отчёт'>
          <Upload
            beforeUpload={(file) => {
              setFile(file)
              return false
            }}
          >
            <Button icon={<UploadOutlined />} size='large'>
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.List name='organizers'>
          {(fields) => (
            <>
              <Typography.Paragraph className={styles.label}>
                Организаторы
              </Typography.Paragraph>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key} className={styles.wrapper}>
                  <Form.Item
                    {...restField}
                    name={[fieldKey, 'name']}
                    fieldKey={[fieldKey, 'name']}
                  >
                    <Select
                      disabled
                      size='large'
                      placeholder='Организатор'
                      options={roles}
                    />
                  </Form.Item>
                  <Form.Item
                    name={[fieldKey, 'user']}
                    fieldKey={[fieldKey, 'user']}
                  >
                    <Select
                      showSearch
                      size='large'
                      options={users?.map((user) => ({
                        label: `${user.firstName} ${user.lastName}, ${user.username}`,
                        value: user.username,
                      }))}
                      onSearch={setSearch}
                      notFoundContent={
                        isValidating && <Spin style={{ width: `100%` }} />
                      }
                      filterOption={() => true}
                      placeholder='Поиск по имени, фамилии и id в ИСУ'
                    />
                  </Form.Item>
                </div>
              ))}
            </>
          )}
        </Form.List>
        <Form.List name='achievements'>
          {(fields) => (
            <>
              <Typography.Paragraph className={styles.label}>
                Достижения
              </Typography.Paragraph>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key} className={styles.wrapper}>
                  <Form.Item
                    {...restField}
                    name={[fieldKey, 'name']}
                    fieldKey={[fieldKey, 'name']}
                  >
                    <Input disabled size='large' placeholder='Достижения' />
                  </Form.Item>
                  <Form.Item
                    name={[fieldKey, 'user']}
                    fieldKey={[fieldKey, 'user']}
                  >
                    <Select
                      showSearch
                      size='large'
                      options={users?.map((user) => ({
                        label: `${user.firstName} ${user.lastName}, ${user.username}`,
                        value: user.username,
                      }))}
                      onSearch={setSearch}
                      notFoundContent={
                        isValidating && <Spin style={{ width: `100%` }} />
                      }
                      filterOption={() => true}
                      placeholder='Поиск по имени, фамилии и id в ИСУ'
                    />
                  </Form.Item>
                </div>
              ))}
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  )
}
