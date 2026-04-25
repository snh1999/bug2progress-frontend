import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  cn,
  getContrastColor,
  getInitials,
  getStringToColor,
} from "@/lib/utils";

interface ImageOrAvatarProps {
  image?: string;
  name: string;
  className?: string;
  bgColor?: string;
  size?: number;
  rounded?: boolean;
}

export const ImageOrAvatar = ({
  image,
  name,
  className,
  size = 9,
  bgColor,
  rounded = false,
}: ImageOrAvatarProps) => {
  const backgroundColor = bgColor ? bgColor : getStringToColor(name);
  if (image) {
    return (
      <div className={cn("size-9 relative overflow-hidden", className)}>
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("rounded-md", size && `size-${size}`, className)}>
      <AvatarFallback
        style={{ backgroundColor, color: getContrastColor(backgroundColor) }}
        className={cn(
          "font-semibold p-1 uppercase rounded-md border-none bg-primary/20",
          size && size >= 9 ? "text-lg" : "text-xs",
          rounded && "rounded-full",
        )}
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};
