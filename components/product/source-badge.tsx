import { Badge } from "@/components/ui/badge";
import { Source } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SourceBadgeProps {
  source: Source;
  className?: string;
}

const sourceConfig = {
  neomart: {
    label: "NeoMart",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  "patel-brothers": {
    label: "Patel Brothers",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  local: {
    label: "Local",
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },
};

export function SourceBadge({ source, className }: SourceBadgeProps) {
  const config = sourceConfig[source];

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
