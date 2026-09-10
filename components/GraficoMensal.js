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
          <CartesianGrid strokeDasharray="3 3" stroke="#0a0a0a15" vertical={false} />
          <XAxis
            dataKey="mes"
            tick={{ fill: "#0a0a0a99", fontSize: 12 }}
            axisLine={{ stroke: "#0a0a0a25" }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#0a0a0a99", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #0a4b7440",
              borderRadius: 0,
              fontFamily: "var(--font-nexus)",
              fontSize: 13,
            }}
            labelStyle={{ color: "#0a4b74", fontWeight: 600 }}
          />
          <Bar dataKey="visualizacoes" name="Visualizações" fill="#b1b2b3" />
          <Bar dataKey="downloads" name="Downloads" fill="#0a4b74" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
