import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "lucide-react";

export default function AboutSection({ about }: { about?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Layout className="w-5 h-5" />
          About
        </CardTitle>
      </CardHeader>
      <CardContent>
        {about ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap">{about}</div>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No description yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
