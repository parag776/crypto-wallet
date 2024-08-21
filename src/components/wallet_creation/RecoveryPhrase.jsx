import React, { useEffect, useState } from 'react'
import {generateMnemonic, mnemonicToSeed} from "bip39";
import { createAccount } from '../../utils.js';

//import generate phrase from here.

function RecoveryPhrase({network, pages, setPageStack, gotoNextPage, setAccountList}) {

    const [isPhraseCopied, setIsPhraseCopied] = useState(false);
    const [secretPhrase, setSecretPhrase] = useState(generateMnemonic());


    const clipBoardCopy = function(){
        navigator.clipboard.writeText(secretPhrase);
        setIsPhraseCopied(true);
    }

    const onClick = function(){
        setAccountList((accountList)=>[...accountList, createAccount(secretPhrase, network)])
        setPageStack([]);
        gotoNextPage(pages.Wallet)
    }

  return (
    <div className="h-full flex flex-col justify-center items-center">
        <div className="text-4xl text-slate-200 mb-4">Secret Recovery Phrase</div>
        
        <div className="text-lg text-red-800 text-center max-w-xl">!!!! SAVE THE RECOVERY PHRASE BEFORE PROCEEDING !!!!</div>
        <div className="text-lg text-slate-500 text-center max-w-xl my-4">We don't believe in passwords. Once you’ve passed this point, there’s no way to recover your phrase.</div>

        <div onClick={clipBoardCopy} className='cursor-pointer flex flex-col items-center bg-secondary hover:bg-secondary-hover active:bg-secondary-active w-144  rounded-3xl'>
            <div className="grid-cols-3 grid gap-x-28 h-64 items-center text-slate-200 py-4">
                {secretPhrase.split(" ").map((word, index)=>{
                    return <div key={index}>{index+1} {word}</div>
                })}
            </div>
            <div className='h-px border border-slate-400 w-128'></div>
            <div className='my-4 text-slate-200'>
                {isPhraseCopied?"Succesfully copied to clipboard":"click on the box to copy to clipboard"}
            </div>
        </div>
        <button onClick={onClick} className="bg-primary hover:bg-primary-hover active:bg-primary-active text-dark rounded-2xl w-72 h-10 text-lg shadow-slate-400 shadow-md my-8 text-slate-800 font-semibold">Take me to my wallet</button>
    </div>
  )
}

export default RecoveryPhrase