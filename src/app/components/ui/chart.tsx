"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "1", value: 186 },
  { month: "2", value: 305 },
  { month: "3", value: 237 },
  { month: "4", value: 73 },
  { month: "5", value: 24 },
  { month: "6", value: 33 },
  { month: "7", value: 34 },
  { month: "8", value: 253 },
  { month: "9", value: 234 },
  { month: "10", value: 223 },
  { month: "11", value: 23 },
  { month: "12", value: 42 },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 2)}
        />
        <ChartTooltip content={<ChartTooltipContent className="bg-black/50 text-white backdrop-blur-md" />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
