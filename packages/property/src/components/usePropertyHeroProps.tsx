// Any is ok since we are destructuring props of any shape
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const usePropertyHeroProps = (props: Record<any, any>) => {
  const { isHero, paddingFactor, showBadge } = props
  return {
    isHero,
    paddingFactor,
    showBadge,
  }
}

export { usePropertyHeroProps }
