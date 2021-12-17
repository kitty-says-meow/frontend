export interface User {
  corpEmail: string
  email: string
  familyName: string
  gender: string
  givenName: string
  id: string
  middleName: string
  avatarUrl: string
  name: string
}

export const parseJWT = (
  token: string,
): Record<
  | `corp_email`
  | `email`
  | `family_name`
  | `gender`
  | `given_name`
  | `id`
  | `middle_name`
  | `name`
  | `avatar_url`,
  string
> => {
  const base64Url = token.split(`.`)[1]
  const base64 = base64Url.replace(/-/g, `+`).replace(/_/g, `/`)
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split(``)
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(``),
  )

  return JSON.parse(jsonPayload)
}

export const getUser = (): User => {
  const accessToken = localStorage.getItem(`access`)

  if (!accessToken) {
    throw new Error(`Unauthorized`)
  }

  const {
    avatar_url,
    corp_email,
    email,
    family_name,
    gender,
    given_name,
    id,
    middle_name,
    name,
  } = parseJWT(accessToken)

  return {
    id,
    email,
    gender,
    name,
    avatarUrl: avatar_url,
    corpEmail: corp_email,
    familyName: family_name,
    givenName: given_name,
    middleName: middle_name,
  }
}
