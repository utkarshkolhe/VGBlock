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
    createLicence("a@abc.com","GG1","asdjdoajdhi",false);
  }

  function createLicence(string memory email,string memory gameid,string memory key,bool transferable) public{
    dataCount++;
    datablocks[dataCount]=Datablock(dataCount,email,gameid,key,transferable);
  }

  function transferlicence(uint id, string memory newemail) public{
    datablocks[id].email = newemail;
  }

}
