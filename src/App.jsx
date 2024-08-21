import { useState } from 'react'
import _ from 'lodash';

import './App.css'
import LandingPage from './components/wallet_creation/LandingPage'
import NetworkSelect from './components/wallet_creation/NetworkSelect'
import RecoveryPhrase from './components/wallet_creation/RecoveryPhrase'
import BackArrow from './components/BackArrow'
import Wallet from './components/Wallet'
import ImportPhrase from './components/wallet_creation/ImportPhrase'

function App() {

  const pages = {
    LandingPage: "LandingPage",
    NetworkSelect: "NetworkSelect",
    NetworkSelectForImport: "NetworkSelectForImport",
    RecoveryPhrase: "RecoveryPhrase",
    Wallet: "wallet",
    ImportPhrase: "ImportPhrase",
  }

  const [network, setNetwork] = useState("ethereum");
  const [accountList, setAccountList] = useState([]);
  const [pageStack, setPageStack] = useState([pages.LandingPage])

  const gotoNextPage = function(page){
    setPageStack((pageStack)=>{
      return [...pageStack, page];
    })
  }

  const gotoBackPage = function(){
    setPageStack((pageStack)=>{
      let curPageStack = [];
      for(let i=0;i<pageStack.length-1;i++){
        curPageStack.push(pageStack[i]);
      }
      return curPageStack;
    })
  }

  return (
    <>
      <div className='h-svh w-full font-mono flex flex-col justify-center items-center' >
        <div className='h-5/6 max-w-144'>
          {pageStack.length>1 && <BackArrow onClick={gotoBackPage}/>}
          {pageStack[pageStack.length-1]===pages.LandingPage && <LandingPage pages={pages} gotoNextPage={gotoNextPage}/>}
          {pageStack[pageStack.length-1]===pages.NetworkSelect && <NetworkSelect setNetwork={setNetwork} gotoNextPage={gotoNextPage} pages={pages} nextPage={pages.RecoveryPhrase}/>}
          {pageStack[pageStack.length-1]===pages.NetworkSelectForImport && <NetworkSelect setNetwork={setNetwork} gotoNextPage={gotoNextPage} pages={pages} nextPage={pages.ImportPhrase}/>}
          {pageStack[pageStack.length-1]===pages.RecoveryPhrase && <RecoveryPhrase network={network} pages={pages} setPageStack={setPageStack} gotoNextPage={gotoNextPage} setAccountList={setAccountList}/>}
          {pageStack[pageStack.length-1]===pages.Wallet && <Wallet network={network} setNetwork={setNetwork} accountList={accountList} setAccountList={setAccountList}/>}
          {pageStack[pageStack.length-1]===pages.ImportPhrase && <ImportPhrase pages={pages} gotoNextPage={gotoNextPage} setPageStack={setPageStack} network={network} setAccountList={setAccountList}/>}
          
        </div>
      </div>
      
    </>
  )
}

export default App
