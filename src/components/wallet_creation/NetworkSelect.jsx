import React from 'react'

function NetworkSelect({setNetwork, gotoNextPage, nextPage, pages}) {
  
  return (
    <div className="h-full flex flex-col items-center justify-center">
        <div className="text-4xl text-slate-200 mb-4">{"Select Network ->"}</div>
        <div className="text-4xl text-slate-200 mb-10">
          {nextPage===pages.RecoveryPhrase?
          "For creating a new wallet.":
          "For importing a wallet."
          }
        </div>
        <div className="text-lg text-slate-500 text-center max-w-xl ">
          
          {nextPage===pages.RecoveryPhrase?
          "Select a network initially; the seed phrase created can be used to generate wallets on multiple networks.":
          "Select a network to import your wallet with a seed phrase."}
        </div>
        <div className='text-slate-200 text-3xl my-10'>
            <button onClick={()=>{
              setNetwork("solana");
              gotoNextPage(nextPage);
            }} className='bg-secondary hover:bg-secondary-hover active:bg-secondary-active rounded-2xl w-96 h-16 flex justify-start items-center'>
                <img src="src/assets/solana_logo.png" alt="logo" className='w-10 inline-block mx-2'/>
                <span className='inline-block mx-2'>Solana</span>
            </button>
            <button onClick={()=>{
              setNetwork("ethereum");
              gotoNextPage(nextPage);
            }}
            className='bg-secondary hover:bg-secondary-hover active:bg-secondary-active rounded-2xl w-96 h-16 flex justify-start items-center my-4'>
                <img src="src/assets/ethereum_logo.webp" alt="logo" className='w-10 inline-block mx-2'/>
                <span className='inline-block mx-2'>Ethereum</span>
            </button>
        </div>
    </div>
  )
}

export default NetworkSelect