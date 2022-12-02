pragma solidity ^0.5.0;
// pragma experimental ABIEncoderV2;
contract TodoList{
  uint public taskCount=0;
  struct Task{
    uint id;
    string content;
    bool completed;
  }

  mapping(uint=>Task) public tasks;

  constructor() public{
    createTask("Tasks");
  }

  function createTask(string memory _content) public{
    taskCount++;
    tasks[taskCount]=Task(taskCount,_content,false);
  }
  // function getTasks() external returns (uint[] memory){
  //
  //   uint[] memory taskids = new uint[](taskCount-1);
  //   for (uint i = 0; i < taskCount; i++) {
  //         taskids[i] = i+1;
  //   }
  //   return taskids;
  // }
}
