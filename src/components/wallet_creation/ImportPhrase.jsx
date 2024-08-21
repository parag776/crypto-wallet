import React from 'react'
import { useState } from 'react';

import { createAccount } from '../../utils.js';

function ImportPhrase({setPageStack, gotoNextPage, pages, network, setAccountList}) {

  const [wordArray, setWordArray] = useState(new Array(12).fill(""));
  

  const getWordArray = function(id, seedText){
    const text = seedText + " ";

    // pasting words
    let curWordArray = [...wordArray];
    let curWord = "";
    let pastePos = true;
    let oneTime = false;
    for(let c of text){
      if(c===' ') {
        if(curWord!=="") {
          oneTime = true;
          curWordArray[id] = curWord;
          id++;
        }
        curWord = "";
        if(id===curWordArray.length) break;
        continue;
      }
      if(c<'a' || c>'z'){
        alert("Please input a valid string.");
        pastePos = false;
        break;
      }
      curWord+=c;
    }
    if(!pastePos) return pastePos;
    if(!oneTime) curWordArray[id] = "";
    return curWordArray;
  }

  const onChangeInput = function(e){
    const {target} = e;
    let id = Number(target.getAttribute("id"));
    const curWordArray = getWordArray(id, target.value);
    if(!curWordArray) return;
    setWordArray(curWordArray);
  }
  const changeWordLen = function(len){
    setWordArray(new Array(len).fill(""));
  }

  const toWallet = function(){
    setAccountList((accountList)=>[...accountList, createAccount(wordArray.join(" ").toString(), network)])
    setPageStack([]);
    gotoNextPage(pages.Wallet)
  }

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <div className='text-4xl text-slate-200 mb-10'>Secret Recovery Phrase</div>
      <div className="text-lg text-slate-500 text-center max-w-xl mb-6">Enter or paste your 12 or 24-word phrase</div>
      <div className='flex flex-row justify-around items-center text-amber-700 w-full mb-6'>
        <div onClick={()=>changeWordLen(12)} className='cursor-pointer'>Use 12 Words</div>
        <div onClick={()=>changeWordLen(24)} className='cursor-pointer'>Use 24 Words</div>
      </div>
      <div className='grid grid-cols-3 gap-2 text-slate-300 grid-cols-auto-fit min-w-full mb-6'>
        {wordArray.map((word, index)=>{
          return <div key={index} className='bg-secondary rounded-lg text-center py-1 hover:bg-secondary-hover'>
            <div className='flex justify-between p-1'>
            <div className='mx-1  text-slate-400'>{index+1}</div>
            <input type="text" id={index} value={word} onChange={onChangeInput} className='w-9/12 mx-2 bg-transparent outline-none' autoComplete='off'/>
            </div>
          </div>
        })}
      </div>
      <div className='text-lg text-red-800 text-center '>!!! VERIFY YOUR RECOVERY PHRASE BEFORE PROCEEDING !!!</div>
      <button onClick={toWallet} className="bg-primary hover:bg-primary-hover active:bg-primary-active text-dark rounded-2xl w-72 h-10 text-lg shadow-slate-400 shadow-md my-8 text-slate-800 font-semibold">Take me to my wallet</button>
    </div>
  )
}

export default ImportPhrase