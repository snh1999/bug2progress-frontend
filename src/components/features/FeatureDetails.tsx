import EditFeatureButton from "@/components/features/EditFeatureButton";
import { TFeature } from "@/api/features/features.types";
import Link from "next/link";
import { Activity, ChevronRight, ExternalLink, LinkIcon, Ticket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FeatureDetails({projectId, feature}: {
  projectId: string;
  feature: TFeature
}) {
  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/projects/${projectId}/features`}
                className="hover:text-foreground flex items-center gap-1">
            Features
          </Link>
          <ChevronRight className="w-3 h-3"/>
          <span className="text-foreground font-medium truncate">{feature.title}</span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center gap-3">
            <h2 className="text-2xl font-bold">{feature.title}</h2>
            <div>
              <EditFeatureButton/>
            </div>
          </div>
          <p className="text-muted-foreground">{feature.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Ticket className="w-3.5 h-3.5"/>
              {feature._count.ticket} tickets
            </span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        {feature.process && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="w-4 h-4"/>
                Process & Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {feature.process}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {feature.necessaryLinks.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <LinkIcon className="w-4 h-4"/>
                Links & Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {feature.necessaryLinks.map((link, i) => (
                  <a key={i} href={link} target="_blank" rel="noopener noreferrer">
                    <Badge variant="secondary"
                           className="gap-1.5 cursor-pointer hover:bg-primary/10 py-1.5 px-3">
                      <ExternalLink className="w-3 h-3"/>
                      {link.replace(/^https?:\/\//, "").replace(/\/$/, "").slice(0, 40)}
                      {link.length > 40 ? "..." : ""}
                    </Badge>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="space-y-6">
      </div>
    </div>
  );
}
