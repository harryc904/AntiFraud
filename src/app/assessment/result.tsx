"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, AlertCircle, ShieldCheck, RotateCcw, BookOpen } from "lucide-react"
import { useStore } from "@/store"
import Link from "next/link"

interface AssessmentResultProps {
  onReset: () => void
}

export function AssessmentResult({ onReset }: AssessmentResultProps) {
  const { assessmentResult } = useStore()

  if (!assessmentResult) {
    return null
  }

  const { score, riskLevel, recommendations, completedAt } = assessmentResult

  const getRiskInfo = () => {
    switch (riskLevel) {
      case 'low':
        return {
          icon: <CheckCircle className="h-8 w-8 text-green-500" />,
          title: "低风险",
          description: "您具有良好的防诈意识",
          color: "bg-green-100 text-green-800",
          bgColor: "bg-green-50"
        }
      case 'medium':
        return {
          icon: <AlertCircle className="h-8 w-8 text-yellow-500" />,
          title: "中等风险", 
          description: "需要提高防范意识",
          color: "bg-yellow-100 text-yellow-800",
          bgColor: "bg-yellow-50"
        }
      case 'high':
        return {
          icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
          title: "高风险",
          description: "请立即加强防诈学习",
          color: "bg-red-100 text-red-800", 
          bgColor: "bg-red-50"
        }
    }
  }

  const riskInfo = getRiskInfo()

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">评估结果</h1>
        <p className="text-lg text-muted-foreground">
          基于您的回答，我们为您生成了个性化的风险评估报告
        </p>
      </div>

      <div className="space-y-6">
        {/* 风险等级卡片 */}
        <Card className={riskInfo.bgColor}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              {riskInfo.icon}
              <div>
                <CardTitle className="text-2xl">
                  <Badge className={riskInfo.color}>
                    {riskInfo.title}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  {riskInfo.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>风险评分</span>
                  <span className="font-semibold">{score}/100</span>
                </div>
                <Progress 
                  value={score} 
                  className="h-3"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  分数越高表示诈骗风险越大
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 防范建议 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-blue-500" />
              个性化防范建议
            </CardTitle>
            <CardDescription>
              根据您的风险等级，我们为您提供以下建议
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 相关数据对比 */}
        <Card>
          <CardHeader>
            <CardTitle>数据对比</CardTitle>
            <CardDescription>
              您的风险等级在不同群体中的分布情况
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-gray-50">
                <div className="text-2xl font-bold text-red-600">22%</div>
                <div className="text-sm text-muted-foreground">高风险用户比例</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-50">
                <div className="text-2xl font-bold text-yellow-600">45%</div>
                <div className="text-sm text-muted-foreground">中等风险用户比例</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-50">
                <div className="text-2xl font-bold text-green-600">33%</div>
                <div className="text-sm text-muted-foreground">低风险用户比例</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 下一步行动 */}
        <Card>
          <CardHeader>
            <CardTitle>下一步行动</CardTitle>
            <CardDescription>
              继续学习和提升您的防诈能力
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild className="h-auto p-4">
                <Link href="/education" className="flex flex-col items-center space-y-2">
                  <BookOpen className="h-6 w-6" />
                  <span>学习防诈知识</span>
                  <span className="text-xs text-muted-foreground">
                    查看真实案例和防范技巧
                  </span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4">
                <Link href="/ai-chat" className="flex flex-col items-center space-y-2">
                  <ShieldCheck className="h-6 w-6" />
                  <span>AI助手咨询</span>
                  <span className="text-xs text-muted-foreground">
                    获取个性化防诈建议
                  </span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 操作按钮 */}
        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            重新测评
          </Button>
        </div>

        {/* 评估信息 */}
        <div className="text-center text-sm text-muted-foreground">
          评估完成时间: {completedAt.toLocaleString('zh-CN')}
        </div>
      </div>
    </div>
  )
}