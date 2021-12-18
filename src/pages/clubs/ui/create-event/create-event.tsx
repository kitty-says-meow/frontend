import { Dispatch } from 'react'
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Button,
  InputNumber,
  Typography,
  notification,
} from 'antd'
import { categories, PATH } from 'shared/config'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Moment } from 'moment'
import styles from './create-event.module.scss'
import { createEvent } from 'entities/events/lib'
import { generatePath, useHistory } from 'react-router-dom'
import { useUserProfile } from 'entities/user/lib'

interface Props {
  visible: boolean
  setVisible: Dispatch<boolean>
}

export const CreateEvent = ({ visible, setVisible }: Props) => {
  const [form] = Form.useForm()
  const history = useHistory()
  const { data: profile } = useUserProfile()

  const handleFinish = async ({
    range,
    ...values
  }: Paths.EventsCreate.RequestBody & { range: [Moment, Moment] }) => {
    const { data } = await createEvent({
      ...values,
      dateStart: range[0].toJSON(),
      dateEnd: range[1].toJSON(),
    })
    notification.success({ message: `Заявка на событие отправлена` })
    history.push(generatePath(PATH.EVENT, { eventId: data.id }))
  }

  return (
    <Modal
      title='Создать мероприятие'
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={[
        <Button key='create' type='primary' onClick={form.submit}>
          Создать
        </Button>,
      ]}
    >
      <Form layout='vertical' onFinish={handleFinish} form={form}>
        <Form.Item name='category' label='Направление'>
          <Select size='large' options={categories} />
        </Form.Item>
        <Form.Item name='department' label='Клуб'>
          <Select
            size='large'
            options={profile?.departments.map((department) => ({
              label: department.name,
              value: department.id,
            }))}
          />
        </Form.Item>
        <Form.Item name='name' label='Название'>
          <Input size='large' />
        </Form.Item>
        <Form.Item name='description' label='Описание'>
          <Input.TextArea size='large' />
        </Form.Item>
        <Form.Item name='range' label='Даты мероприятия'>
          <DatePicker.RangePicker className={styles.number} size='large' />
        </Form.Item>
        <Form.Item
          name='organizers'
          label='Количество организаторов (не считая главного)'
        >
          <InputNumber
            size='large'
            className={styles.number}
            placeholder='13'
          />
        </Form.Item>
        <Form.List name='achievements'>
          {(fields, { add, remove }) => (
            <>
              <Typography.Paragraph className={styles.label}>
                Награды
              </Typography.Paragraph>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key} className={styles.wrapper}>
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    fieldKey={[fieldKey, 'name']}
                  >
                    <Input size='large' placeholder='Победитель' />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'score']}
                    fieldKey={[fieldKey, 'score']}
                  >
                    <InputNumber
                      size='large'
                      className={styles.number}
                      placeholder='123123'
                    />
                  </Form.Item>
                  <MinusCircleOutlined
                    className={styles.minus}
                    onClick={() => remove(name)}
                  />
                </div>
              ))}
              <Form.Item>
                <Button
                  type='dashed'
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  )
}
