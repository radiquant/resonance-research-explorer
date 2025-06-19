
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending' | 'processing';
  group: string;
  notes: string;
  createdAt: string;
  lastSession?: string;
}

interface Analysis {
  id: string;
  clientId: string;
  clientName: string;
  type: string;
  status: 'active' | 'processing' | 'completed' | 'harmonizing';
  progress: number;
  startTime: string;
  estimatedEnd?: string;
  results?: any;
}

interface RadionikState {
  clients: Client[];
  analyses: Analysis[];
  selectedClient: Client | null;
  selectedAnalysis: Analysis | null;
  isLoading: boolean;
  error: string | null;
}

type RadionikAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CLIENTS'; payload: Client[] }
  | { type: 'ADD_CLIENT'; payload: Client }
  | { type: 'UPDATE_CLIENT'; payload: Client }
  | { type: 'DELETE_CLIENT'; payload: string }
  | { type: 'SET_ANALYSES'; payload: Analysis[] }
  | { type: 'ADD_ANALYSIS'; payload: Analysis }
  | { type: 'UPDATE_ANALYSIS'; payload: Analysis }
  | { type: 'SET_SELECTED_CLIENT'; payload: Client | null }
  | { type: 'SET_SELECTED_ANALYSIS'; payload: Analysis | null };

const initialState: RadionikState = {
  clients: [],
  analyses: [],
  selectedClient: null,
  selectedAnalysis: null,
  isLoading: false,
  error: null,
};

function radionikReducer(state: RadionikState, action: RadionikAction): RadionikState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_CLIENTS':
      return { ...state, clients: action.payload };
    case 'ADD_CLIENT':
      return { ...state, clients: [...state.clients, action.payload] };
    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map(client =>
          client.id === action.payload.id ? action.payload : client
        ),
      };
    case 'DELETE_CLIENT':
      return {
        ...state,
        clients: state.clients.filter(client => client.id !== action.payload),
      };
    case 'SET_ANALYSES':
      return { ...state, analyses: action.payload };
    case 'ADD_ANALYSIS':
      return { ...state, analyses: [...state.analyses, action.payload] };
    case 'UPDATE_ANALYSIS':
      return {
        ...state,
        analyses: state.analyses.map(analysis =>
          analysis.id === action.payload.id ? action.payload : analysis
        ),
      };
    case 'SET_SELECTED_CLIENT':
      return { ...state, selectedClient: action.payload };
    case 'SET_SELECTED_ANALYSIS':
      return { ...state, selectedAnalysis: action.payload };
    default:
      return state;
  }
}

interface RadionikContextType {
  state: RadionikState;
  dispatch: React.Dispatch<RadionikAction>;
  actions: {
    loadClients: () => Promise<void>;
    addClient: (client: Omit<Client, 'id' | 'createdAt'>) => Promise<void>;
    updateClient: (client: Client) => Promise<void>;
    deleteClient: (id: string) => Promise<void>;
    loadAnalyses: () => Promise<void>;
    startAnalysis: (clientId: string, type: string) => Promise<void>;
    updateAnalysis: (analysis: Analysis) => Promise<void>;
  };
}

const RadionikContext = createContext<RadionikContextType | undefined>(undefined);

