
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Calendar, Users, Database } from "lucide-react";

interface SearchFilter {
  field: string;
  operator: string;
  value: string;
}

interface AdvancedSearchProps {
  onSearch: (query: string, filters: SearchFilter[]) => void;
  placeholder?: string;
  categories?: string[];
}

export function AdvancedSearch({ 
  onSearch, 
  placeholder = "Harmonische Suche...",
  categories = ["Clients", "Analysen", "Datenbanken", "Algorithmen"]
}: AdvancedSearchProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilter[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [newFilter, setNewFilter] = useState<SearchFilter>({
    field: "",
    operator: "contains",
    value: ""
  });

  const filterFields = [
    { value: "name", label: "Name" },
    { value: "email", label: "E-Mail" },
    { value: "status", label: "Status" },
    { value: "group", label: "Gruppe" },
    { value: "date", label: "Datum" },
    { value: "type", label: "Typ" }
  ];

  const operators = [
    { value: "contains", label: "Enthält" },
    { value: "equals", label: "Gleich" },
    { value: "starts_with", label: "Beginnt mit" },
    { value: "ends_with", label: "Endet mit" },
    { value: "greater_than", label: "Größer als" },
    { value: "less_than", label: "Kleiner als" }
  ];

  const handleAddFilter = () => {
    if (newFilter.field && newFilter.value) {
      setFilters([...filters, newFilter]);
      setNewFilter({ field: "", operator: "contains", value: "" });
    }
  };

  const handleRemoveFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const handleClearAll = () => {
    setQuery("");
    setFilters([]);
    onSearch("", []);
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-radionik-frequency" />
          Erweiterte Suche
        </CardTitle>
        <CardDescription>
          Suchen Sie mit erweiterten Filtern und Parametern
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Search Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-primary/10" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <GradientButton variant="frequency" onClick={handleSearch}>
            Suchen
          </GradientButton>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setQuery(query ? `${query} ${category}` : category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Active Filters */}
        {filters.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Aktive Filter:</p>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter, index) => (
                <Badge key={index} className="bg-radionik-harmony/10 text-radionik-harmony border-radionik-harmony/20">
                  {filter.field} {filter.operator} "{filter.value}"
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => handleRemoveFilter(index)}
                  />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-6 text-xs"
              >
                Alle löschen
              </Button>
            </div>
          </div>
        )}

        {/* Filter Builder */}
        {showFilters && (
          <div className="border-t pt-4 space-y-4">
            <p className="text-sm font-medium">Filter hinzufügen:</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <Select
                value={newFilter.field}
                onValueChange={(value) => setNewFilter({ ...newFilter, field: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Feld wählen" />
                </SelectTrigger>
                <SelectContent>
                  {filterFields.map((field) => (
                    <SelectItem key={field.value} value={field.value}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={newFilter.operator}
                onValueChange={(value) => setNewFilter({ ...newFilter, operator: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Operator" />
                </SelectTrigger>
                <SelectContent>
                  {operators.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Wert eingeben"
                value={newFilter.value}
                onChange={(e) => setNewFilter({ ...newFilter, value: e.target.value })}
              />

              <GradientButton variant="harmony" onClick={handleAddFilter} className="w-full">
                Hinzufügen
              </GradientButton>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
