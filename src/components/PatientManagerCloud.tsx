import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Plus, Trash2, Edit2, Check, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';

// DSGVO-konforme Input-Validierung
const patientSchema = z.object({
  first_name: z.string()
    .trim()
    .min(1, { message: "Vorname ist erforderlich" })
    .max(100, { message: "Vorname zu lang" }),
  last_name: z.string()
    .trim()
    .min(1, { message: "Nachname ist erforderlich" })
    .max(100, { message: "Nachname zu lang" }),
  birth_date: z.string().optional(),
  birth_place: z.string().max(200, { message: "Geburtsort zu lang" }).optional(),
});

interface Patient {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  birth_place: string;
  created_at: string;
  updated_at: string;
}

interface PatientManagerCloudProps {
  onSelectPatient: (patient: Patient | null) => void;
  selectedPatient: Patient | null;
}

const PatientManagerCloud: React.FC<PatientManagerCloudProps> = ({ 
  onSelectPatient, 
  selectedPatient 
}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    birth_place: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { user } = useAuth();

  // Lade Patienten von Cloud
  useEffect(() => {
    if (user) {
      loadPatients();
      
      // Realtime-Updates
      const channel = supabase
        .channel('patients-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'patients',
          },
          () => {
            loadPatients();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const loadPatients = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPatients(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    try {
      patientSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleAdd = async () => {
    if (!validateForm()) return;
    if (!user) return;

    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('patients')
        .insert({
          user_id: user.id,
          ...formData,
        })
        .select()
        .single();

      if (error) throw error;

      setFormData({ first_name: '', last_name: '', birth_date: '', birth_place: '' });
      setIsAdding(false);
      toast({
        title: "Erfolg",
        description: "Patient hinzugefügt",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (patient: Patient) => {
    setEditingId(patient.id);
    setFormData({
      first_name: patient.first_name,
      last_name: patient.last_name,
      birth_date: patient.birth_date,
      birth_place: patient.birth_place,
    });
  };

  const handleUpdate = async () => {
    if (!editingId || !validateForm()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('patients')
        .update(formData)
        .eq('id', editingId);

      if (error) throw error;

      setEditingId(null);
      setFormData({ first_name: '', last_name: '', birth_date: '', birth_place: '' });

      // Update selectedPatient wenn er editiert wurde
      if (selectedPatient?.id === editingId) {
        const updated = patients.find(p => p.id === editingId);
        if (updated) onSelectPatient({ ...updated, ...formData });
      }

      toast({
        title: "Erfolg",
        description: "Patient aktualisiert",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Patient wirklich löschen? (DSGVO-konform)')) return;

    try {
      const { error } = await supabase
        .from('patients')
        .delete()
        .eq('id', id);

      if (error) throw error;

      if (selectedPatient?.id === id) {
        onSelectPatient(null);
      }
      toast({
        title: "Erfolg",
        description: "Patient gelöscht",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error.message,
      });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ first_name: '', last_name: '', birth_date: '', birth_place: '' });
    setErrors({});
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Patientenverwaltung (Cloud)
          </span>
          {!isAdding && !editingId && (
            <Button onClick={() => setIsAdding(true)} size="sm" disabled={submitting}>
              <Plus className="h-4 w-4 mr-1" />
              Neu
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Formular für Neu/Bearbeiten */}
        {(isAdding || editingId) && (
          <div className="border-2 border-primary/30 rounded-lg p-4 bg-primary/5 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Vorname *</Label>
                <Input
                  value={formData.first_name}
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                  placeholder="Vorname"
                  disabled={submitting}
                />
                {errors.first_name && (
                  <p className="text-sm text-destructive mt-1">{errors.first_name}</p>
                )}
              </div>
              <div>
                <Label>Nachname *</Label>
                <Input
                  value={formData.last_name}
                  onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                  placeholder="Nachname"
                  disabled={submitting}
                />
                {errors.last_name && (
                  <p className="text-sm text-destructive mt-1">{errors.last_name}</p>
                )}
              </div>
              <div>
                <Label>Geburtsdatum</Label>
                <Input
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
                  disabled={submitting}
                />
              </div>
              <div>
                <Label>Geburtsort</Label>
                <Input
                  value={formData.birth_place}
                  onChange={(e) => setFormData({...formData, birth_place: e.target.value})}
                  placeholder="Geburtsort"
                  disabled={submitting}
                />
                {errors.birth_place && (
                  <p className="text-sm text-destructive mt-1">{errors.birth_place}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={editingId ? handleUpdate : handleAdd} 
                size="sm"
                disabled={submitting}
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 mr-1" />
                )}
                {editingId ? 'Aktualisieren' : 'Hinzufügen'}
              </Button>
              <Button 
                onClick={handleCancel} 
                variant="outline" 
                size="sm"
                disabled={submitting}
              >
                <X className="h-4 w-4 mr-1" />
                Abbrechen
              </Button>
            </div>
          </div>
        )}

        {/* Patientenliste */}
        {patients.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            Keine Patienten vorhanden
          </p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {patients.map(patient => (
              <div
                key={patient.id}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedPatient?.id === patient.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => onSelectPatient(patient)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold">
                      {patient.first_name} {patient.last_name}
                    </div>
                    {patient.birth_date && (
                      <div className="text-sm text-muted-foreground">
                        Geboren: {new Date(patient.birth_date).toLocaleDateString('de-DE')}
                      </div>
                    )}
                    {patient.birth_place && (
                      <div className="text-sm text-muted-foreground">
                        Ort: {patient.birth_place}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(patient);
                      }}
                      variant="ghost"
                      size="sm"
                      disabled={submitting}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(patient.id);
                      }}
                      variant="ghost"
                      size="sm"
                      disabled={submitting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientManagerCloud;
