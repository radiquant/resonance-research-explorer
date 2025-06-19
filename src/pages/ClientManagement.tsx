
import { ClientTable } from "@/components/tables/ClientTable";

const ClientManagement = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-radionik-harmony bg-clip-text text-transparent">
          Klientenverwaltung
        </h1>
        <p className="text-muted-foreground">
          Verwalten Sie Ihre Klienten und deren bioenergetische Profile
        </p>
      </div>

      <ClientTable />
    </div>
  );
};

export default ClientManagement;
