"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "1", value: 5.42 },
  { month: "2", value: 5.43 },
  { month: "3", value: 5.44 },
  { month: "4", value: 5.43 },
  { month: "5", value: 5.42 },
  { month: "6", value: 5.45 },
  { month: "7", value: 5.46 },
  { month: "8", value: 5.47 },
  { month: "9", value: 5.48 },
  { month: "10", value: 5.45 },
  { month: "11", value: 5.43 },
  { month: "12", value: 5.44 },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <ChartContainer config={chartConfig} className="h-[80px] md:h-[130px] w-full">
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
