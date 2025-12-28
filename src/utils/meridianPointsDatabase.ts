/**
 * Umfassende Meridianpunkt-Datenbank
 * Gruppiert nach Meridianen für systematische Testung
 */

export interface MeridianPoint {
  id: string;          // z.B. "LU-1"
  nameChinese: string; // z.B. "Zhongfu"
  nameGerman: string;  // z.B. "Mittlerer Palast"
  frequencyHz: number; // Resonanzfrequenz in Hz
  activeTime: string;  // z.B. "03-05h"
  mainEffect: string;  // Hauptwirkung
  element?: string;    // TCM Element
}

export interface Meridian {
  id: string;
  name: string;
  nameGerman: string;
  element: string;
  activeTime: string;
  color: string;
  points: MeridianPoint[];
}

export const MERIDIANS: Meridian[] = [
  // ===== LUNGEN-MERIDIAN (LU) =====
  {
    id: 'LU',
    name: 'Lung Meridian',
    nameGerman: 'Lungen-Meridian',
    element: 'Metall',
    activeTime: '03-05h',
    color: 'bg-red-100',
    points: [
      { id: 'LU-1', nameChinese: 'Zhongfu', nameGerman: 'Mittlerer Palast', frequencyHz: 23.2, activeTime: '03-05h', mainEffect: 'Atemwege, Husten' },
      { id: 'LU-5', nameChinese: 'Chize', nameGerman: 'Handlungsort', frequencyHz: 29.0, activeTime: '03-05h', mainEffect: 'Fieber, Ellenbogenschmerz' },
      { id: 'LU-6', nameChinese: 'Kongzui', nameGerman: 'Tiefste Öffnung', frequencyHz: 31.2, activeTime: '03-05h', mainEffect: 'Akute Atemwegserkrankungen', element: 'Metall' },
      { id: 'LU-7', nameChinese: 'Lieque', nameGerman: 'Unterbrochene Reihe', frequencyHz: 32.4, activeTime: '03-05h', mainEffect: 'Erkältung, Kopfschmerzen' },
      { id: 'LU-9', nameChinese: 'Taiyuan', nameGerman: 'Große Tiefe', frequencyHz: 34.8, activeTime: '03-05h', mainEffect: 'Puls-Regulation, Yuan-Punkt', element: 'Metall' },
      { id: 'LU-11', nameChinese: 'Shaoshang', nameGerman: 'Kleiner Kaufmann', frequencyHz: 46.4, activeTime: '03-05h', mainEffect: 'Halsschmerzen, Notfall' },
    ]
  },
  
  // ===== DICKDARM-MERIDIAN (DI/LI) =====
  {
    id: 'LI',
    name: 'Large Intestine Meridian',
    nameGerman: 'Dickdarm-Meridian',
    element: 'Metall',
    activeTime: '05-07h',
    color: 'bg-purple-100',
    points: [
      { id: 'LI-1', nameChinese: 'Shangyang', nameGerman: 'Kaufmann Yang', frequencyHz: 25.2, activeTime: '05-07h', mainEffect: 'Zahnschmerzen, Bewusstsein' },
      { id: 'LI-4', nameChinese: 'Hegu', nameGerman: 'Vereinte Täler', frequencyHz: 42.0, activeTime: '05-07h', mainEffect: 'Universeller Schmerz-Punkt', element: 'Metall' },
      { id: 'LI-10', nameChinese: 'Shousanli', nameGerman: 'Drei Meilen am Arm', frequencyHz: 48.6, activeTime: '05-07h', mainEffect: 'Armschmerzen, Verdauung' },
      { id: 'LI-11', nameChinese: 'Quchi', nameGerman: 'Gekrümmter Teich', frequencyHz: 50.4, activeTime: '05-07h', mainEffect: 'Fieber, Hypertonie' },
      { id: 'LI-20', nameChinese: 'Yingxiang', nameGerman: 'Duftender Empfang', frequencyHz: 63.0, activeTime: '05-07h', mainEffect: 'Nasenverstopfung, Sinusitis' },
    ]
  },
  
  // ===== MAGEN-MERIDIAN (ST) =====
  {
    id: 'ST',
    name: 'Stomach Meridian',
    nameGerman: 'Magen-Meridian',
    element: 'Erde',
    activeTime: '07-09h',
    color: 'bg-green-100',
    points: [
      { id: 'ST-1', nameChinese: 'Chengqi', nameGerman: 'Tränen-Behälter', frequencyHz: 19.8, activeTime: '07-09h', mainEffect: 'Augenleiden, Tränenfluss' },
      { id: 'ST-6', nameChinese: 'Jiache', nameGerman: 'Wagen-Knochen', frequencyHz: 39.6, activeTime: '07-09h', mainEffect: 'Kiefergelenk, Bruxismus' },
      { id: 'ST-8', nameChinese: 'Touwei', nameGerman: 'Kopf-Ecke', frequencyHz: 43.2, activeTime: '07-09h', mainEffect: 'Kopfschmerzen, Migräne' },
      { id: 'ST-25', nameChinese: 'Tianshu', nameGerman: 'Himmelsdrehpunkt', frequencyHz: 69.3, activeTime: '07-09h', mainEffect: 'Durchfall, Verstopfung' },
      { id: 'ST-36', nameChinese: 'Zusanli', nameGerman: 'Drei Li vom Knie', frequencyHz: 99.0, activeTime: '07-09h', mainEffect: 'Universelles Tonikum', element: 'Erde' },
      { id: 'ST-40', nameChinese: 'Fenglong', nameGerman: 'Üppiger Hügel', frequencyHz: 108.5, activeTime: '07-09h', mainEffect: 'Schleimlösung, Beruhigung' },
      { id: 'ST-44', nameChinese: 'Neiting', nameGerman: 'Innerer Hof', frequencyHz: 115.2, activeTime: '07-09h', mainEffect: 'Zahnschmerzen, Fieber' },
    ]
  },
  
  // ===== MILZ-PANKREAS-MERIDIAN (SP) =====
  {
    id: 'SP',
    name: 'Spleen Meridian',
    nameGerman: 'Milz-Pankreas-Meridian',
    element: 'Erde',
    activeTime: '09-11h',
    color: 'bg-yellow-100',
    points: [
      { id: 'SP-1', nameChinese: 'Yinbai', nameGerman: 'Verstecktes Weiß', frequencyHz: 16.2, activeTime: '09-11h', mainEffect: 'Menstruationsstörungen' },
      { id: 'SP-3', nameChinese: 'Taibai', nameGerman: 'Großer Weiß', frequencyHz: 24.3, activeTime: '09-11h', mainEffect: 'Verdauung, Yuan-Punkt', element: 'Erde' },
      { id: 'SP-4', nameChinese: 'Gongsun', nameGerman: 'Großvaters Enkel', frequencyHz: 28.4, activeTime: '09-11h', mainEffect: 'Magen-Darm-Beschwerden' },
      { id: 'SP-6', nameChinese: 'Sanyinjiao', nameGerman: 'Drei Yin-Kreuzung', frequencyHz: 72.9, activeTime: '09-11h', mainEffect: 'Gynäkologie, Fertilität' },
      { id: 'SP-8', nameChinese: 'Diji', nameGerman: 'Erd-Maschine', frequencyHz: 78.3, activeTime: '09-11h', mainEffect: 'Menstruationsschmerzen', element: 'Erde' },
      { id: 'SP-9', nameChinese: 'Yinlingquan', nameGerman: 'Yin-Hügel-Quelle', frequencyHz: 81.0, activeTime: '09-11h', mainEffect: 'Ödeme, Blasenprobleme' },
      { id: 'SP-21', nameChinese: 'Dabao', nameGerman: 'Großer Umhang', frequencyHz: 89.1, activeTime: '09-11h', mainEffect: 'Thoraxschmerzen, Asthma' },
    ]
  },
  
  // ===== HERZ-MERIDIAN (HE/HT) =====
  {
    id: 'HT',
    name: 'Heart Meridian',
    nameGerman: 'Herz-Meridian',
    element: 'Feuer',
    activeTime: '11-13h',
    color: 'bg-orange-100',
    points: [
      { id: 'HT-1', nameChinese: 'Jiquan', nameGerman: 'Höchste Quelle', frequencyHz: 13.8, activeTime: '11-13h', mainEffect: 'Herzrhythmus, Angina' },
      { id: 'HT-3', nameChinese: 'Shaohai', nameGerman: 'Kleines Meer', frequencyHz: 20.7, activeTime: '11-13h', mainEffect: 'Ellenbogenschmerzen, Angst' },
      { id: 'HT-5', nameChinese: 'Tongli', nameGerman: 'Geist-Verbindung', frequencyHz: 34.5, activeTime: '11-13h', mainEffect: 'Sprachstörungen, Stottern' },
      { id: 'HT-6', nameChinese: 'Yinxi', nameGerman: 'Yin-Spalt', frequencyHz: 41.4, activeTime: '11-13h', mainEffect: 'Nachtschweiß, Herzklopfen', element: 'Feuer' },
      { id: 'HT-7', nameChinese: 'Shenmen', nameGerman: 'Geist-Tor', frequencyHz: 48.3, activeTime: '11-13h', mainEffect: 'Angst, Schlaflosigkeit', element: 'Feuer' },
      { id: 'HT-9', nameChinese: 'Shaochong', nameGerman: 'Kleiner Ansturm', frequencyHz: 55.2, activeTime: '11-13h', mainEffect: 'Bewusstlosigkeit, Schock' },
    ]
  },
  
  // ===== DÜNNDARM-MERIDIAN (SI) =====
  {
    id: 'SI',
    name: 'Small Intestine Meridian',
    nameGerman: 'Dünndarm-Meridian',
    element: 'Feuer',
    activeTime: '13-15h',
    color: 'bg-blue-100',
    points: [
      { id: 'SI-1', nameChinese: 'Shaoze', nameGerman: 'Kleine Meerenge', frequencyHz: 27.6, activeTime: '13-15h', mainEffect: 'Laktationsstörungen' },
      { id: 'SI-3', nameChinese: 'Houxi', nameGerman: 'Hinterer Bach', frequencyHz: 41.4, activeTime: '13-15h', mainEffect: 'Nackenverspannungen', element: 'Feuer' },
      { id: 'SI-4', nameChinese: 'Wangu', nameGerman: 'Handgelenk-Knochen', frequencyHz: 48.6, activeTime: '13-15h', mainEffect: 'Handgelenksschmerzen' },
      { id: 'SI-6', nameChinese: 'Yanglao', nameGerman: 'Pflege des Alters', frequencyHz: 62.1, activeTime: '13-15h', mainEffect: 'Augen, Schultern' },
      { id: 'SI-11', nameChinese: 'Tianzong', nameGerman: 'Himmlische Versammlung', frequencyHz: 96.6, activeTime: '13-15h', mainEffect: 'Schulterschmerzen' },
      { id: 'SI-19', nameChinese: 'Tinggong', nameGerman: 'Palast des Hörens', frequencyHz: 124.2, activeTime: '13-15h', mainEffect: 'Tinnitus, Schwerhörigkeit' },
    ]
  },
  
  // ===== BLASEN-MERIDIAN (BL) =====
  {
    id: 'BL',
    name: 'Bladder Meridian',
    nameGerman: 'Blasen-Meridian',
    element: 'Wasser',
    activeTime: '15-17h',
    color: 'bg-indigo-100',
    points: [
      { id: 'BL-1', nameChinese: 'Jingming', nameGerman: 'Helles Licht', frequencyHz: 7.0, activeTime: '15-17h', mainEffect: 'Augenerkrankungen' },
      { id: 'BL-2', nameChinese: 'Zanzhu', nameGerman: 'Bambus-Versammlung', frequencyHz: 10.5, activeTime: '15-17h', mainEffect: 'Kopfschmerzen, Migräne' },
      { id: 'BL-10', nameChinese: 'Tianzhu', nameGerman: 'Himmelspfeiler', frequencyHz: 21.0, activeTime: '15-17h', mainEffect: 'Nackenschmerzen, Stress' },
      { id: 'BL-11', nameChinese: 'Dashu', nameGerman: 'Großer Shuttle', frequencyHz: 24.5, activeTime: '15-17h', mainEffect: 'Knochen-Erkrankungen' },
      { id: 'BL-13', nameChinese: 'Feishu', nameGerman: 'Lungen-Shu', frequencyHz: 28.0, activeTime: '15-17h', mainEffect: 'Lungenerkrankungen' },
      { id: 'BL-15', nameChinese: 'Xinshu', nameGerman: 'Herz-Shu', frequencyHz: 31.5, activeTime: '15-17h', mainEffect: 'Herzerkrankungen' },
      { id: 'BL-18', nameChinese: 'Ganshu', nameGerman: 'Leber-Shu', frequencyHz: 38.5, activeTime: '15-17h', mainEffect: 'Lebererkrankungen' },
      { id: 'BL-20', nameChinese: 'Pishu', nameGerman: 'Milz-Shu', frequencyHz: 42.0, activeTime: '15-17h', mainEffect: 'Milzerkrankungen, Verdauung' },
      { id: 'BL-23', nameChinese: 'Shenshu', nameGerman: 'Nieren-Shu', frequencyHz: 28.0, activeTime: '15-17h', mainEffect: 'Rückenschmerzen, Nieren' },
      { id: 'BL-40', nameChinese: 'Weizhong', nameGerman: 'Mittelstütze', frequencyHz: 56.0, activeTime: '15-17h', mainEffect: 'Rücken, Knie, Haut' },
      { id: 'BL-60', nameChinese: 'Kunlun', nameGerman: 'Kunlun-Berge', frequencyHz: 84.0, activeTime: '15-17h', mainEffect: 'Kopfschmerzen, Nacken' },
      { id: 'BL-67', nameChinese: 'Zhiyin', nameGerman: 'Extremes Yin', frequencyHz: 45.5, activeTime: '15-17h', mainEffect: 'Beckenendlage, Geburt', element: 'Wasser' },
    ]
  },
  
  // ===== NIEREN-MERIDIAN (KI) =====
  {
    id: 'KI',
    name: 'Kidney Meridian',
    nameGerman: 'Nieren-Meridian',
    element: 'Wasser',
    activeTime: '17-19h',
    color: 'bg-teal-100',
    points: [
      { id: 'KI-1', nameChinese: 'Yongquan', nameGerman: 'Sprudelnde Quelle', frequencyHz: 19.5, activeTime: '17-19h', mainEffect: 'Erdung, Bluthochdruck' },
      { id: 'KI-3', nameChinese: 'Taixi', nameGerman: 'Große Meerenge', frequencyHz: 26.0, activeTime: '17-19h', mainEffect: 'Nieren-Stärkung, Yuan-Punkt', element: 'Wasser' },
      { id: 'KI-5', nameChinese: 'Shuiquan', nameGerman: 'Wasser-Quelle', frequencyHz: 32.5, activeTime: '17-19h', mainEffect: 'Menstruation, Blasenprobleme', element: 'Wasser' },
      { id: 'KI-6', nameChinese: 'Zhaohai', nameGerman: 'Leuchtender See', frequencyHz: 39.0, activeTime: '17-19h', mainEffect: 'Schlaflosigkeit, Hals' },
      { id: 'KI-7', nameChinese: 'Fuliu', nameGerman: 'Rückkehr des Stroms', frequencyHz: 45.5, activeTime: '17-19h', mainEffect: 'Schwitzen, Ödeme' },
      { id: 'KI-27', nameChinese: 'Shufu', nameGerman: 'Elegantes Haus', frequencyHz: 91.0, activeTime: '17-19h', mainEffect: 'Asthma, Husten' },
    ]
  },
  
  // ===== PERIKARD-MERIDIAN (PC/PE) =====
  {
    id: 'PC',
    name: 'Pericardium Meridian',
    nameGerman: 'Perikard-Meridian',
    element: 'Feuer',
    activeTime: '19-21h',
    color: 'bg-pink-100',
    points: [
      { id: 'PC-3', nameChinese: 'Quze', nameGerman: 'Gekrümmte Meerenge', frequencyHz: 21.6, activeTime: '19-21h', mainEffect: 'Herzrhythmusstörungen' },
      { id: 'PC-4', nameChinese: 'Ximen', nameGerman: 'Spalt-Tor', frequencyHz: 28.8, activeTime: '19-21h', mainEffect: 'Herzschmerzen, Angst' },
      { id: 'PC-6', nameChinese: 'Neiguan', nameGerman: 'Innere Barriere', frequencyHz: 43.2, activeTime: '19-21h', mainEffect: 'Übelkeit, Motion Sickness' },
      { id: 'PC-7', nameChinese: 'Daling', nameGerman: 'Große Mauer', frequencyHz: 50.4, activeTime: '19-21h', mainEffect: 'Sedierung, Yuan-Punkt' },
      { id: 'PC-8', nameChinese: 'Laogong', nameGerman: 'Arbeitspalast', frequencyHz: 54.0, activeTime: '19-21h', mainEffect: 'Herzhitze, Stress' },
      { id: 'PC-9', nameChinese: 'Zhongchong', nameGerman: 'Mittlerer Ansturm', frequencyHz: 57.6, activeTime: '19-21h', mainEffect: 'Bewusstlosigkeit, Schock' },
    ]
  },
  
  // ===== DREI-ERWÄRMER-MERIDIAN (TE/SJ) =====
  {
    id: 'TE',
    name: 'Triple Energizer Meridian',
    nameGerman: 'Drei-Erwärmer-Meridian',
    element: 'Feuer',
    activeTime: '21-23h',
    color: 'bg-cyan-100',
    points: [
      { id: 'TE-1', nameChinese: 'Guanchong', nameGerman: 'Beziehung zum Ansturm', frequencyHz: 28.8, activeTime: '21-23h', mainEffect: 'Kopfschmerzen, Fieber' },
      { id: 'TE-3', nameChinese: 'Zhongzhu', nameGerman: 'Mittlere Insel', frequencyHz: 43.2, activeTime: '21-23h', mainEffect: 'Handschmerzen, Kopfschmerzen' },
      { id: 'TE-4', nameChinese: 'Yangchi', nameGerman: 'Yang-Teich', frequencyHz: 50.4, activeTime: '21-23h', mainEffect: 'Handgelenk, Yuan-Punkt' },
      { id: 'TE-5', nameChinese: 'Waiguan', nameGerman: 'Äußere Barriere', frequencyHz: 72.0, activeTime: '21-23h', mainEffect: 'Erkältung, Immunsystem' },
      { id: 'TE-14', nameChinese: 'Jianliao', nameGerman: 'Schulter-Spalt', frequencyHz: 100.8, activeTime: '21-23h', mainEffect: 'Schulterschmerzen' },
      { id: 'TE-17', nameChinese: 'Yifeng', nameGerman: 'Windschirm', frequencyHz: 115.2, activeTime: '21-23h', mainEffect: 'Tinnitus, Schwerhörigkeit' },
      { id: 'TE-23', nameChinese: 'Sizhukong', nameGerman: 'Seide-Bambus-Loch', frequencyHz: 129.6, activeTime: '21-23h', mainEffect: 'Migräne, Augenschmerzen' },
    ]
  },
  
  // ===== GALLENBLASEN-MERIDIAN (GB) =====
  {
    id: 'GB',
    name: 'Gallbladder Meridian',
    nameGerman: 'Gallenblasen-Meridian',
    element: 'Holz',
    activeTime: '23-01h',
    color: 'bg-lime-100',
    points: [
      { id: 'GB-1', nameChinese: 'Tongziliao', nameGerman: 'Augen-Pupille-Loch', frequencyHz: 22.4, activeTime: '23-01h', mainEffect: 'Augenleiden, Kopfschmerz' },
      { id: 'GB-8', nameChinese: 'Shuaigu', nameGerman: 'Führendes Tal', frequencyHz: 44.8, activeTime: '23-01h', mainEffect: 'Migräne, Übelkeit' },
      { id: 'GB-14', nameChinese: 'Yangbai', nameGerman: 'Yang-Weiß', frequencyHz: 56.0, activeTime: '23-01h', mainEffect: 'Stirnkopfschmerz, Augen' },
      { id: 'GB-20', nameChinese: 'Fengchi', nameGerman: 'Windpool', frequencyHz: 67.2, activeTime: '23-01h', mainEffect: 'Nackenverspannungen' },
      { id: 'GB-21', nameChinese: 'Jianjing', nameGerman: 'Schulter-Brunnen', frequencyHz: 72.8, activeTime: '23-01h', mainEffect: 'Schulterspannung, Kopfschmerz' },
      { id: 'GB-30', nameChinese: 'Huantiao', nameGerman: 'Springender Kreis', frequencyHz: 84.0, activeTime: '23-01h', mainEffect: 'Ischiasschmerzen, Hüfte' },
      { id: 'GB-34', nameChinese: 'Yanglingquan', nameGerman: 'Yang-Hügel-Quelle', frequencyHz: 89.6, activeTime: '23-01h', mainEffect: 'Muskel-Sehnen-Probleme', element: 'Holz' },
      { id: 'GB-41', nameChinese: 'Zulinqi', nameGerman: 'Fußtränen-Punkt', frequencyHz: 96.8, activeTime: '23-01h', mainEffect: 'Kopfschmerzen, Menstruation' },
      { id: 'GB-44', nameChinese: 'Zuqiaoyin', nameGerman: 'Fuß-Qiao-Yin', frequencyHz: 100.8, activeTime: '23-01h', mainEffect: 'Migräne, Schlaflosigkeit' },
    ]
  },
  
  // ===== LEBER-MERIDIAN (LV/LR) =====
  {
    id: 'LV',
    name: 'Liver Meridian',
    nameGerman: 'Leber-Meridian',
    element: 'Holz',
    activeTime: '01-03h',
    color: 'bg-emerald-100',
    points: [
      { id: 'LV-1', nameChinese: 'Dadun', nameGerman: 'Großer Dicker', frequencyHz: 32.4, activeTime: '01-03h', mainEffect: 'Menstruationsstörungen' },
      { id: 'LV-2', nameChinese: 'Xingjian', nameGerman: 'Wandelndes Dazwischen', frequencyHz: 40.5, activeTime: '01-03h', mainEffect: 'Kopfschmerzen, Augen' },
      { id: 'LV-3', nameChinese: 'Taichong', nameGerman: 'Große Übersteigung', frequencyHz: 48.6, activeTime: '01-03h', mainEffect: 'Stress, Hypertonie', element: 'Holz' },
      { id: 'LV-4', nameChinese: 'Zhongfeng', nameGerman: 'Mittlerer Siegel', frequencyHz: 56.7, activeTime: '01-03h', mainEffect: 'Urogenitalprobleme', element: 'Holz' },
      { id: 'LV-5', nameChinese: 'Ligou', nameGerman: 'Holzwurm-Graben', frequencyHz: 64.8, activeTime: '01-03h', mainEffect: 'Genitalprobleme, Depression' },
      { id: 'LV-8', nameChinese: 'Ququan', nameGerman: 'Gekrümmte Quelle', frequencyHz: 97.2, activeTime: '01-03h', mainEffect: 'Urogenitale Probleme' },
      { id: 'LV-13', nameChinese: 'Zhangmen', nameGerman: 'Kapitel-Tor', frequencyHz: 121.5, activeTime: '01-03h', mainEffect: 'Milz-Leber-Disharmonie' },
      { id: 'LV-14', nameChinese: 'Qimen', nameGerman: 'Periode-Tor', frequencyHz: 113.4, activeTime: '01-03h', mainEffect: 'Leber-Qi-Stagnation' },
    ]
  },
  
  // ===== LENKERGEFÄSS / DU MAI (GV/DU) =====
  {
    id: 'GV',
    name: 'Governing Vessel',
    nameGerman: 'Lenkergefäß (Du Mai)',
    element: 'Yang',
    activeTime: 'ganztags',
    color: 'bg-amber-100',
    points: [
      { id: 'GV-1', nameChinese: 'Changqiang', nameGerman: 'Lange Stärke', frequencyHz: 15.0, activeTime: 'ganztags', mainEffect: 'Hämorrhoiden, Steißbein' },
      { id: 'GV-4', nameChinese: 'Mingmen', nameGerman: 'Lebenstor', frequencyHz: 30.0, activeTime: 'ganztags', mainEffect: 'Nierenessenz, Rückenstärkung' },
      { id: 'GV-14', nameChinese: 'Dazhui', nameGerman: 'Großer Wirbel', frequencyHz: 52.5, activeTime: 'ganztags', mainEffect: 'Fieber, Immunsystem' },
      { id: 'GV-20', nameChinese: 'Baihui', nameGerman: 'Hundert Begegnungen', frequencyHz: 40.0, activeTime: 'ganztags', mainEffect: 'Bewusstsein, alle Yang-Meridiane' },
      { id: 'GV-24', nameChinese: 'Shenting', nameGerman: 'Geist-Hof', frequencyHz: 45.0, activeTime: 'ganztags', mainEffect: 'Beruhigung, Klarheit' },
      { id: 'GV-26', nameChinese: 'Renzhong', nameGerman: 'Mitte des Menschen', frequencyHz: 48.0, activeTime: 'ganztags', mainEffect: 'Notfall, Bewusstlosigkeit' },
    ]
  },
  
  // ===== KONZEPTIONSGEFÄSS / REN MAI (CV/REN) =====
  {
    id: 'CV',
    name: 'Conception Vessel',
    nameGerman: 'Konzeptionsgefäß (Ren Mai)',
    element: 'Yin',
    activeTime: 'ganztags',
    color: 'bg-rose-100',
    points: [
      { id: 'CV-3', nameChinese: 'Zhongji', nameGerman: 'Mittlerer Pol', frequencyHz: 18.0, activeTime: 'ganztags', mainEffect: 'Blase, Menstruation' },
      { id: 'CV-4', nameChinese: 'Guanyuan', nameGerman: 'Tor des Ursprungs', frequencyHz: 24.0, activeTime: 'ganztags', mainEffect: 'Wurzelchakra, Erdung' },
      { id: 'CV-6', nameChinese: 'Qihai', nameGerman: 'Meer des Qi', frequencyHz: 36.0, activeTime: 'ganztags', mainEffect: 'Sakralchakra, Lebensenergie' },
      { id: 'CV-8', nameChinese: 'Shenque', nameGerman: 'Geist-Palast-Tor', frequencyHz: 48.0, activeTime: 'ganztags', mainEffect: 'Nabel, Verdauung' },
      { id: 'CV-12', nameChinese: 'Zhongwan', nameGerman: 'Mittlerer Magen', frequencyHz: 60.0, activeTime: 'ganztags', mainEffect: 'Solarplexus, Verdauung' },
      { id: 'CV-17', nameChinese: 'Shanzhong', nameGerman: 'Zentrum der Brust', frequencyHz: 27.5, activeTime: 'ganztags', mainEffect: 'Herzchakra, Emotionen' },
      { id: 'CV-22', nameChinese: 'Tiantu', nameGerman: 'Himmelspforte', frequencyHz: 33.0, activeTime: 'ganztags', mainEffect: 'Hals, Kehlchakra' },
    ]
  },
  
  // ===== EXTRA-PUNKTE =====
  {
    id: 'EX',
    name: 'Extra Points',
    nameGerman: 'Extra-Meridian-Punkte',
    element: 'Alle',
    activeTime: 'variabel',
    color: 'bg-gray-100',
    points: [
      { id: 'EX-HN3', nameChinese: 'Yintang', nameGerman: 'Siegelhalle', frequencyHz: 35.8, activeTime: 'variabel', mainEffect: 'Drittes Auge, Beruhigung' },
      { id: 'EX-HN5', nameChinese: 'Taiyang', nameGerman: 'Große Sonne', frequencyHz: 42.0, activeTime: 'variabel', mainEffect: 'Kopfschmerzen, Augen' },
      { id: 'EX-B2', nameChinese: 'Jiaji', nameGerman: 'Wirbelsäulen-Punkte', frequencyHz: 38.5, activeTime: 'variabel', mainEffect: 'Rücken, Organe' },
      { id: 'EX-LE10', nameChinese: 'Baxie', nameGerman: 'Acht Übel', frequencyHz: 52.3, activeTime: 'variabel', mainEffect: 'Finger-Arthritis, Rheuma' },
      { id: 'EX-LE11', nameChinese: 'Bafeng', nameGerman: 'Acht Winde', frequencyHz: 48.6, activeTime: 'variabel', mainEffect: 'Zehen-Probleme, Durchblutung' },
    ]
  }
];

