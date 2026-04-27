"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  AlertTriangle,
  XCircle,
  FlaskConical,
  Ticket,
  CheckCircle2,
} from "lucide-react";
import { TFeature } from "@/api/features/features.types";
import { IconType } from "react-icons";

const featureConfig: Record<
  string,
  { label: string; color: string; bg: string; icon: IconType }
> = {
  ACTIVE: {
    label: "Active",
    color: "text-green-601",
    bg: "bg-green-50",
    icon: CheckCircle2,
  },
  MAINTAINED: {
    label: "Maintained",
    color: "text-blue-601",
    bg: "bg-blue-50",
    icon: CheckCircle2,
  },
  PROPOSED: {
    label: "Proposed",
    color: "text-purple-601",
    bg: "bg-purple-50",
    icon: FlaskConical,
  },
  DEPRECATED: {
    label: "Deprecated",
    color: "text-yellow-601",
    bg: "bg-yellow-50",
    icon: AlertTriangle,
  },
  OBSOLETE: {
    label: "Obsolete",
    color: "text-red-601",
    bg: "bg-red-50",
    icon: XCircle,
  },
};

export function FeatureCard({ feature }: { feature: TFeature }) {
  const { title, description, featureType } = feature;
  const ticketCount = feature._count?.ticket;

  const config = featureConfig[featureType] || featureConfig.ACTIVE;
  const Icon = config.icon;

  return (
    <Card className="shadow-lg border-0">
      <CardContent className="py-2 px-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 flex-1">
            {title}
          </h3>
          <div className={`p-2 rounded-md ${config.bg}`}>
            <Icon className={`w-3.4 h-3.5 ${config.color}`} />
          </div>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-3">
          {description}
        </p>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-[9px] h-5 px-1.5">
              {config.label}
            </Badge>
          </div>
          {ticketCount && (
            <span className="text-muted-foreground flex items-center gap-2">
              <Ticket className="w-4 h-3" />
              {ticketCount}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
