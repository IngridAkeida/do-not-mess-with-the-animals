'use client';

import { useMemo, useState } from "react";

const TriggerResult = ({triggers, item}) => {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const { filteredTriggers } = useMemo(() => {

    const filteredTriggers = triggers.filter(trigger => {
      if (filter === 'all') return true;
      if (filter === trigger.name) return true;
      
      return false;
    });
    return { filteredTriggers };
  }, [triggers, filter]);

  console.log('triggers', triggers);
  console.log('Filter:', filter);
  console.log('filteredTriggers:', filteredTriggers);


  //yesSum totals 
  const totalYesSum = triggers.reduce((total, trigger) => {
    const triggerTotal = trigger.topics.reduce((triggerTotal, topic) => {
      return triggerTotal + topic.yesSum;
    }, 0);
    return total + triggerTotal;
  }, 0);

  //noSum totals
  const totalnoSum = triggers.reduce((total, trigger) => {
    const triggerTotal = trigger.topics.reduce((triggerTotal, topic) => {
      return triggerTotal + topic.noSum;
    }, 0);
    return total + triggerTotal;
  }, 0);

  //total votes 
  const totalVotes = totalYesSum + totalnoSum;

  return (
    <div className=''>
      <div className='bg-dark-neutral-a40 m-2 rounded-md p-4 mb-2'>
        <h1 className='text-center px-2 mb-2'><span className='font-bold'>{item.name}</span> has <span className='font-bold'>{triggers.length}</span> possible triggers with <span className='font-bold'>{totalYesSum}</span> votes in favor out of a total of <span className='font-bold'>{totalVotes}</span> general votes.</h1>
        <h4 className='bg-red-900 px-2 text-center rounded-md text-bold'>Please review the list of triggers carefully and exercise caution if you are sensitive to any of them.</h4>
      </div>
      {
        filteredTriggers.length === 0 ? (
            <div>
              <p className='bg-dark-neutral-a40 m-2 rounded-md p-4 mb-2'>There are no topics for this trigger.</p>
            </div>
          ) : (
            <div>
              <div className='p-4 rounded-md shadow-md'>
                <h3 className='text-lg font-semibold mb-2'>Filter by:</h3>
                <select id='filter' value={filter} onChange={handleFilterChange} className='p-2 rounded-md w-full text-black'>
                  <option value='all'>All</option>
                  {triggers.map((trigger, index) => (
                    <option key={index} value={trigger.name}>{trigger.name}</option>
                  ))}
                </select>
              </div>
              <div>
                {filteredTriggers.filter(trigger => trigger.name !== 'Unanswered Triggers').map((trigger, index) => (
                <div key={index}>
                  <h2 className='font-bold pl-4 mb-2'>{trigger.name}</h2>
                  <ul>
                    {trigger.topics.map((topic, index) => (
                      <li key={index}>
                        <div className='bg-dark-neutral-a40 m-2 rounded-md p-4 mb-2'>
                          <h2>{topic.doesName}?</h2>
                          <div className='flex gap-2 text-center items-center pt-1'>
                            <p className='bg-red-500 text-center rounded-full w-20 h-auto'>Yes: {topic.yesSum}</p>
                            <p className='bg-green-500 text center rounded-full w-20 h-auto'>No: {topic.noSum}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                ))}
              </div>
            </div>
          )
        }  
    </div>  
  );
};

export default TriggerResult;
  