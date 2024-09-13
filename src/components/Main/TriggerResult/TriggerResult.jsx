'use client';
import { useMemo, useState } from "react";

const TriggerResult = ({triggers}) => {
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

  return (
    <div className='flex flex-col my-2'>
      {
        filteredTriggers.length <= 0 ? (
            <div className=''>
              <p className='bg-dark-neutral-a40 m-2 rounded-md p-4 mb-2'>There are no topics for this trigger.</p>
            </div>
          ) : (
            <div className='bg-dark-neutral-a40 rounded-md mb-2'>
              <div className='flex h-[500px] overflow-x-auto bg-dark-neutral-a30 rounded-md p-4'>
                <div className='w-2/6 sticky top-0'>
                  <div className='p-4 rounded-md shadow-md bg-dark-neutral-a40'>
                    <h3 className='font-bold mb-2'>Filter by:</h3>
                    <select id='filter' value={filter} onChange={handleFilterChange} className='p-2 rounded-md w-full text-dark-neutral-a0 bg-dark-neutral-a50'>
                      <option value='all'>All</option>
                      {triggers.filter(trigger => trigger.name !== 'Unanswered Triggers').map((trigger, index) => (
                        <option key={index} value={trigger.name}>{trigger.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='w-4/6'>
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
            </div>
          )
        }  
    </div>  
  );
};

export default TriggerResult;
  