import React from 'react'

interface TitleButtonProps { 
    key: number, 
    name: string
}
function TitleButton: React.FC<TitleButtonProps>({key, name}) {
  return (
    <div>{name}</div>
  )
}

export default TitleButton