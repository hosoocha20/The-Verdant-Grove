import React from 'react'
import { HiPlus, HiMinus } from "react-icons/hi";

interface CounterButtonProps{
  quantity: number;
  updateShoppingCartQuantity: () => void;
}

const CounterButton = (props: CounterButtonProps) => {
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