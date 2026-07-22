import { ptBR, type MessageKey, type Messages } from './pt-BR';

const catalogs: Record<string, Messages> = {
  'pt-BR': ptBR,
};

let locale = 'pt-BR';

export function setLocale(next: string) {
  if (catalogs[next]) locale = next;
}

export function getLocale() {
  return locale;
}

export function t(
  key: MessageKey,
  params?: Record<string, string | number>,
): string {
  const table = catalogs[locale] ?? ptBR;
  let text: string = table[key] ?? ptBR[key] ?? key;
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      text = text.replace(new RegExp(`{{${name}}}`, 'g'), String(value));
    }
  }
  return text;
}