export function RadionikProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(radionikReducer, initialState);

  const actions = {
    loadClients: async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // Simulate API call with mock data
        const mockClients: Client[] = [
          {
            id: '1',
            name: 'Max Mustermann',
            email: 'max@example.com',
            phone: '+49 123 456789',
            status: 'active',
            group: 'Premium Klienten',
            notes: 'Regelmäßige bioenergetische Analysen',
            createdAt: '2024-01-15',
            lastSession: '2024-06-18',
          },
          {
            id: '2',
            name: 'Anna Schmidt',
            email: 'anna@example.com',
            phone: '+49 987 654321',
            status: 'processing',
            group: 'Standard Klienten',
            notes: 'Chakra-Harmonisierung in Bearbeitung',
            createdAt: '2024-02-10',
            lastSession: '2024-06-19',
          },
          {
            id: '3',
            name: 'Dr. Weber',
            email: 'weber@example.com',
            phone: '+49 555 123456',
            status: 'active',
            group: 'Langzeit-Therapie',
            notes: 'Komplexe Meridian-Analyse erforderlich',
            createdAt: '2024-03-05',
            lastSession: '2024-06-17',
          },
        ];
        
        setTimeout(() => {
          dispatch({ type: 'SET_CLIENTS', payload: mockClients });
          dispatch({ type: 'SET_LOADING', payload: false });
        }, 1000);
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Fehler beim Laden der Klienten' });
      }
    },

    addClient: async (clientData: Omit<Client, 'id' | 'createdAt'>) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const newClient: Client = {
          ...clientData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString().split('T')[0],
        };
        
        setTimeout(() => {
          dispatch({ type: 'ADD_CLIENT', payload: newClient });
          dispatch({ type: 'SET_LOADING', payload: false });
        }, 500);
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Fehler beim Hinzufügen des Klienten' });
      }
    },

    updateClient: async (client: Client) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        setTimeout(() => {
          dispatch({ type: 'UPDATE_CLIENT', payload: client });
          dispatch({ type: 'SET_LOADING', payload: false });
        }, 500);
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Fehler beim Aktualisieren des Klienten' });
      }
    },

    deleteClient: async (id: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        setTimeout(() => {
          dispatch({ type: 'DELETE_CLIENT', payload: id });
          dispatch({ type: 'SET_LOADING', payload: false });
        }, 500);
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Fehler beim Löschen des Klienten' });
      }
    },

    loadAnalyses: async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const mockAnalyses: Analysis[] = [
          {
            id: '1',
            clientId: '1',
            clientName: 'Max Mustermann',
            type: 'Bioenergetische Analyse',
            status: 'completed',
            progress: 100,
            startTime: '09:30',
            results: { energy: 85, frequency: 92, harmony: 78 },
          },
          {
            id: '2',
            clientId: '2',
            clientName: 'Anna Schmidt',
            type: 'Chakra-Harmonisierung',
            status: 'processing',
            progress: 67,
            startTime: '10:15',
            estimatedEnd: '11:30',
          },
          {
            id: '3',
            clientId: '3',
            clientName: 'Dr. Weber',
            type: 'Meridian-Analyse',
            status: 'active',
            progress: 23,
            startTime: '11:00',
            estimatedEnd: '12:15',
          },
        ];
        
        setTimeout(() => {
          dispatch({ type: 'SET_ANALYSES', payload: mockAnalyses });
          dispatch({ type: 'SET_LOADING', payload: false });
        }, 1000);
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Fehler beim Laden der Analysen' });
      }
    },

    startAnalysis: async (clientId: string, type: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const client = state.clients.find(c => c.id === clientId);
        const newAnalysis: Analysis = {
          id: Date.now().toString(),
          clientId,
          clientName: client?.name || 'Unbekannt',
          type,
          status: 'active',
          progress: 0,
          startTime: new Date().toLocaleTimeString('de-DE', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
        };
        
        setTimeout(() => {
          dispatch({ type: 'ADD_ANALYSIS', payload: newAnalysis });
          dispatch({ type: 'SET_LOADING', payload: false });
        }, 500);
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Fehler beim Starten der Analyse' });
      }
    },

    updateAnalysis: async (analysis: Analysis) => {
      try {
        dispatch({ type: 'UPDATE_ANALYSIS', payload: analysis });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Fehler beim Aktualisieren der Analyse' });
      }
    },
  };

  return (
    <RadionikContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </RadionikContext.Provider>
  );
}

export function useRadionik() {
  const context = useContext(RadionikContext);
  if (context === undefined) {
    throw new Error('useRadionik must be used within a RadionikProvider');
  }
  return context;
}

export type { Client, Analysis };
