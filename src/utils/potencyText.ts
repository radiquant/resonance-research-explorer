export const numberToGermanWords = (n: number): string => {
  if (!Number.isFinite(n) || n < 0 || Math.floor(n) !== n) return String(n);

  const under20 = [
    'null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun',
    'zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'
  ];

  const tensWords: Record<number, string> = {
    20: 'zwanzig', 30: 'dreißig', 40: 'vierzig', 50: 'fünfzig',
    60: 'sechzig', 70: 'siebzig', 80: 'achtzig', 90: 'neunzig'
  };

  const toUnder100 = (x: number): string => {
    if (x < 20) return under20[x];
    const tens = Math.floor(x / 10) * 10;
    const ones = x % 10;
    if (ones === 0) return tensWords[tens];
    const onesWord = ones === 1 ? 'ein' : under20[ones];
    return `${onesWord}und${tensWords[tens]}`;
  };

  const toUnder1000 = (x: number): string => {
    if (x < 100) return toUnder100(x);
    const hundreds = Math.floor(x / 100);
    const rest = x % 100;
    const hundredsWord = hundreds === 1 ? 'einhundert' : `${under20[hundreds]}hundert`;
    if (rest === 0) return hundredsWord;
    return `${hundredsWord}${toUnder100(rest)}`;
  };

  if (n < 1000) return toUnder1000(n);

  const thousands = Math.floor(n / 1000);
  const rest = n % 1000;
  const thousandsWord = thousands === 1 ? 'eintausend' : `${toUnder1000(thousands)}tausend`;
  if (rest === 0) return thousandsWord;
  return `${thousandsWord}${toUnder1000(rest)}`;
};

export const convertPotencyNumbersToWords = (input: string): string => {
  // Ersetze Muster wie D6, C100, LM12, M30 -> Dsechs, CEinhundert, LMzwölf, Mdreißig
  const regex = /(\b)(LM|D|C|M)(\d{1,6})(\b)/gi;
  return input.replace(regex, (match, p1, prefix, digits, p4) => {
    const num = parseInt(digits, 10);
    if (isNaN(num)) return match;
    let words = numberToGermanWords(num);
    // Regel: Ab 100 den ersten Buchstaben groß schreiben (entspricht Beispiel CEinhundert)
    if (num >= 100 && words.length > 0) {
      words = words.charAt(0).toUpperCase() + words.slice(1);
    }
    return `${prefix}${words}`;
  });
};
