
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp } from "lucide-react";

interface AnalysisChartProps {
  data?: any[];
  type?: "line" | "area";
  title?: string;
  description?: string;
}

export function AnalysisChart({ 
  data = [], 
  type = "line", 
  title = "Analyse Trends", 
  description = "Bioenergetische Entwicklung über Zeit" 
}: AnalysisChartProps) {
  const defaultData = [
    { time: "09:00", energy: 85, frequency: 92, harmony: 78 },
    { time: "10:00", energy: 88, frequency: 89, harmony: 82 },
    { time: "11:00", energy: 92, frequency: 94, harmony: 87 },
    { time: "12:00", energy: 87, frequency: 91, harmony: 85 },
    { time: "13:00", energy: 94, frequency: 96, harmony: 89 },
    { time: "14:00", energy: 91, frequency: 93, harmony: 92 },
    { time: "15:00", energy: 96, frequency: 98, harmony: 94 }
  ];

  const chartData = data.length > 0 ? data : defaultData;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg">
          <p className="font-medium">{`Zeit: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-radionik-analysis" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {type === "area" ? (
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis 
                  dataKey="time" 
                  className="text-muted-foreground text-sm"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-muted-foreground text-sm"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="energy"
                  stackId="1"
                  stroke="hsl(var(--radionik-energy))"
                  fill="hsl(var(--radionik-energy) / 0.3)"
                  name="Energie"
                />
                <Area
                  type="monotone"
                  dataKey="frequency"
                  stackId="1"
                  stroke="hsl(var(--radionik-frequency))"
                  fill="hsl(var(--radionik-frequency) / 0.3)"
                  name="Frequenz"
                />
                <Area
                  type="monotone"
                  dataKey="harmony"
                  stackId="1"
                  stroke="hsl(var(--radionik-harmony))"
                  fill="hsl(var(--radionik-harmony) / 0.3)"
                  name="Harmonie"
                />
              </AreaChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis 
                  dataKey="time" 
                  className="text-muted-foreground text-sm"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-muted-foreground text-sm"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="hsl(var(--radionik-energy))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--radionik-energy))", strokeWidth: 2, r: 4 }}
                  name="Energie"
                />
                <Line
                  type="monotone"
                  dataKey="frequency"
                  stroke="hsl(var(--radionik-frequency))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--radionik-frequency))", strokeWidth: 2, r: 4 }}
                  name="Frequenz"
                />
                <Line
                  type="monotone"
                  dataKey="harmony"
                  stroke="hsl(var(--radionik-harmony))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--radionik-harmony))", strokeWidth: 2, r: 4 }}
                  name="Harmonie"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
