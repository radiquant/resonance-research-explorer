
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const RadionikCopen = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center text-blue-800">
            Radionik nach Bruce Copen
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Bruce Copen (1915-1997)</h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Bruce Copen war ein britischer Elektronik-Ingenieur und Pionier der modernen Radionik. Er entwickelte zahlreiche elektronische Geräte zur radionischen Diagnose und Behandlung und gründete das Copen Institute, das bis heute aktiv ist.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Biographische Daten</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Ausbildung:</strong> Elektronik-Ingenieur und Radio-Techniker</li>
            <li><strong>Erste Begegnung mit Radionik:</strong> 1940er Jahre durch George de la Warr</li>
            <li><strong>Gründung des Copen Institute:</strong> 1960 in Sussex, England</li>
            <li><strong>Lebenswerk:</strong> Entwicklung von über 50 verschiedenen radionischen Geräten</li>
          </ul>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Theoretische Grundlagen nach Copen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Elektronische Radionik</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Copen entwickelte die Theorie der "elektronischen Radionik", die besagt, dass elektronische Schaltkreise die subtilen Energiefelder biologischer Systeme verstärken und modifizieren können. Seine Geräte verwendeten Röhren- und später Transistor-Technologie.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Resonanzprinzip</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Das Copen'sche System basiert auf dem Prinzip der Resonanz zwischen Patient und Behandlungsgerät. Jede Krankheit oder jeder Gesundheitszustand hat eine spezifische "Rate" oder Frequenz, die mittels elektronischer Schaltungen reproduziert werden kann.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Witness-Prinzip</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Copen verwendete das "Witness"-Prinzip, bei dem eine Probe des Patienten (Blut, Haar, Speichel) als energetische Verbindung fungiert. Diese Probe wird in das Gerät eingelegt und dient als "Antenne" für die Fernbehandlung.
          </p>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Copen Geräte-Systeme</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Diagnose-Geräte</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Mark 5 Diagnostic Unit:</strong> Grundgerät für allgemeine Diagnosen</li>
            <li><strong>Mark 6 Professional:</strong> Erweiterte Diagnosefunktionen mit digitaler Anzeige</li>
            <li><strong>Pathoclast:</strong> Spezialgerät zur Erkennung pathogener Mikroorganismen</li>
            <li><strong>Magneto-Geometric Potentiser:</strong> Gerät zur Potenzierung von Heilmitteln</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Behandlungs-Geräte</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Therapeutic Transmitter:</strong> Grundgerät für Behandlungen</li>
            <li><strong>Mark 7 Healing Unit:</strong> Fortgeschrittenes Behandlungsgerät</li>
            <li><strong>Color Therapy Unit:</strong> Speziell für Farbtherapie-Anwendungen</li>
            <li><strong>Sonic Therapy Unit:</strong> Behandlung mittels Schallfrequenzen</li>
          </ul>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Copen'sche Raten und Frequenzen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Anatomische Raten</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Copen entwickelte ein umfassendes System von numerischen "Raten" für verschiedene Körperorgane und -systeme. Diese Raten werden in die Geräte eingegeben, um spezifische Organe zu diagnostizieren oder zu behandeln.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Beispiele anatomischer Raten:</h4>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Herz: 5.7 - 8.2</li>
              <li>Leber: 2.4 - 6.8</li>
              <li>Nieren: 5.9 - 7.1</li>
              <li>Gehirn: 8.5 - 9.7</li>
              <li>Lunge: 4.6 - 7.2</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Pathologische Raten</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Für verschiedene Krankheitszustände entwickelte Copen spezifische Raten, die zur Diagnose und Behandlung verwendet werden. Diese basieren auf experimentellen Beobachtungen und klinischer Erfahrung.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Mikroorganismus-Raten</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ein besonderer Fokus lag auf der Identifizierung von Bakterien, Viren, Pilzen und Parasiten mittels spezifischer Raten. Das Pathoclast-Gerät wurde speziell für diese Anwendungen entwickelt.
          </p>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Praktische Anwendung der Copen-Methode</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Diagnose-Ablauf</h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Platzierung der Patientenprobe (Witness) im Gerät</li>
            <li>Systematische Überprüfung anatomischer Raten</li>
            <li>Identifizierung abnormaler Reaktionen mittels Reibeplatte</li>
            <li>Vertiefende Analyse pathologischer Zustände</li>
            <li>Erststellung eines umfassenden Diagnose-Berichts</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Behandlungs-Protokoll</h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Bestimmung der Behandlungsraten basierend auf Diagnose</li>
            <li>Einstellung der Geräte-Parameter</li>
            <li>Fernübertragung der Heilfrequenzen</li>
            <li>Regelmäßige Kontrolle und Anpassung</li>
            <li>Verlaufsdokumentation</li>
          </ol>

          <Separator className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Moderne Weiterentwicklungen</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Digitale Copen-Systeme</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Moderne Versionen der Copen-Geräte integrieren Computer-Technologie, digitale Raten-Bibliotheken und erweiterte Analysefunktionen. Das Copen Institute entwickelt kontinuierlich neue Geräte-Generationen.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Software-Integration</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Computergestützte Raten-Verwaltung</li>
            <li>Automatisierte Diagnose-Protokolle</li>
            <li>Digitale Behandlungs-Dokumentation</li>
            <li>Fernzugriff und Telemedicine-Funktionen</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Internationale Verbreitung</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Die Copen-Methode wird heute weltweit praktiziert, mit Instituten und Ausbildungszentren in Europa, Amerika und Asien. Regelmäßige Konferenzen und Workshops fördern den Austausch zwischen Praktikern.
          </p>

        </CardContent>
      </Card>
    </div>
  );
};

export default RadionikCopen;
