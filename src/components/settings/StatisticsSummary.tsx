
export const StatisticsSummary = () => {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Statistics Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span>Current Streak</span>
          <span className="font-semibold">7 days</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span>Longest Streak</span>
          <span className="font-semibold">21 days</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span>Consistency Rate</span>
          <span className="font-semibold">84%</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span>Most Completed</span>
          <span className="font-semibold">Morning Meditation</span>
        </div>
      </div>
    </div>
  );
};
