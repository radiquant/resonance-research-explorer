/**
 * Ollama Client for Browser Integration
 * Requires Ollama to run with CORS enabled: OLLAMA_ORIGINS=* ollama serve
 */

export interface OllamaConfig {
  baseUrl?: string;
  model?: string;
}

export interface OllamaImageAnalysisResult {
  signature: string;
  description: string;
  error?: string;
}

const DEFAULT_CONFIG: Required<OllamaConfig> = {
  baseUrl: 'http://localhost:11434',
  model: 'llava:13b' // Empfohlenes Modell für Bildanalyse
};

/**
 * Konvertiert ein Bild (File oder Blob) zu Base64
 */
const imageToBase64 = async (image: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      // Entferne "data:image/...;base64," Prefix
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(image);
  });
};

/**
 * Prüft ob Ollama erreichbar ist
 */
export const checkOllamaConnection = async (config: OllamaConfig = {}): Promise<boolean> => {
  const { baseUrl } = { ...DEFAULT_CONFIG, ...config };
  
  try {
    const response = await fetch(`${baseUrl}/api/tags`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('Ollama connection check failed:', error);
    return false;
  }
};

/**
 * Listet verfügbare Ollama Modelle auf
 */
export const listOllamaModels = async (config: OllamaConfig = {}): Promise<string[]> => {
  const { baseUrl } = { ...DEFAULT_CONFIG, ...config };
  
  try {
    const response = await fetch(`${baseUrl}/api/tags`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.models?.map((m: any) => m.name) || [];
  } catch (error) {
    console.error('Failed to list Ollama models:', error);
    throw error;
  }
};

/**
 * Analysiert ein Bild mit Ollama llava und generiert eine Signatur
 */
export const analyzeImageWithOllama = async (
  image: File | Blob,
  prompt: string = "Describe this image in detail, focusing on key visual characteristics, colors, composition, and any notable features. Provide a concise signature that captures the essence of this image.",
  config: OllamaConfig = {}
): Promise<OllamaImageAnalysisResult> => {
  const { baseUrl, model } = { ...DEFAULT_CONFIG, ...config };
  
  try {
    // Konvertiere Bild zu Base64
    const base64Image = await imageToBase64(image);
    
    // Ollama API Call mit llava
    const response = await fetch(`${baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        images: [base64Image],
        stream: false
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }
    
    const data = await response.json();
    const fullResponse = data.response || '';
    
    return {
      signature: fullResponse.substring(0, 500), // Erste 500 Zeichen als Signatur
      description: fullResponse,
    };
  } catch (error) {
    console.error('Ollama image analysis failed:', error);
    return {
      signature: '',
      description: '',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Vergleicht zwei Bild-Signaturen für Resonanz-Analyse
 */
export const compareImageSignatures = async (
  signature1: string,
  signature2: string,
  config: OllamaConfig = {}
): Promise<{ resonanceScore: number; analysis: string }> => {
  const { baseUrl, model } = { ...DEFAULT_CONFIG, ...config };
  
  const prompt = `Compare these two image descriptions and provide a resonance score from 0-100, where 100 means identical/perfect match and 0 means completely different.

Image 1: ${signature1}

Image 2: ${signature2}

Provide your response in this format:
SCORE: [number]
ANALYSIS: [your detailed comparison]`;

  try {
    const response = await fetch(`${baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: false
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }
    
    const data = await response.json();
    const fullResponse = data.response || '';
    
    // Parse Score
    const scoreMatch = fullResponse.match(/SCORE:\s*(\d+)/i);
    const resonanceScore = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
    
    return {
      resonanceScore: Math.min(100, Math.max(0, resonanceScore)),
      analysis: fullResponse
    };
  } catch (error) {
    console.error('Ollama signature comparison failed:', error);
    return {
      resonanceScore: 0,
      analysis: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
