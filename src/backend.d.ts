declare namespace Components {
  namespace Schemas {
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
  namespace SchemaRetrieve {
    namespace Parameters {
      export type Format = 'json' | 'yaml'
      export type Lang =
        | 'af'
        | 'ar'
        | 'ar-dz'
        | 'ast'
        | 'az'
        | 'be'
        | 'bg'
        | 'bn'
        | 'br'
        | 'bs'
        | 'ca'
        | 'cs'
        | 'cy'
        | 'da'
        | 'de'
        | 'dsb'
        | 'el'
        | 'en'
        | 'en-au'
        | 'en-gb'
        | 'eo'
        | 'es'
        | 'es-ar'
        | 'es-co'
        | 'es-mx'
        | 'es-ni'
        | 'es-ve'
        | 'et'
        | 'eu'
        | 'fa'
        | 'fi'
        | 'fr'
        | 'fy'
        | 'ga'
        | 'gd'
        | 'gl'
        | 'he'
        | 'hi'
        | 'hr'
        | 'hsb'
        | 'hu'
        | 'hy'
        | 'ia'
        | 'id'
        | 'ig'
        | 'io'
        | 'is'
        | 'it'
        | 'ja'
        | 'ka'
        | 'kab'
        | 'kk'
        | 'km'
        | 'kn'
        | 'ko'
        | 'ky'
        | 'lb'
        | 'lt'
        | 'lv'
        | 'mk'
        | 'ml'
        | 'mn'
        | 'mr'
        | 'my'
        | 'nb'
        | 'ne'
        | 'nl'
        | 'nn'
        | 'os'
        | 'pa'
        | 'pl'
        | 'pt'
        | 'pt-br'
        | 'ro'
        | 'ru'
        | 'sk'
        | 'sl'
        | 'sq'
        | 'sr'
        | 'sr-latn'
        | 'sv'
        | 'sw'
        | 'ta'
        | 'te'
        | 'tg'
        | 'th'
        | 'tk'
        | 'tr'
        | 'tt'
        | 'udm'
        | 'uk'
        | 'ur'
        | 'uz'
        | 'vi'
        | 'zh-hans'
        | 'zh-hant'
    }
    export interface QueryParameters {
      format?: Parameters.Format
      lang?: Parameters.Lang
    }
    namespace Responses {
      export interface $200 {
        [name: string]: any
      }
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