/**
 * Alle Meridianpunkte als flache Liste für die Testung
 */
export function getAllMeridianPointsForTesting(): string[] {
  const points: string[] = [];
  
  for (const meridian of MERIDIANS) {
    // Gruppenheader hinzufügen
    points.push(`--- ${meridian.nameGerman} (${meridian.id}) - ${meridian.element} ---`);
    
    for (const point of meridian.points) {
      // Format: "Punktcode - ChinesischerName - DeutscherName (Hauptwirkung)"
      points.push(`${point.id} - ${point.nameChinese} - ${point.nameGerman} (${point.mainEffect})`);
    }
    
    // Leerzeile zwischen Meridianen
    points.push('');
  }
  
  return points.filter(p => p.length > 0);
}

/**
 * Alle Meridianpunkte ohne Header für reine Testung
 */
export function getAllMeridianPointsFlat(): string[] {
  const points: string[] = [];
  
  for (const meridian of MERIDIANS) {
    for (const point of meridian.points) {
      points.push(`${point.id} ${point.nameChinese} ${point.nameGerman}`);
    }
  }
  
  return points;
}

/**
 * Meridianpunkte eines bestimmten Meridians
 */
export function getMeridianPoints(meridianId: string): MeridianPoint[] {
  const meridian = MERIDIANS.find(m => m.id === meridianId);
  return meridian?.points || [];
}

/**
 * Anzahl aller Punkte
 */
export function getTotalPointCount(): number {
  return MERIDIANS.reduce((sum, m) => sum + m.points.length, 0);
}

/**
 * Statistiken der Datenbank
 */
export function getMeridianStats(): { totalMeridians: number; totalPoints: number; byElement: Record<string, number> } {
  const byElement: Record<string, number> = {};
  
  for (const meridian of MERIDIANS) {
    byElement[meridian.element] = (byElement[meridian.element] || 0) + meridian.points.length;
  }
  
  return {
    totalMeridians: MERIDIANS.length,
    totalPoints: getTotalPointCount(),
    byElement
  };
}
