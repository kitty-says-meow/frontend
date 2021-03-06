declare namespace Components {
  namespace Schemas {
    export interface Achievement {
      id: number
      /**
       * Название
       */
      name: string
      /**
       * Баллы
       */
      score: number
      user: string
    }
    export interface AchievementRating {
      id: number
      /**
       * Имя пользователя
       * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
       */
      user: string
      /**
       * Баллы
       */
      score: number
      /**
       * Начислены баллы ПГАС (дата)
       */
      pgasConverted: string | null // date-time
    }
    export interface AchievementRequest {
      /**
       * Название
       */
      name: string
      /**
       * Баллы
       */
      score: number
    }
    export type CategoryEnum = 1 | 2 | 3 | 4 | 5
    export type CodeEnum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
    export interface Department {
      id: number
      /**
       * Название
       */
      name: string
      /**
       * Описание
       */
      description: string
      /**
       * Ссылка
       */
      link: string // uri
      /**
       * Логотип
       */
      logo: string // uri
    }
    export interface Event {
      id: number
      /**
       * Название
       */
      name: string
      /**
       * Описание
       */
      description?: string | null
      /**
       * Направление
       */
      category: 1 | 2 | 3 | 4 | 5
      /**
       * Дата и время начала
       */
      dateStart?: string | null // date-time
      /**
       * Дата и время конца
       */
      dateEnd?: string | null // date-time
      department: Department
      image?: string | null // uri
      /**
       * Отчёт
       */
      report: string | null // uri
      /**
       * Статус
       */
      status: 1 | 2 | 3 | 4 | 5 | 6 | 7
      achievements: Achievement[]
      participants: Participant[]
    }
    export interface EventReportRequest {
      report: string // binary
      users: string[]
    }
    export interface EventRequest {
      /**
       * Название
       */
      name: string
      /**
       * Описание
       */
      description?: string | null
      /**
       * Направление
       */
      category: 1 | 2 | 3 | 4 | 5
      /**
       * Дата и время начала
       */
      dateStart?: string | null // date-time
      /**
       * Дата и время конца
       */
      dateEnd?: string | null // date-time
      department: number
      image?: null | number
      achievements: AchievementRequest[]
    }
    export interface Image {
      id: number
      /**
       * Файл
       */
      file: string // uri
    }
    export interface ImageRequest {
      /**
       * Файл
       */
      file: string // binary
    }
    export type NullEnum = null
    export interface Participant {
      /**
       * Имя пользователя
       * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
       */
      username: string
      /**
       * Имя
       */
      firstName: string
      /**
       * Фамилия
       */
      lastName: string
      /**
       * Ссылка на аватар
       */
      avatar: string | null // uri
    }
    export interface Profile {
      /**
       * Имя пользователя
       * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
       */
      username: string
      /**
       * Имя
       */
      firstName: string
      /**
       * Фамилия
       */
      lastName: string
      /**
       * Ссылка на аватар
       */
      avatar: string | null // uri
      /**
       * Баллы ПГАС
       */
      pgasScore: number
      /**
       * Личные баллы
       */
      personalScore: number
      achievements: UserAchievement[]
      trophies: Trophy[]
      /**
       * Адрес электронной почты
       */
      email: string // email
      departments: Department[]
    }
    export interface Rating {
      /**
       * Имя пользователя
       * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
       */
      username: string
      /**
       * Имя
       */
      firstName: string
      /**
       * Фамилия
       */
      lastName: string
      /**
       * Баллы ПГАС
       */
      pgasScore: number
    }
    export interface ScoreOperation {
      score: number
    }
    export interface ScoreOperationRequest {
      score: number
    }
    export type StatusEnum = 1 | 2 | 3 | 4 | 5 | 6 | 7
    export interface Trophy {
      /**
       * Код
       */
      code: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
      /**
       * Название
       */
      name: string
      /**
       * Описание
       */
      description: string
      /**
       * Категория
       */
      category?: /* Категория */ CategoryEnum | NullEnum
      /**
       * Иконка
       */
      icon: string // uri
      hasTrophy: boolean
    }
    export interface User {
      /**
       * Имя пользователя
       * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
       */
      username: string
      /**
       * Имя
       */
      firstName: string
      /**
       * Фамилия
       */
      lastName: string
      /**
       * Ссылка на аватар
       */
      avatar: string | null // uri
      /**
       * Баллы ПГАС
       */
      pgasScore: number
      /**
       * Личные баллы
       */
      personalScore: number
      achievements: UserAchievement[]
      trophies: Trophy[]
    }
    export interface UserAchievement {
      id: number
      /**
       * Название
       */
      name: string
      /**
       * Баллы
       */
      score: number
      event: {
        id: number
        /**
         * Название
         */
        name: string
        /**
         * Направление
         */
        category: 1 | 2 | 3 | 4 | 5
        image: string // uri
      }
    }
    export interface UserAchievementEvent {
      id: number
      /**
       * Название
       */
      name: string
      /**
       * Направление
       */
      category: 1 | 2 | 3 | 4 | 5
      image: string // uri
    }
  }
}
declare namespace Paths {
  namespace EventsCreate {
    export type RequestBody = Components.Schemas.EventRequest
    namespace Responses {
      export type $201 = Components.Schemas.Event
    }
  }
  namespace EventsJoinCreate {
    namespace Parameters {
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      export interface $201 {}
    }
  }
  namespace EventsList {
    namespace Parameters {
      /**
       * Направление
       */
      export type Category = 1 | 2 | 3 | 4 | 5
    }
    export interface QueryParameters {
      category?: /* Направление */ Parameters.Category
    }
    namespace Responses {
      export type $200 = Components.Schemas.Event[]
    }
  }
  namespace EventsMyRetrieve {
    namespace Responses {
      export type $200 = Components.Schemas.Event
    }
  }
  namespace EventsReportCreate {
    namespace Parameters {
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody = Components.Schemas.EventReportRequest
    namespace Responses {
      export type $200 = Components.Schemas.Event
    }
  }
  namespace EventsRetrieve {
    namespace Parameters {
      export type Id = number
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      export type $200 = Components.Schemas.Event
    }
  }
  namespace ImagesCreate {
    export type RequestBody = Components.Schemas.ImageRequest
    namespace Responses {
      export type $201 = Components.Schemas.Image
    }
  }
  namespace UsersProfileRetrieve {
    namespace Responses {
      export type $200 = Components.Schemas.Profile
    }
  }
  namespace UsersRatingDataList {
    namespace Responses {
      export type $200 = Components.Schemas.AchievementRating[]
    }
  }
  namespace UsersRatingRetrieve {
    namespace Responses {
      export type $200 = Components.Schemas.Rating
    }
  }
  namespace UsersRetrieve {
    namespace Parameters {
      /**
       * Имя пользователя
       * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
       */
      export type Username = string
    }
    export interface PathParameters {
      username: /**
       * Имя пользователя
       * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
       */
      Parameters.Username
    }
    namespace Responses {
      export type $200 = Components.Schemas.User
    }
  }
  namespace UsersScoreConvertCreate {
    export type RequestBody = Components.Schemas.ScoreOperationRequest
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace UsersScoreSendCreate {
    namespace Parameters {
      /**
       * Имя пользователя
       * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
       */
      export type Username = string
    }
    export interface PathParameters {
      username: /**
       * Имя пользователя
       * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
       */
      Parameters.Username
    }
    export type RequestBody = Components.Schemas.ScoreOperationRequest
    namespace Responses {
      export type $200 = Components.Schemas.ScoreOperation
    }
  }
  namespace UsersSearchRetrieve {
    namespace Responses {
      export type $200 = Components.Schemas.Participant
    }
  }
}
