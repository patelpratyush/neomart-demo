"use client";

import { useState } from "react";
import { Grid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CategoryFiltersProps {
  sections: string[];
  viewMode: "grid" | "aisle";
  onViewModeChange: (mode: "grid" | "aisle") => void;
  selectedSection?: string;
  onSectionChange: (section: string | undefined) => void;
}

export function CategoryFilters({
  sections,
  viewMode,
  onViewModeChange,
  selectedSection,
  onSectionChange,
}: CategoryFiltersProps) {
  const [selectedSource, setSelectedSource] = useState<string[]>([]);

  const sources = [
    { value: "neomart", label: "NeoMart" },
    { value: "patel", label: "Patel Brothers" },
    { value: "shoprite", label: "ShopRite" },
    { value: "hmart", label: "H-Mart" },
    { value: "local", label: "Local" },
  ];

  return (
    <aside className="sticky top-20 h-fit w-64 shrink-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* View Mode Toggle */}
          <div>
            <h3 className="mb-2 text-sm font-medium">View Mode</h3>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange("grid")}
                className="flex-1"
              >
                <Grid className="mr-1 h-4 w-4" />
                Grid
              </Button>
              <Button
                variant={viewMode === "aisle" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange("aisle")}
                className="flex-1"
              >
                <LayoutList className="mr-1 h-4 w-4" />
                Aisle
              </Button>
            </div>
          </div>

          <Separator />

          {/* Sections */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Sections</h3>
            <div className="space-y-1">
              <Button
                variant={!selectedSection ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onSectionChange(undefined)}
                className="w-full justify-start text-xs"
              >
                All Sections
              </Button>
              {sections.map((section) => (
                <Button
                  key={section}
                  variant={selectedSection === section ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => onSectionChange(section)}
                  className="w-full justify-start text-xs"
                >
                  {section}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Source Filter */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Source</h3>
            <div className="space-y-1">
              {sources.map((source) => (
                <label
                  key={source.value}
                  className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-muted"
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
                  <span className="text-xs">{source.label}</span>
                </label>
              ))}
            </div>
          </div>

          <Separator />

          {/* Dietary Tags (Mock) */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Dietary</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer text-xs">Veg</Badge>
              <Badge variant="outline" className="cursor-pointer text-xs">Halal</Badge>
              <Badge variant="outline" className="cursor-pointer text-xs">Gluten-free</Badge>
            </div>
          </div>

          <Separator />

          {/* Price Range (Mock) */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Price Range</h3>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="50"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>$50+</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
