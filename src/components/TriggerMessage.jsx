const TriggerMessage = ({item, triggers}) => {

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
    <div className='flex justify-end items-center'>
      <div className='w-[60%] bg-dark-neutral-a40 rounded-md p-4'>
        <h1 className='text-center px-2 mb-2'><span className='font-bold'>{item.name}</span> has <span className='font-bold'>{triggers.length}</span> possible triggers with <span className='font-bold'>{totalYesSum}</span> votes in favor out of a total of <span className='font-bold'>{totalVotes}</span> general votes.</h1>
        <h4 className='bg-dark-primary-a20 px-2 text-center rounded-md text-bold'>Please review the list bellow of triggers carefully and exercise caution if you are sensitive to any of them.</h4>
      </div>
    </div>
  );
}

export default TriggerMessage;