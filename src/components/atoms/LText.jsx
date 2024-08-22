import React from 'react'

const LText = ({className = "", style={}, children = null}) => {
  return (
    <div className={`${className} text-lg`} style={style}>{children}</div>
  )
}

export default LText