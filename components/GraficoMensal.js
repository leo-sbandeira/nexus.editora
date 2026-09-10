"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function GraficoMensal({ dados }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dados} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#0a0a0a1a" vertical={false} />
          <XAxis
            dataKey="mes"
            tick={{ fill: "#57534a", fontSize: 12 }}
            axisLine={{ stroke: "#0a0a0a2a" }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#57534a", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f2ecdd",
              border: "1px solid #0a0a0a30",
              borderRadius: 0,
              fontFamily: "var(--font-sans)",
              fontSize: 13,
            }}
            labelStyle={{ color: "#0a0a0a", fontWeight: 600 }}
          />
          <Bar dataKey="visualizacoes" name="Visualizações" fill="#57534a" />
          <Bar dataKey="downloads" name="Downloads" fill="#b4832a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
