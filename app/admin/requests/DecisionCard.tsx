"use client";
import React, { useState } from 'react'

function DecisionCard({item, decideUponTheFateOfTheRequest}: {item: {requestID: number, class: string, studentRoll: string}, decideUponTheFateOfTheRequest: (requestID: number, decision: boolean) => any}) {
  const [disabled, setDisabled] = useState(false);
  return (
    <div className="bg-border-color p-4 flex justify-between rounded-lg items-center">
      <div className="flex flex-col">
        <h2 className="text-primary-color">{item.class}</h2>
        <h2 className="text-secondary-color">{item.studentRoll}</h2>
      </div>
      <div className="flex items-center gap-4">
        {/* <h2>{item.enrollInClass}</h2> */}
        <button disabled={disabled} onClick={async () => { await decideUponTheFateOfTheRequest(item.requestID, true); setDisabled(true); }} className={`button-primary ${disabled ? 'bg-gray-700' : 'bg-green-700'}`}>Approve</button>
        <button disabled={disabled} onClick={async () => { await decideUponTheFateOfTheRequest(item.requestID, false); setDisabled(true); }} className={`button-primary ${disabled ? 'bg-gray-700' : 'bg-red-700'}`}>Deny</button>
      </div>
    </div>
  )
}

export default DecisionCard