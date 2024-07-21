"use client";
import React,{useState, useEffect} from 'react'
import Confetti from 'react-dom-confetti';
const ConfettiWrapper = () => {
    const [showConfetti, setShowConfetti] = useState(false)
    useEffect(()=> setShowConfetti(true))
  return (
    <>
    <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center">
      <Confetti active={showConfetti} config={{elementCount: 400, spread: 120}}/> 
      </div>
    </>
  )
}

export default ConfettiWrapper