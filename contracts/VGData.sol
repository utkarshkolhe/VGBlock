pragma solidity ^0.5.0;

contract VGData{
  uint public dataCount=0;
  struct Datablock{
    uint id;
    string email;
    string gameid;
    string key;
    bool transferable;
  }

  mapping(uint=>Datablock) public datablocks;

  constructor() public{

    // createLicence("user123@hotmail.com","Grand Theft Auto","NJZFRYOW9Q",true);
    createLicence("user123@hotmail.com","Elder Scrolls Online","BX639G8OW",false);
    //
    createLicence("user456@hotmail.com","Age of Empires","7QWDGMXTEP",false);
    // createLicence("user456@hotmail.com","Warframe","Q8FE39G67B",false);
    // createLicence("user456@hotmail.com","FIFA","DJ6ADY72QL",true);


  }

  function createLicence(string memory email,string memory gameid,string memory key,bool transferable) public{
    dataCount++;
    datablocks[dataCount]=Datablock(dataCount,email,gameid,key,transferable);
  }

  function transferlicence(uint id, string memory newemail) public{
    datablocks[id].email = newemail;
  }

}
