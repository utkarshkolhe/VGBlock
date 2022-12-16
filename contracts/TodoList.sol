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
    toggleCompleted(1);
  }

  function createTask(string memory _content) public{
    taskCount++;
    tasks[taskCount]=Task(taskCount,_content,false);
  }
  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    // emit TaskCompleted(_id, _task.completed);
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
