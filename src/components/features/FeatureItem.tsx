import { TFeature } from "@/api/features/features.types";
import { getStringToColor } from "@/lib/utils";

export function FeatureItem({
  feature,
  compact,
}: {
  feature: TFeature;
  compact?: boolean;
}) {
  const color = getStringToColor(feature.title);

  return (
    <div
      className={`flex w-full items-center ${!compact ? "gap-2 px-3 py-2.5 text-sm" : "text-xs"} rounded-md cursor-pointer group`}
    >
      {!compact && (
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      <span className="flex-1 truncate">{feature.title}</span>
    </div>
  );
}
