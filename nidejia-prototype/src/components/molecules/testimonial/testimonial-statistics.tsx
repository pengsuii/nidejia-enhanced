 

interface TestimonialStatisticsProps {
  averageRating: number;
  totalReviews: number;
  satisfactionRate: number;
  verifiedReviews: number;
}

function TestimonialStatistics({
  averageRating,
  totalReviews,
  satisfactionRate,
  verifiedReviews
}: TestimonialStatisticsProps) {
  const stats = [
    {
      value: averageRating.toFixed(1),
      label: "Average Rating",
      icon: "⭐",
      color: "text-black"
    },
    {
      value: totalReviews.toLocaleString(),
      label: "Total Reviews",
      icon: "💬",
      color: "text-black"
    },
    {
      value: `${satisfactionRate}%`,
      label: "Satisfaction Rate",
      icon: "😊",
      color: "text-black"
    },
    {
      value: verifiedReviews.toLocaleString(),
      label: "Verified Reviews",
      icon: "✅",
      color: "text-black"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-gray-light rounded-[20px] p-6 text-center"
        >
          <div className="text-3xl mb-2">{stat.icon}</div>
          <h3 className={`text-3xl font-bold ${stat.color} mb-2`}>
            {stat.value}
          </h3>
          <p className="text-gray-500 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default TestimonialStatistics;
