import Title from '@/components/atomics/title'
import CountUp from '@/components/atomics/count-up'
import Image from 'next/image'

const getTitleStyle = (section: string) => {
  switch (section) {
    case 'hero':
      return 'text-[55px] leading-[82.5px]'
    case 'header':
      return 'text-base font-semibold leading-6'
    case 'categories':
      return 'text-xl font-semibold leading-6'
    case 'facility':
      return 'text-xl font-semibold leading-[30px]'
    case 'detail':
      return 'font-bold text-lg leading-[27px] text-secondary'
    case 'booking':
      return 'font-bold text-lg leading-[27px] text-secondary'
    case 'empty': 
      return 'font-bold text-lg leading-[27px] text-secondary text-center'
    default:
      return 'text-2xl leading-9'
  }
}

const getSubtitleStyle = (section: string) => {
  switch (section) {
    case 'hero':
      return 'text-lg leading-8 text-secondary'
    case 'header':
      return 'text-sm leading-[21px] text-subtitle'
    case 'categories':
      return 'text-base leading-6 text-subtitle'
    case 'facility':
      return 'text-base leading-6 text-subtitle'
    case 'detail':
      return 'text-base leading-[30px] text-secondary pt-2.5'
    case 'booking':
      return 'text-base leading-[30px] text-subtitle pt-2.5'
    case 'empty':
      return 'text-base leading-[30px] text-subtitle pt-2.5 text-center'
    default:
      return 'leading-6 text-subtitle'
  }
}

function CardIndicator({
  icon,
  title,
  subtitle,
  variant = '',
  section = '',
  useCountUp = false,
  countUpFrom = 0,
  countUpDuration = 2,
  countUpSeparator = '',
}: {
  icon: string
  title: string
  subtitle: string
  variant?: 'indicator' | ''
  section: 'hero' | 'header' | 'categories' | ''
  useCountUp?: boolean
  countUpFrom?: number
  countUpDuration?: number
  countUpSeparator?: string
}) {
  // Determine animated number and its static suffix/prefix based on title pattern
  let animatedNumber = 0
  let staticSuffix = ''
  let staticPrefix = ''

  if (title.includes('/')) {
    // Handle patterns like "9/10"
    const [left, right] = title.split('/')
    animatedNumber = parseInt(left.replace(/[^\d]/g, '')) || 0
    staticSuffix = `/${right}`
  } else {
    // Default: extract all digits as number, keep non-digits as suffix (e.g., % or M)
    animatedNumber = parseInt(title.replace(/[^\d]/g, '')) || 0
    staticSuffix = title.replace(/[\d]/g, '')
  }

  return (
    <figure className={`flex items-center space-x-4 ${variant !== 'indicator' && 'bg-white px-5 py-4 rounded-[20px] border-[3px] border-white hover:border-primary cursor-pointer'}`}>
      <div className={variant === 'indicator' ? 'rounded-full p-[19px] bg-primary flex-shrink-0' : 'flex-shrink-0'}>
        <Image
          src={icon}
          alt='icon'
          height={32}
          width={32}
          className="w-8 h-8"
        />
      </div>
      <div className="flex-1">
        {useCountUp ? (
          <div className='flex flex-col'>
            <h1 className={`font-bold text-secondary text-2xl leading-9`}>
              <CountUp
                from={countUpFrom}
                to={animatedNumber}
                duration={countUpDuration}
                separator={countUpSeparator}
                direction="up"
                className="count-up-text"
              />
              {staticSuffix}
            </h1>
            <h2 className="leading-6 text-subtitle text-sm">
              {subtitle}
            </h2>
          </div>
        ) : (
          <Title
            title={title}
            subtitle={subtitle}
            section={section}
          />
        )}
      </div>
    </figure>
  )
}

export default CardIndicator
