import { z } from "zod";

// Formato antigo: AAA-9999
const oldPlateRegex = /^[A-Z]{3}-\d{4}$/;

// Formato Mercosul: AAA9A99
const mercosulPlateRegex = /^[A-Z]{3}\d[A-Z]\d{2}$/;

export const plateSchema = z.string()
  .trim()
  .transform(val => val.toUpperCase())
  .refine(
    (val) => {
      if (val.length === 0) return true; // Permite vazio para busca
      return oldPlateRegex.test(val) || mercosulPlateRegex.test(val);
    },
    {
      message: "Formato inválido. Use AAA-9999 ou AAA9A99",
    }
  );

export function formatPlate(value: string): string {
  // Remove tudo que não é letra ou número
  const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  
  // Se está vazio, retorna vazio
  if (cleaned.length === 0) return '';
  
  // Limita a 7 caracteres
  const limited = cleaned.slice(0, 7);
  
  // Tenta identificar o formato baseado no que foi digitado
  if (limited.length <= 3) {
    // Apenas letras iniciais
    return limited.replace(/[^A-Z]/g, '');
  }
  
  // Verifica se parece com formato antigo (tem letras no início)
  const letters = limited.slice(0, 3);
  const rest = limited.slice(3);
  
  // Se o 4º caractere é uma letra, é Mercosul (AAA9A99)
  if (rest.length >= 2 && /[A-Z]/.test(rest.charAt(1))) {
    // Formato Mercosul: AAA9A99
    const num1 = rest.charAt(0).replace(/[^0-9]/g, '');
    const letter = rest.charAt(1).replace(/[^A-Z]/g, '');
    const num2 = rest.slice(2, 4).replace(/[^0-9]/g, '');
    return `${letters}${num1}${letter}${num2}`;
  }
  
  // Formato antigo com hífen: AAA-9999
  const numbers = rest.replace(/[^0-9]/g, '');
  if (numbers.length > 0) {
    return `${letters}-${numbers}`;
  }
  
  return letters;
}

export function isValidPlate(value: string): boolean {
  try {
    plateSchema.parse(value);
    return true;
  } catch {
    return value.length === 0; // Vazio é válido para busca
  }
}

export function getPlateError(value: string): string | null {
  if (value.length === 0) return null;
  
  try {
    plateSchema.parse(value);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || "Formato inválido";
    }
    return "Formato inválido";
  }
}
