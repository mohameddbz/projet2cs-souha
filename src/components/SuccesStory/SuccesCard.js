import React from 'react'
import succes from '../../assets/images/succes.png'
import './SuccesStory.css'

function SuccesCard (props) {
  return (
    <div className='succesCard-full-conatiner' id={props.key}>
        <div className='succesCard-container'>
            <img className='succesImg' src={props.picture} alt=''></img>
            <div className='SuccesDescription'>
                <div className='SuccesTitle'>
                    {props.titre}
                </div>
                <div className='SuccesParag'>
                    {props.description}
                </div>
            </div>
        </div>
    </div>
  )
}

export default SuccesCard;