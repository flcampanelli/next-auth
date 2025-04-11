"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DateTimePicker({
  date,
  setDate,
  placeholder = "Selecione data e hora",
  disabled = false,
  className,
}: DateTimePickerProps) {
  const [hours, setHours] = React.useState<string>(() => {
    return date ? format(date, "HH") : "12";
  });

  const [minutes, setMinutes] = React.useState<string>(() => {
    return date ? format(date, "mm") : "00";
  });

  React.useEffect(() => {
    if (!date) return;

    const newDate = new Date(date);
    newDate.setHours(Number.parseInt(hours, 10));
    newDate.setMinutes(Number.parseInt(minutes, 10));
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    if (newDate.getTime() !== date.getTime()) {
      setDate(newDate);
    }
  }, [hours, minutes, date, setDate]);

  const hoursOptions = React.useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  }, []);

  const minutesOptions = React.useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));
  }, []);

  const formattedDate = React.useMemo(() => {
    if (!date) return "";
    return format(date, "PPP 'às' HH:mm", { locale: ptBR });
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? formattedDate : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              if (!newDate) {
                setDate(undefined);
                return;
              }

              const updatedDate = new Date(newDate);

              updatedDate.setHours(
                Number.parseInt(hours, 10),
                Number.parseInt(minutes, 10),
                0,
                0
              );

              setDate(updatedDate);
            }}
            initialFocus
            locale={ptBR}
          />
          <div className="border-t border-border p-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">Horário</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">Hora:</span>
                  <Select
                    value={hours}
                    onValueChange={setHours}
                    disabled={!date}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder="Hora" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {hoursOptions.map((hour) => (
                        <SelectItem key={`hour-${hour}`} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <span className="text-sm">:</span>

                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">Min:</span>
                  <Select
                    value={minutes}
                    onValueChange={setMinutes}
                    disabled={!date}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {minutesOptions.map((minute) => (
                        <SelectItem key={`minute-${minute}`} value={minute}>
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
