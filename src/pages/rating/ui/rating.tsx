import { Table } from 'antd'
import { PageTitle } from 'shared/ui'

const columns = [
  {
    title: `Место`,
    dataIndex: `name`,
  },
  {
    title: `Имя`,
    dataIndex: `name`,
  },
  {
    title: `ИСУ`,
    dataIndex: `age`,
  },
  {
    title: `Попадаешь в ПГАС?`,
    dataIndex: `address`,
  },
  {
    title: `Баллы`,
    dataIndex: `address`,
  },
]

const data = [
  {
    key: `1`,
    name: `John Brown`,
    age: 32,
    address: `New York No. 1 Lake Park`,
  },
  {
    key: `2`,
    name: `Jim Green`,
    age: 42,
    address: `London No. 1 Lake Park`,
  },
  {
    key: `3`,
    name: `Joe Black`,
    age: 32,
    address: `Sidney No. 1 Lake Park`,
  },
  {
    key: `4`,
    name: `Jim Red`,
    age: 32,
    address: `London No. 2 Lake Park`,
  },
]

export const Rating = () => {
  return (
    <>
      <PageTitle title='Рейтинг' />
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  )
}
