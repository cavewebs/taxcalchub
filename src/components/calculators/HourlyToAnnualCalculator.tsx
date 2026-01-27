"use client";

import { useState } from "react";
import { hourlyToAnnual } from "@/lib/calculators";
import { formatCurrency } from "@/lib/formatting";

export default function HourlyToAnnualCalculator() {
  const [hourlyRate, setHourlyRate] = useState<string>("35");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");
  const [weeksPerYear, setWeeksPerYear] = useState<string>("52");
  const [results, setResults] = useState<{
    annualSalary: number;
    monthlySalary: number;
    weeklySalary: number;
    dailyRate: number;
  } | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const rate = parseFloat(hourlyRate);
    const hours = parseFloat(hoursPerWeek);
    const weeks = parseFloat(weeksPerYear);

    if (isNaN(rate) || isNaN(hours) || isNaN(weeks)) return;
    if (rate <= 0 || hours <= 0 || weeks <= 0) return;

    const annual = hourlyToAnnual(rate, hours, weeks);
    const monthly = annual / 12;
    const weekly = rate * hours;
    const daily = rate * 8;

    setResults({
      annualSalary: annual,
      monthlySalary: monthly,
      weeklySalary: weekly,
      dailyRate: daily,
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Hourly to Annual Salary Calculator
      </h2>
      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
            Hourly Rate ($)
          </label>
          <input
            id="hourlyRate"
            type="number"
            min="0"
            step="1"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 35"
            required
          />
        </div>

        <div>
          <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-gray-700 mb-1">
            Hours Per Week
          </label>
          <input
            id="hoursPerWeek"
            type="number"
            min="1"
            max="168"
            step="1"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 40"
            required
          />
        </div>

        <div>
          <label htmlFor="weeksPerYear" className="block text-sm font-medium text-gray-700 mb-1">
            Working Weeks Per Year
          </label>
          <input
            id="weeksPerYear"
            type="number"
            min="1"
            max="52"
            step="1"
            value={weeksPerYear}
            onChange={(e) => setWeeksPerYear(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 52"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
        >
          Convert to Annual Salary
        </button>
      </form>

      {results && (
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Your Salary Breakdown
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Annual Salary</p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(results.annualSalary)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Monthly Salary</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.monthlySalary)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Weekly Salary</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.weeklySalary)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Daily Rate (8hr)</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.dailyRate)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
