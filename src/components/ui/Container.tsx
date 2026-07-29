import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'small' | 'large' | 'full'
}

const sizeClasses = {
  default: 'max-w-7xl',
  small: 'max-w-3xl',
  large: 'max-w-[1400px]',
  full: 'max-w-full',
}

export default function Container({ children, className = '', size = 'default' }: ContainerProps) {
  return (
    <div className={cn(
      'mx-auto w-full px-4 sm:px-6 lg:px-8',
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  )
}