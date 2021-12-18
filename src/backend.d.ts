declare namespace Components {
  namespace Schemas {
    export interface Profile {
      /**
       * Имя пользователя
       * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
       */
      username: string
      /**
       * Адрес электронной почты
       */
      email: string // email
      /**
       * Имя
       */
      firstName: string
      /**
       * Фамилия
       */
      lastName: string
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
  namespace UsersSearchList {
    namespace Parameters {
      export type User = string
    }
    export interface QueryParameters {
      user: Parameters.User
    }
    namespace Responses {
      export type $200 = Components.Schemas.User[]
    }
  }
}
