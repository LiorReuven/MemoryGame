import React from 'react'

const Card = (props) => {

  const cardClass = props.state ? " active " + props.state : "";

  return (
    <div className={'card' + cardClass} onClick={() => {props.clickHandler(props.index)}}>
      <img src={props.img} alt="" />
    </div>
  )
}

export default Card