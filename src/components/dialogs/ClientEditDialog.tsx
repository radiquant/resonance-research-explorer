
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, Calendar, Save, X } from "lucide-react";

interface ClientEditDialogProps {
  client?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    group: string;
    notes: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: any) => void;
}

export function ClientEditDialog({ client, isOpen, onClose, onSave }: ClientEditDialogProps) {
  const [formData, setFormData] = useState({
    name: client?.name || "",
    email: client?.email || "",
    phone: client?.phone || "",
    status: client?.status || "active",
    group: client?.group || "",
    notes: client?.notes || ""
  });

  const handleSave = () => {
    onSave({ ...client, ...formData });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] glass">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-radionik-harmony" />
            {client ? "Client bearbeiten" : "Neuer Client"}
          </DialogTitle>
          <DialogDescription>
            {client ? "Bearbeiten Sie die Client-Informationen" : "Erstellen Sie einen neuen Client"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Client Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="client@example.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+49 123 456789"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Status wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktiv</SelectItem>
                  <SelectItem value="inactive">Inaktiv</SelectItem>
                  <SelectItem value="pending">Wartend</SelectItem>
                  <SelectItem value="processing">In Bearbeitung</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="group">Gruppe</Label>
            <Select value={formData.group} onValueChange={(value) => handleChange("group", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Gruppe wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="premium">Premium Klienten</SelectItem>
                <SelectItem value="standard">Standard Klienten</SelectItem>
                <SelectItem value="new">Neue Klienten 2024</SelectItem>
                <SelectItem value="therapy">Langzeit-Therapie</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notizen</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Zusätzliche Notizen zum Client..."
              rows={4}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Abbrechen
          </Button>
          <GradientButton variant="harmony" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Speichern
          </GradientButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
