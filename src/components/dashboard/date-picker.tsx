"use client";

import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DatePicker({
  date,
  onSelect,
}: {
  date: Date;
  onSelect: (date: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline">
            <CalendarIcon />
            {date.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selected) => selected && onSelect(selected)}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
