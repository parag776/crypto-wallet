import React from 'react'

function Wallet({network, set}) {



  const addWallet = function(network, seed){
    setAccountList((accountList)=>{
      const newList = [];
      for(let i=0;i<accountList.length;i++){
        if(accountList.seed===seed){
          newList.push(createWalletAndCloneAccount(accountList[i], network));
        } else {
          newList.push(accountList[i]);
        }
      }
      return newList;
    })
  }
    
  return (
    <div className='flex flex-col items-center justify-center'>
            <button className='bg-secondary hover:bg-secondary-hover active:bg-secondary-active rounded-2xl w-96 h-16 flex justify-start items-center'>
                <img src="/solana_logo.png" alt="logo" className='w-10 inline-block mx-2'/>
                <span className='inline-block mx-2'>Solana</span>
            </button>
    </div>
  )
}

export default Wallet