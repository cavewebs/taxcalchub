"use client";

import { useState } from "react";
import { salaryToHourly } from "@/lib/calculators";
import { formatCurrency } from "@/lib/formatting";
import CalculatorCard from "@/components/CalculatorCard";

export default function SalaryToHourlyCalculator() {
  const [salary, setSalary] = useState<string>("50000");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");
  const [weeksPerYear, setWeeksPerYear] = useState<string>("52");
  const [results, setResults] = useState<{
    hourly: number;
    daily: number;
    weekly: number;
    monthly: number;
    annual: number;
  } | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const annualSalary = parseFloat(salary);
    const hours = parseFloat(hoursPerWeek);
    const weeks = parseFloat(weeksPerYear);

    if (
      isNaN(annualSalary) ||
      isNaN(hours) ||
      isNaN(weeks) ||
      annualSalary < 0 ||
      hours <= 0 ||
      weeks <= 0
    )
      return;

    const hourly = salaryToHourly(annualSalary, hours, weeks);
    const daily = hourly * (hours / 5);
    const weekly = hourly * hours;
    const monthly = annualSalary / 12;

    setResults({
      hourly,
      daily,
      weekly,
      monthly,
      annual: annualSalary,
    });
  }

  return (
    <CalculatorCard>
      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label
            htmlFor="salary"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Annual Salary ($)
          </label>
          <input
            id="salary"
            type="number"
            min="0"
            step="100"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 50000"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="hours"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Hours per Week
            </label>
            <input
              id="hours"
              type="number"
              min="1"
              max="168"
              step="1"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label
              htmlFor="weeks"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Weeks per Year
            </label>
            <input
              id="weeks"
              type="number"
              min="1"
              max="52"
              step="1"
              value={weeksPerYear}
              onChange={(e) => setWeeksPerYear(e.target.value)}
              className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
        >
          Convert Salary
        </button>
      </form>

      {results && (
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Your Pay Breakdown
          </h3>
          <div className="overflow-hidden rounded-lg border border-card-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    Period
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-card-border">
                  <td className="px-4 py-3 font-medium text-foreground">
                    Hourly Rate
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-primary">
                    {formatCurrency(results.hourly)}
                  </td>
                </tr>
                <tr className="border-t border-card-border">
                  <td className="px-4 py-3 font-medium text-foreground">
                    Daily Rate
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-foreground">
                    {formatCurrency(results.daily)}
                  </td>
                </tr>
                <tr className="border-t border-card-border">
                  <td className="px-4 py-3 font-medium text-foreground">
                    Weekly Pay
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-foreground">
                    {formatCurrency(results.weekly)}
                  </td>
                </tr>
                <tr className="border-t border-card-border">
                  <td className="px-4 py-3 font-medium text-foreground">
                    Monthly Pay
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-foreground">
                    {formatCurrency(results.monthly)}
                  </td>
                </tr>
                <tr className="border-t border-card-border bg-muted">
                  <td className="px-4 py-3 font-semibold text-foreground">
                    Annual Salary
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-foreground">
                    {formatCurrency(results.annual)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </CalculatorCard>
  );
}
