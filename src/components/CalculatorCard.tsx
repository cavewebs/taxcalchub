interface CalculatorCardProps {
  children: React.ReactNode;
}

export default function CalculatorCard({ children }: CalculatorCardProps) {
  return (
    <div className="rounded-xl border border-card-border bg-card p-6 shadow-sm sm:p-8">
      {children}
    </div>
  );
}
