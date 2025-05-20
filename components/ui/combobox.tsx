"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface ComboboxOption {
  id: string;
  value: string;
  label: string;
  imageUrl?: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  placeholder?: string;
  emptyMessage?: string;
  searchPlaceholder?: string;
  className?: string;
  onSelect?: (option: ComboboxOption | undefined) => void;
}

export function Combobox({
  options,
  placeholder = "Select an option...",
  emptyMessage = "No option found.",
  searchPlaceholder = "Search options...",
  className,
  onSelect,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {value ? (
            <>
              <div className="flex items-center">
                {options.find((option) => option.value === value)?.imageUrl && (
                  <Image
                    src={
                      options.find((option) => option.value === value)
                        ?.imageUrl || "/placeholder.svg"
                    }
                    alt={
                      options.find((option) => option.value === value)?.label ||
                      ""
                    }
                    width={24}
                    height={24}
                    className="mr-2 rounded-sm object-cover w-6 h-6"
                  />
                )}
                {options.find((option) => option.value === value)?.label}
              </div>
            </>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "p-0",
          className
            ? `w-[${className.split("w-[")[1]?.split("]")[0] || "200px"}]`
            : "w-[200px]"
        )}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    const newValue = currentValue === value ? "" : currentValue;

                    const selectedOption = newValue
                      ? options.find((option) => option.value === newValue)
                      : undefined;

                    onSelect?.(selectedOption);

                    setOpen(false);
                  }}
                >
                  {option.imageUrl && (
                    <Image
                      src={option.imageUrl || "/placeholder.svg"}
                      alt={option.label}
                      width={24}
                      height={24}
                      className="mr-2 rounded-sm object-cover w-6 h-6"
                    />
                  )}
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
