const usePropertyHeroProps = (props: Record<any, any>) => {
  const { isHero, paddingFactor, showBadge } = props
  return {
    isHero,
    paddingFactor,
    showBadge,
  }
}

export { usePropertyHeroProps }
