type SkeletonProps = {
  cols?: number;
  rows?: number;
};

export default function SkeletonLoading({ rows = 1, cols = 1 }: SkeletonProps) {
  return (
    <div className="flex w-full">
      <div
        className={`flex flex-col w-full md:grid md:grid-cols-${cols} gap-4`}
      >
        {Array.from({ length: rows * cols }).map((_, i) => (
          <div key={i} className="skeleton w-full h-5 dark:bg-slate-600"></div>
        ))}
      </div>
    </div>
  );
}
