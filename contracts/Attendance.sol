// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Attendance {

    struct Record {
        string srn;
        string studentName;
        string subject;
        string session;
        string date;
        bool present;
        uint256 timestamp;
        address markedBy;
    }

    Record[] public records;
    address public teacher;

    event AttendanceMarked(
        uint256 indexed recordIndex,
        string srn,
        string subject,
        string session,
        string date,
        bool present,
        uint256 blockNumber,
        uint256 timestamp
    );

    modifier onlyTeacher() {
        require(msg.sender == teacher, "Not authorized");
        _;
    }

    constructor() {
        teacher = msg.sender;
    }

    function markAttendance(
        string memory srn,
        string memory studentName,
        string memory subject,
        string memory session,
        string memory date,
        bool present
    ) public onlyTeacher {
        uint256 idx = records.length;
        records.push(Record(
            srn, studentName, subject,
            session, date, present,
            block.timestamp, msg.sender
        ));
        emit AttendanceMarked(
            idx, srn, subject, session,
            date, present, block.number, block.timestamp
        );
    }

    function markBatchAttendance(
        string[] memory srns,
        string[] memory studentNames,
        string memory subject,
        string memory session,
        string memory date,
        bool[] memory presentFlags
    ) public onlyTeacher {
        require(srns.length == presentFlags.length, "Array mismatch");
        for (uint256 i = 0; i < srns.length; i++) {
            markAttendance(
                srns[i], studentNames[i],
                subject, session, date, presentFlags[i]
            );
        }
    }

    function getRecord(uint256 index) public view returns (Record memory) {
        return records[index];
    }

    function totalRecords() public view returns (uint256) {
        return records.length;
    }

    function getInfo() public view returns (
        address _teacher,
        uint256 _total
    ) {
        return (teacher, records.length);
    }
}
