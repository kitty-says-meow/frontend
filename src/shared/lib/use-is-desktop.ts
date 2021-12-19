import { useMediaQuery } from '.'

export const useIsDesktop = () => {
  const { isMatch } = useMediaQuery(`(min-width: 1024px)`)
  return { isDesktop: isMatch }
}
