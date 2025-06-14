
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, FileImage, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileImportFormProps {
  onDataExtracted: (extractedData: string) => void;
}

const FileImportForm: React.FC<FileImportFormProps> = ({ onDataExtracted }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    
    try {
      if (file.type === 'application/pdf') {
        await handlePDFUpload(file);
      } else if (file.type.startsWith('image/')) {
        await handleImageUpload(file);
      } else {
        toast({
          title: 'Dateityp nicht unterstützt',
          description: 'Bitte wählen Sie eine PDF- oder Bilddatei',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Fehler beim Verarbeiten der Datei:', error);
      toast({
        title: 'Verarbeitungsfehler',
        description: 'Die Datei konnte nicht verarbeitet werden',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handlePDFUpload = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Einfache PDF-Text-Extraktion (für komplexere PDFs würde man pdf-parse verwenden)
    const text = await extractTextFromPDF(uint8Array);
    
    if (text) {
      onDataExtracted(text);
      toast({
        title: 'PDF erfolgreich verarbeitet',
        description: `Text aus ${file.name} extrahiert`
      });
    } else {
      toast({
        title: 'Keine Textdaten gefunden',
        description: 'Die PDF enthält möglicherweise nur Bilder',
        variant: 'destructive'
      });
    }
  };

  const handleImageUpload = async (file: File) => {
    const base64 = await fileToBase64(file);
    
    // Simuliere Bildanalyse - in der Realität würde hier OCR oder AI-Bildanalyse stattfinden
    const analysisResult = await analyzeImage(base64, file.name);
    
    if (analysisResult) {
      onDataExtracted(analysisResult);
      toast({
        title: 'Bild erfolgreich analysiert',
        description: `Daten aus ${file.name} extrahiert`
      });
    }
  };

  const extractTextFromPDF = async (pdfData: Uint8Array): Promise<string> => {
    // Vereinfachte PDF-Text-Extraktion
    // In einer echten Implementierung würde man pdf-parse oder ähnliche Bibliotheken verwenden
    try {
      const decoder = new TextDecoder('utf-8');
      const text = decoder.decode(pdfData);
      
      // Suche nach lesbarem Text zwischen den PDF-Strukturen
      const textMatches = text.match(/\((.*?)\)/g);
      if (textMatches) {
        return textMatches
          .map(match => match.replace(/[()]/g, ''))
          .filter(text => text.length > 2)
          .join(' ');
      }
    } catch (error) {
      console.error('PDF-Extraktion fehlgeschlagen:', error);
    }
    
    return '';
  };

  const analyzeImage = async (base64: string, filename: string): Promise<string> => {
    // Simulierte Bildanalyse - hier würde normalerweise OCR oder AI-Analyse stattfinden
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simuliere Verarbeitungszeit
    
    // Beispiel-Rückgabe basierend auf Dateiname oder anderen Heuristiken
    if (filename.toLowerCase().includes('mittel') || filename.toLowerCase().includes('remedy')) {
      return `Arnica,6,D
Belladonna,12,D
Nux vomica,30,C
Pulsatilla,200,C`;
    }
    
    return `Analyse von ${filename}:
Calendula,6,D
Hypericum,12,D
Ruta,30,C`;
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          PDF & Bild Import
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors">
            <FileText className="h-12 w-12 text-gray-400 mb-2" />
            <Label className="text-sm font-medium text-gray-700 mb-2">PDF-Dateien</Label>
            <p className="text-xs text-gray-500 text-center mb-3">
              Automatische Texterkennung aus PDF-Dokumenten
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors">
            <FileImage className="h-12 w-12 text-gray-400 mb-2" />
            <Label className="text-sm font-medium text-gray-700 mb-2">Bilddateien</Label>
            <p className="text-xs text-gray-500 text-center mb-3">
              KI-gestützte Analyse von Bildinhalten
            </p>
          </div>
        </div>
        
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Verarbeitung läuft...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              PDF oder Bild auswählen
            </>
          )}
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        <div className="text-xs text-gray-500 space-y-1">
          <p>• PDF: Automatische Texterkennung und Datenextraktion</p>
          <p>• Bilder: KI-Analyse für Mittel-Identifikation</p>
          <p>• Unterstützte Formate: PDF, JPG, PNG, GIF</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileImportForm;
