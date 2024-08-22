import React from 'react'

const Heading = ({className = "", style={}, children = null}) => {
  return (
    <div className={`${className} text-[4rem] leading-[4rem]`} style={style}>
        {children}
    </div>
  )
}

export default Heading