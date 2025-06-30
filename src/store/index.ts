import { create } from 'zustand'

interface User {
  id: string
  name: string
  riskLevel: 'low' | 'medium' | 'high'
}

interface AssessmentResult {
  score: number
  riskLevel: 'low' | 'medium' | 'high'
  recommendations: string[]
  completedAt: Date
}

interface GlobalState {
  user: User | null
  assessmentResult: AssessmentResult | null
  chatHistory: Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>
  setUser: (user: User | null) => void
  setAssessmentResult: (result: AssessmentResult | null) => void
  addChatMessage: (message: {
    role: 'user' | 'assistant'
    content: string
  }) => void
  clearChatHistory: () => void
}

export const useStore = create<GlobalState>((set) => ({
  user: null,
  assessmentResult: null,
  chatHistory: [],
  setUser: (user) => set({ user }),
  setAssessmentResult: (result) => set({ assessmentResult: result }),
  addChatMessage: (message) =>
    set((state) => ({
      chatHistory: [
        ...state.chatHistory,
        {
          id: Date.now().toString(),
          ...message,
          timestamp: new Date(),
        },
      ],
    })),
  clearChatHistory: () => set({ chatHistory: [] }),
}))

export type { User, AssessmentResult, GlobalState }