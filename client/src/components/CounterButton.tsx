import React from 'react'
import { HiPlus, HiMinus } from "react-icons/hi";

const CounterButton = (props: any) => {
  return (
    <div className='counter-button-wrapper'>
        <button>
            <HiMinus />
        </button>
        <input type='number' value={props.quantity}/>
        <button>
            <HiPlus />
        </button>
    </div>
  )
}

export default CounterButton