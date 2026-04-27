import Image from 'next/image'

interface LogoProps {
  variant?: 'main' | 'icon' | 'simple' | 'favicon'
  size?: number
  className?: string
}

export function Logo({ variant = 'simple', size = 32, className = '' }: LogoProps) {
  const logos = {
    main: {
      src: '/logo-main.svg',
      width: 200,
      height: 50,
      alt: 'CrossPlatform Clipboard Logo',
    },
    icon: {
      src: '/logo-icon.svg',
      width: 64,
      height: 64,
      alt: 'CrossPlatform Clipboard Icon',
    },
    simple: {
      src: '/logo-simple.svg',
      width: 32,
      height: 32,
      alt: 'CrossPlatform Clipboard Simple',
    },
    favicon: {
      src: '/favicon.svg',
      width: 32,
      height: 32,
      alt: 'CrossPlatform Clipboard Favicon',
    },
  }

  const logo = logos[variant]

  return (
    <div className={`inline-flex items-center ${className}`}>
      <Image
        src={logo.src}
        alt={logo.alt}
        width={variant === 'main' ? logo.width : size}
        height={variant === 'main' ? logo.height : size}
        className={variant === 'main' ? 'w-auto h-auto' : ''}
        priority
      />
    </div>
  )
}

export default Logo
