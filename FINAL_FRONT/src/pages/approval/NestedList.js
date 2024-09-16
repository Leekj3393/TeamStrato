import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callMemberListForAppAPI } from '../../apis/AppLineAPICalls';
import ApprovalCSS from './Approval.module.css';

function NestedList() {
  const [expandedItems, setExpandedItems] = useState([]);
  const { accessors } = useSelector(state => state.applineReducer);
  const dispatch = useDispatch();

  // 부서에 해당하는 동일 직급 직원 조회
  const renderMembers = (dept, jobName) => {
    if (!accessors) return null; // accessors가 undefined인 경우 처리

    const members = accessors.accessor.filter(
      accessor =>
        accessor.department.deptCode === dept.deptCode &&
        accessor.job.jobName === jobName
    );

    if (members.length === 0) return null;

    return (
      <ul>
        {members.map(member => (
          <li key={member.memberCode}>
            {member.memberName}
          </li>
        ))}
      </ul>
    );
  };

  const handleItemClick = (dept, jobName) => {
    const item = { dept, jobName };
    const isExpanded = expandedItems.some(
      expandedItem =>
        expandedItem.dept.deptCode === dept.deptCode && expandedItem.jobName === jobName
    );

    if (isExpanded) {
      setExpandedItems(expandedItems.filter(
        expandedItem => !(expandedItem.dept.deptCode === dept.deptCode && expandedItem.jobName === jobName)
      ));
    } else {
      setExpandedItems([...expandedItems, item]);
    }
  };

  useEffect(() => {
    dispatch(callMemberListForAppAPI());
  }, []);

  return (
    <div className={ApprovalCSS}>
      <div className={ApprovalCSS.square}></div>
      <div className={ApprovalCSS.appContectDiv}>
        <ul className={ApprovalCSS.memberChartUl}>
          {accessors?.dept && accessors.dept.map(dept => {
            const uniqueJobNames = new Set();
            accessors?.accessor.forEach(accessor => {
              if (accessor.department.deptCode === dept.deptCode) {
                uniqueJobNames.add(accessor.job.jobName);
              }
            });
            const jobNames = Array.from(uniqueJobNames);

            return (
              <li key={dept.deptCode}>
                <div className={ApprovalCSS.clickDeptDiv}>
                </div>
                  {dept.deptName}
                <ul>
                  {jobNames.map(jobName => {
                    const isExpanded = expandedItems.some(
                      expandedItem =>
                        expandedItem.dept.deptCode === dept.deptCode &&
                        expandedItem.jobName === jobName
                    );

                    return (
                      <li key={`${dept.deptCode}-${jobName}`} onClick={() => handleItemClick(dept, jobName)}>
                        {jobName}
                        {isExpanded && renderMembers(dept, jobName)}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default NestedList;