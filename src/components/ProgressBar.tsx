
interface ProgressBarProps {
  value: number;
  maxValue: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const ProgressBar = ({ 
  value, 
  maxValue, 
  label, 
  size = 'md', 
  color = 'bg-primary'
}: ProgressBarProps) => {
  const percentage = Math.round((value / maxValue) * 100);
  
  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }[size];
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">{value}/{maxValue}</span>
      </div>
      <div className={`w-full bg-muted rounded-full ${heightClass} overflow-hidden`}>
        <div 
          className={`${color} rounded-full ${heightClass} transition-all duration-500 ease-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
