import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, getContrastColor, getInitials, getRandomColor } from "@/lib/utils";
import Image from "next/image";

interface WorkspaceAvatarProps {
  image?: string;
  name: string;
  className?: string;
  bgColor?: string;
}

export const ImageOrAvatar = ({
  image,
  name,
  className,
  bgColor = getRandomColor()
}: WorkspaceAvatarProps) => {
  if (image) {
    return (
      <div className={cn(
        "size-9 relative overflow-hidden",
        className,
      )}>
        <Image src={image} alt={name} fill className="object-cover"/>...
      </div>
    );
  }

  return (
    <Avatar className={cn("size-9 rounded-md", className)}>
      <AvatarFallback
        style={{backgroundColor: bgColor, color: getContrastColor(bgColor)}}
        className="font-semibold text-lg uppercase rounded-md "
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};

