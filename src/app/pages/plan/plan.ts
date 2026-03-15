import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { Milestone } from '../../models/milestone';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanComponent {
  protected readonly milestones = signal<Milestone[]>([
    {
      title: 'Projektstart & Teamorganisation',
      date: '',
      description: 'Projektziel definieren, Rollenverteilung, Projektplan erstellen, Risikoanalyse durchführen, Git-Repository einrichten, Gruppenhomepage erstellen',
      status: 'done',
    },
    {
      title: 'Projektinfrastruktur & Arbeitsumgebung',
      date: '',
      description: 'IDE und UML-Tools auswählen, Entwicklungsumgebung einrichten, Git-Workflow festlegen, Moodle-Ablagestruktur kennenlernen',
      status: 'done',
    },
    {
      title: 'Recherche & Marktanalyse',
      date: '',
      description: 'Literaturrecherche, Analyse bestehender Planungssysteme, Terminologie erarbeiten, Technologien evaluieren, Recherchebericht erstellen',
      status: 'in-progress',
    },
    {
      title: 'Anforderungsanalyse',
      date: '',
      description: 'Glossar erstellen, Lastenheft ausarbeiten, Systemfunktionen definieren, Use-Cases identifizieren, Review vorbereiten',
      status: 'pending',
    },
    {
      title: 'Vorprojekt & Softwarestudie',
      date: '',
      description: 'Prototyp planen, Architekturideen entwickeln, Designbeschreibung erstellen, Beispielimplementierung umsetzen, Demo präsentieren',
      status: 'pending',
    },
    {
      title: 'Qualitäts- und Dokumentationskonzept',
      date: '',
      description: 'Coding-Conventions definieren, Dokumentationskonzept erstellen, Tools für Qualitätssicherung festlegen, Dokumentationsstandards festlegen',
      status: 'pending',
    },
    {
      title: 'Pflichtenheft & finale Anforderungen',
      date: '',
      description: 'Lastenheft konkretisieren, Pflichtenheft erstellen, Glossar aktualisieren, Funktionsumfang finalisieren',
      status: 'pending',
    },
    {
      title: 'Systemdesign & Modellierung',
      date: '',
      description: 'UML-Klassendiagramme erstellen, Architektur definieren, dynamisches Modell entwickeln, Designbeschreibung erstellen',
      status: 'pending',
    },
    {
      title: 'Testplanung',
      date: '',
      description: 'Testkonzept definieren, Komponententests planen, Systemtests planen, Testdaten definieren, Testorganisation festlegen',
      status: 'pending',
    },
    {
      title: 'Implementierungsplanung',
      date: '',
      description: 'User Stories definieren, Implementierungsplan erstellen, Pair-Programming Teams festlegen, Releases planen',
      status: 'pending',
    },
    {
      title: 'Iterative Implementierung',
      date: '',
      description: 'Stories implementieren, Code integrieren, wöchentliche Releases erstellen, Dokumentation aktualisieren, Tests durchführen',
      status: 'pending',
    },
    {
      title: 'Code Review & Qualitätssicherung',
      date: '',
      description: 'Codequalität prüfen, Coding-Conventions kontrollieren, Testabdeckung überprüfen, Dokumentation validieren',
      status: 'pending',
    },
    {
      title: 'Projektabschluss & Endabnahme',
      date: '',
      description: 'Finale Softwareversion erstellen, Dokumentation vervollständigen, Demo bereitstellen, Endpräsentation und Abnahme durchführen',
      status: 'pending',
    }
  ]);
}
