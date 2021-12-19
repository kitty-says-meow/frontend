import { Button, Form, InputNumber, Modal, notification } from 'antd'
import { Dispatch, useCallback } from 'react'
import { convertUserScore, useUserContext } from 'entities/users/lib'
import { mutate } from 'swr'

interface Props {
  isVisible: boolean
  setVisible: Dispatch<boolean>
}

export const ConvertModal = ({ isVisible, setVisible }: Props) => {
  const [form] = Form.useForm()
  const { user } = useUserContext()

  const handleShare = useCallback(
    async ({ score }: Paths.UsersScoreConvertCreate.RequestBody) => {
      if (!user) {
        return
      }
      await convertUserScore(score)
      notification.success({ message: `Баллы успешно конвертированы` })
      await mutate(`/users/${user.id}`)
      setVisible(false)
    },
    [setVisible, user],
  )

  return (
    <Modal
      title='Конвертировать баллы'
      visible={isVisible}
      onCancel={() => setVisible(false)}
      width={384}
      footer={[
        <Button key='share' type='primary' onClick={form.submit}>
          Конвертировать
        </Button>,
      ]}
    >
      <Form layout='vertical' form={form} onFinish={handleShare}>
        <Form.Item
          label='Сколько баллов ПГАС ты хочешь конвертировать в Мета коины?'
          name='score'
        >
          <InputNumber placeholder='122' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
