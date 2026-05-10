import { BookOpen, Users, TrendingUp, Calendar } from 'lucide-react';

interface StatCardsProps {
  totalBooks: number;
  uniqueAuthors: number;
  searchResultCount: number;
  searchQuery: string;
  latestBookDate: string | null;
}

export default function StatCards({
  totalBooks,
  uniqueAuthors,
  searchResultCount,
  searchQuery,
  latestBookDate,
}: StatCardsProps) {
  const stats = [
    {
      label: 'Total Books',
      value: totalBooks,
      icon: BookOpen,
      iconBg: 'bg-[#ede9fe] dark:bg-[#6c5ce7]/20',
      iconColor: 'text-[#6c5ce7] dark:text-[#a29bfe]',
      change: `${totalBooks} in library`,
      changeColor: 'text-[#10b981] dark:text-[#34d399]',
    },
    {
      label: 'Unique Authors',
      value: uniqueAuthors,
      icon: Users,
      iconBg: 'bg-[#fef3c7] dark:bg-[#f59e0b]/20',
      iconColor: 'text-[#f59e0b] dark:text-[#fcd34d]',
      change: `${uniqueAuthors} contributors`,
      changeColor: 'text-[#10b981] dark:text-[#34d399]',
    },
    {
      label: 'Search Results',
      value: searchResultCount,
      icon: TrendingUp,
      iconBg: 'bg-[#dbeafe] dark:bg-[#3b82f6]/20',
      iconColor: 'text-[#3b82f6] dark:text-[#93c5fd]',
      change: searchQuery ? `matching "${searchQuery}"` : 'showing all',
      changeColor: 'text-[#8b8fa3] dark:text-[#5a5d6e]',
    },
    {
      label: 'Latest Added',
      value: latestBookDate || '—',
      icon: Calendar,
      iconBg: 'bg-[#d1fae5] dark:bg-[#10b981]/20',
      iconColor: 'text-[#10b981] dark:text-[#6ee7b7]',
      change: 'last entry',
      changeColor: 'text-[#10b981] dark:text-[#34d399]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {stats.map(({ label, value, icon: Icon, iconBg, iconColor, change, changeColor }) => (
        <div key={label} className="stat-card">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#8b8fa3] dark:text-[#5a5d6e]">
              {label}
            </span>
            <div className={`flex items-center justify-center w-9 h-9 rounded-xl ${iconBg}`}>
              <Icon className={`w-[18px] h-[18px] ${iconColor}`} />
            </div>
          </div>
          <div>
            <div className="text-[28px] font-bold text-[#1a1d26] dark:text-[#e2e4e9] leading-none tracking-tight">
              {value}
            </div>
            <p className={`text-[11px] font-medium mt-1.5 ${changeColor}`}>
              {change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
