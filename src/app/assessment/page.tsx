"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertTriangle, CheckCircle, AlertCircle, ShieldCheck } from "lucide-react"
import { useStore } from "@/store"
import { AssessmentResult } from "./result"

interface Question {
  id: string
  question: string
  options: { value: string; label: string; score: number }[]
}

const questions: Question[] = [
  {
    id: "age",
    question: "您的年龄段是？",
    options: [
      { value: "18-25", label: "18-25岁", score: 3 },
      { value: "26-35", label: "26-35岁", score: 2 },
      { value: "36-50", label: "36-50岁", score: 1 },
      { value: "50+", label: "50岁以上", score: 2 }
    ]
  },
  {
    id: "education",
    question: "您的教育程度是？",
    options: [
      { value: "high-school", label: "高中及以下", score: 2 },
      { value: "college", label: "大学本科", score: 1 },
      { value: "graduate", label: "研究生及以上", score: 0 }
    ]
  },
  {
    id: "internet-usage", 
    question: "您每天使用互联网的时间？",
    options: [
      { value: "1-3", label: "1-3小时", score: 1 },
      { value: "3-6", label: "3-6小时", score: 2 },
      { value: "6+", label: "6小时以上", score: 3 }
    ]
  },
  {
    id: "online-shopping",
    question: "您的网购频率是？",
    options: [
      { value: "rarely", label: "很少网购", score: 0 },
      { value: "monthly", label: "每月几次", score: 1 },
      { value: "weekly", label: "每周几次", score: 2 },
      { value: "daily", label: "几乎每天", score: 3 }
    ]
  },
  {
    id: "social-media",
    question: "您最常使用的社交平台是？",
    options: [
      { value: "wechat", label: "微信", score: 1 },
      { value: "xiaohongshu", label: "小红书", score: 3 },
      { value: "weibo", label: "微博", score: 2 },
      { value: "qq", label: "QQ", score: 2 }
    ]
  },
  {
    id: "financial-awareness",
    question: "遇到'客服'要求提供验证码，您会？",
    options: [
      { value: "provide", label: "直接提供", score: 3 },
      { value: "hesitate", label: "犹豫后提供", score: 2 },
      { value: "verify", label: "先核实身份", score: 1 },
      { value: "refuse", label: "直接拒绝", score: 0 }
    ]
  },
  {
    id: "investment-experience",
    question: "您的投资理财经验如何？",
    options: [
      { value: "none", label: "从不投资", score: 1 },
      { value: "beginner", label: "初学者", score: 3 },
      { value: "intermediate", label: "有一定经验", score: 2 },
      { value: "expert", label: "经验丰富", score: 0 }
    ]
  },
  {
    id: "fraud-awareness",
    question: "您是否了解常见的诈骗手法？",
    options: [
      { value: "very-familiar", label: "非常了解", score: 0 },
      { value: "somewhat", label: "有所了解", score: 1 },
      { value: "little", label: "了解较少", score: 2 },
      { value: "not-at-all", label: "完全不了解", score: 3 }
    ]
  }
]

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const { setAssessmentResult } = useStore()

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult()
    }
  }

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResult = () => {
    let totalScore = 0
    let maxScore = 0

    questions.forEach(question => {
      maxScore += Math.max(...question.options.map(opt => opt.score))
      const answer = answers[question.id]
      if (answer) {
        const option = question.options.find(opt => opt.value === answer)
        if (option) {
          totalScore += option.score
        }
      }
    })

    const percentage = (totalScore / maxScore) * 100
    let riskLevel: 'low' | 'medium' | 'high'
    let recommendations: string[] = []

    if (percentage <= 30) {
      riskLevel = 'low'
      recommendations = [
        "继续保持良好的防范意识",
        "定期关注最新诈骗手法",
        "帮助身边人提高防诈意识"
      ]
    } else if (percentage <= 60) {
      riskLevel = 'medium' 
      recommendations = [
        "加强对诈骗手法的学习",
        "谨慎处理陌生人的金融要求",
        "使用官方渠道验证可疑信息",
        "避免在非正规平台进行交易"
      ]
    } else {
      riskLevel = 'high'
      recommendations = [
        "立即学习反诈知识，提高警惕",
        "不要轻信任何要求转账的信息",
        "所有金融操作都要多方核实",
        "避免参与高回报、低风险的投资",
        "不要在社交平台进行大额交易"
      ]
    }

    const result = {
      score: Math.round(percentage),
      riskLevel,
      recommendations,
      completedAt: new Date()
    }

    setAssessmentResult(result)
    setShowResult(true)
  }

  const resetAssessment = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
    setAssessmentResult(null)
  }

  if (showResult) {
    return <AssessmentResult onReset={resetAssessment} />
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]
  const canProceed = answers[currentQ.id]

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">风险评估</h1>
        <p className="text-lg text-muted-foreground mb-6">
          通过以下问题评估您的诈骗风险等级
        </p>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>问题 {currentQuestion + 1} / {questions.length}</span>
            <span>{Math.round(progress)}% 完成</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {currentQ.question}
          </CardTitle>
          <CardDescription>
            请选择最符合您情况的选项
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={answers[currentQ.id] || ""}
            onValueChange={(value) => handleAnswer(currentQ.id, value)}
          >
            {currentQ.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value}
                  className="flex-1 cursor-pointer py-2"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={goToPrevious}
              disabled={currentQuestion === 0}
            >
              上一题
            </Button>
            <Button
              onClick={goToNext}
              disabled={!canProceed}
            >
              {currentQuestion === questions.length - 1 ? "查看结果" : "下一题"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}