declare namespace Components {
  namespace Schemas {
    export interface AchievementCreate {
      id: number
      /**
       * Название
       */
      name: string
      /**
       * Баллы
       */
      score: number
      /**
       * Пользователь
       */
      user: null | number
    }
    export interface AchievementCreateRequest {
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
      achievements: AchievementCreate[]
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
      achievements: AchievementCreateRequest[]
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
       * Баллы ПГАС
       */
      pgasScore: number
      /**
       * Личные баллы
       */
      personalScore: number
      /**
       * Адрес электронной почты
       */
      email: string // email
      departments: Department[]
    }
    export interface ScoreOperation {
      score: number
    }
    export interface ScoreOperationRequest {
      score: number
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
       * Баллы ПГАС
       */
      pgasScore: number
      /**
       * Личные баллы
       */
      personalScore: number
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
  namespace UsersProfileRetrieve {
    namespace Responses {
      export type $200 = Components.Schemas.Profile
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
      export type $200 = Components.Schemas.User
    }
  }
}
