import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TimeSummaryCardProps {
  weeklyHours: number;
  monthlyHours: number;
}

export const TimeSummaryCard = ({ weeklyHours, monthlyHours }: TimeSummaryCardProps) => {
  return (
    <Card className="mb-6 bg-accent/50">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="font-medium text-lg">Time Requirements</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Weekly Hours</p>
            <p className="text-2xl font-bold">{weeklyHours.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Monthly Hours</p>
            <p className="text-2xl font-bold">{monthlyHours.toFixed(1)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};