
import { useEffect } from 'react';
import { useRadionik } from '@/contexts/RadionikContext';
import { useToast } from '@/components/ui/use-toast';

export function useClients() {
  const { state, actions } = useRadionik();
  const { toast } = useToast();

  useEffect(() => {
    if (state.clients.length === 0) {
      actions.loadClients();
    }
  }, []);

  const addClient = async (clientData: any) => {
    try {
      await actions.addClient(clientData);
      toast({
        title: "Client hinzugefügt",
        description: "Der neue Client wurde erfolgreich erstellt.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Client konnte nicht hinzugefügt werden.",
        variant: "destructive",
      });
    }
  };

  const updateClient = async (client: any) => {
    try {
      await actions.updateClient(client);
      toast({
        title: "Client aktualisiert",
        description: "Die Client-Daten wurden erfolgreich gespeichert.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Client konnte nicht aktualisiert werden.",
        variant: "destructive",
      });
    }
  };

  const deleteClient = async (id: string) => {
    try {
      await actions.deleteClient(id);
      toast({
        title: "Client gelöscht",
        description: "Der Client wurde erfolgreich entfernt.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Client konnte nicht gelöscht werden.",
        variant: "destructive",
      });
    }
  };

  return {
    clients: state.clients,
    isLoading: state.isLoading,
    error: state.error,
    addClient,
    updateClient,
    deleteClient,
    selectedClient: state.selectedClient,
  };
}
