import React from 'react'

function LandingPage({pages, gotoNextPage}) {
  return (
    <div className='h-full flex flex-col justify-evenly items-center font-mono'>
        <div className="flex flex-col items-center">
            <img src="/wallet_logo.png" alt="logo" className='w-24 mb-7'/>
            <div className="text-slate-200 text-3xl mb-3">Welcome To Singh Crypto Wallet</div>
            <div className='text-slate-500 text-xl'>..lets get started..</div>
        </div>
        <div className="flex flex-col justify-around">
            <button onClick={()=>gotoNextPage(pages.NetworkSelect)} className="bg-primary hover:bg-primary-hover active:bg-primary-active text-dark rounded-2xl w-72 h-10 text-lg shadow-slate-400 shadow-sm mb-5">Create a new wallet</button>
            <button onClick={()=>gotoNextPage(pages.NetworkSelectForImport)} className="bg-secondary hover:bg-secondary-hover active:bg-secondary-active text-slate-200 rounded-2xl w-72 h-10 text-lg shadow-slate-400 shadow-sm">Add an existing wallet</button>
        </div>
    </div>
  )
}

export default LandingPage