const API_BASE = "http://localhost:8000/api";

export interface Analysis {
  id: number;
  cv_quality_score: number;
  trust_score: number;
  vacancy_match_score: number;
  code_quality_score: number;
  activity_score: number;
  final_score: number;
  summary: string;
  created_at: string;
}


export interface Candidate {
  id: number;
  name: string;
  github_url?: string;
  vacancy_description?: string;
  created_at: string;
  analysis?: Analysis;
}

export const api = {
  upload: async (formData: FormData) => {
    const response = await fetch(`${API_BASE}/candidates/upload`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Upload failed");
    return response.json();
  },

  listCandidates: async (): Promise<Candidate[]> => {
    const response = await fetch(`${API_BASE}/candidates/`);
    if (!response.ok) throw new Error("Failed to fetch candidates");
    return response.json();
  },

  getCandidate: async (id: string): Promise<Candidate> => {
    const response = await fetch(`${API_BASE}/candidates/${id}`);
    if (!response.ok) throw new Error("Failed to fetch candidate");
    return response.json();
  },
};
