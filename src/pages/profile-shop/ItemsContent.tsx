import {
  CalendarFilled,
  CameraFilled,
  MobileFilled,
  AppstoreFilled,
  ClockCircleFilled,
  RestFilled,
  SkinFilled,
} from '@ant-design/icons'

export type itemContentType = {
  id: number
  icon: JSX.Element
  name: string
  scores: number
}

export const itemsContent: itemContentType[] = [
  {
    id: 1,
    icon: <AppstoreFilled style={{ fontSize: '28px', color: '#fff' }} />,
    name: 'Любое приложение в AppStore бесплатно',
    scores: 20,
  },
  {
    id: 2,
    icon: <CalendarFilled style={{ fontSize: '28px', color: '#fff' }} />,
    name: 'Мерч от ITMO.Store. Календарик.',
    scores: 5,
  },
  {
    id: 3,
    icon: <CameraFilled style={{ fontSize: '28px', color: '#fff' }} />,
    name: 'Бесплатная фотосессия от ИТМО',
    scores: 25,
  },
  {
    id: 4,
    icon: <MobileFilled style={{ fontSize: '28px', color: '#fff' }} />,
    name: 'Аренда любой техники в ИТМО на более длительный срок',
    scores: 10,
  },
  {
    id: 5,
    icon: <ClockCircleFilled style={{ fontSize: '28px', color: '#fff' }} />,
    name: 'Отсрочка дедлайна от любого препода',
    scores: 15,
  },
  {
    id: 6,
    icon: <RestFilled style={{ fontSize: '28px', color: '#fff' }} />,
    name: 'Кофе от партнеров ИТМО',
    scores: 10,
  },
  {
    id: 7,
    icon: <SkinFilled style={{ fontSize: '28px', color: '#fff' }} />,
    name: 'Мерч от ITMO.Store. Футболка.',
    scores: 15,
  },
]
