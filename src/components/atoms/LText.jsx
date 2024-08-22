import { twMerge } from 'tailwind-merge'

const LText = ({className = "text-white", style={}, children = null}) => {
  return (
    <div className={twMerge(`${className} text-lg`)} style={style}>{children}</div>
  )
}

export default LText