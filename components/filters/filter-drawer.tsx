"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

interface FilterDrawerProps {
  sections: string[];
  selectedSection?: string;
  onSectionChange: (section: string | undefined) => void;
}

export function FilterDrawer({
  sections,
  selectedSection,
  onSectionChange,
}: FilterDrawerProps) {
  const [selectedSource, setSelectedSource] = useState<string[]>([]);

  const sources = [
    { value: "neomart", label: "NeoMart" },
    { value: "patel", label: "Patel Brothers" },
    { value: "shoprite", label: "ShopRite" },
    { value: "hmart", label: "H-Mart" },
    { value: "local", label: "Local" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Sections */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Sections</h3>
            <div className="space-y-1">
              <Button
                variant={!selectedSection ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onSectionChange(undefined)}
                className="w-full justify-start text-sm"
              >
                All Sections
              </Button>
              {sections.map((section) => (
                <Button
                  key={section}
                  variant={selectedSection === section ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => onSectionChange(section)}
                  className="w-full justify-start text-sm"
                >
                  {section}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Source Filter */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Source</h3>
            <div className="space-y-2">
              {sources.map((source) => (
                <label
                  key={source.value}
                  className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-muted"
                >
                  <input
                    type="checkbox"
                    checked={selectedSource.includes(source.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSource([...selectedSource, source.value]);
                      } else {
                        setSelectedSource(selectedSource.filter((s) => s !== source.value));
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="text-sm">{source.label}</span>
                </label>
              ))}
            </div>
          </div>

          <Separator />

          {/* Dietary Tags */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Dietary</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer text-xs">
                Veg
              </Badge>
              <Badge variant="outline" className="cursor-pointer text-xs">
                Halal
              </Badge>
              <Badge variant="outline" className="cursor-pointer text-xs">
                Gluten-free
              </Badge>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
