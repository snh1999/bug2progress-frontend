import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TFormInputProps } from "@/components/common/form/FormComponent/FormComponent.types";


export function DatePicker({
  value,
  onChange,
  className,
  placeholder = "Pick a date",
}: TFormInputProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className={cn("data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal px-3", className)}
        >
          <CalendarIcon />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={(date) => date && onChange(date)} />
      </PopoverContent>
    </Popover>
  )
}