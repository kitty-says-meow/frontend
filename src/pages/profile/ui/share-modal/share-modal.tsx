import { Button, Form, InputNumber, Modal, Select } from 'antd'
import { Dispatch } from 'react'

interface Props {
  isVisible: boolean
  setVisible: Dispatch<boolean>
}

export const ShareModal = ({ isVisible, setVisible }: Props) => {
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
        <Form.Item label='Сколько баллов вы хотите подарить?'>
          <InputNumber placeholder='122' />
        </Form.Item>
        <Form.Item label='Пользователь'>
          <Select placeholder='Глеб Новиков' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
