import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, getContrastColor, getInitials, getRandomColor } from "@/lib/utils";
import Image from "next/image";

interface ImageOrAvatarProps {
  image?: string;
  name: string;
  className?: string;
  bgColor?: string;
  size?: number;
}

export const ImageOrAvatar = ({
  image,
  name,
  className,
  size = 9,
  bgColor = getRandomColor(),
}: ImageOrAvatarProps) => {
  if (image) {
    return (
      <div className={cn("size-9 relative overflow-hidden", className)}>
        <Image src={image} alt={name} fill className="object-cover" />
        ...
      </div>
    );
  }

  return (
    <Avatar  className={cn("rounded-md", size && `size-${size}`,  className)}>
      <AvatarFallback
        style={{ backgroundColor: bgColor, color: getContrastColor(bgColor) }}
        className={cn("font-semibold p-1 uppercase rounded-md", size && size >= 9 ? "text-lg" : "text-sm")}
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};
