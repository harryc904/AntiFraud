"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarContent, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, AlertTriangle, Shield, MessageCircle, Lightbulb } from "lucide-react"
import { useStore } from "@/store"

const presetScenarios = [
  {
    id: "shopping",
    title: "网购退款诈骗",
    description: "模拟接到假客服电话的场景",
    prompt: "我刚接到一个电话，说我在某电商平台买的商品有质量问题，需要退款，让我加微信操作。这是真的吗？"
  },
  {
    id: "investment", 
    title: "投资理财诈骗",
    description: "识别虚假投资平台",
    prompt: "有人在群里分享了一个投资平台，说收益很高，还有导师指导，我要不要试试？"
  },
  {
    id: "impersonation",
    title: "冒充公检法诈骗", 
    description: "应对冒充执法部门的诈骗",
    prompt: "我接到自称是警察的电话，说我涉嫌洗钱，要我配合调查转移资金到安全账户，我该怎么办？"
  },
  {
    id: "part-time",
    title: "刷单兼职诈骗",
    description: "识别刷单兼职陷阱",
    prompt: "看到一个刷单兼职广告，说可以在家赚钱，前期收益不错，但现在要我垫付更多钱，这正常吗？"
  }
]

const aiResponses: Record<string, string> = {
  "shopping": "这很可能是诈骗！正规的电商平台退款都有官方流程：\n\n⚠️ 风险提醒：\n• 真正的客服不会要求加私人微信\n• 退款操作应在官方平台进行\n• 绝不需要提供银行卡密码或验证码\n\n🛡️ 正确做法：\n1. 挂断电话，登录官方购物平台查看订单状态\n2. 通过官方客服热线核实情况\n3. 如确需退款，在官方平台操作即可\n4. 保护好个人信息，不要泄露给陌生人",
  
  "investment": "这是典型的投资诈骗套路！请立即停止参与：\n\n🚨 诈骗特征：\n• 承诺高收益、低风险（违背投资规律）\n• 群内有'托'营造氛围\n• 平台无正规金融牌照\n• 导师身份无法核实\n\n💡 防范建议：\n1. 记住：高收益必然伴随高风险\n2. 选择有正规牌照的金融机构\n3. 不要相信'内幕消息'或'专家指导'\n4. 理性投资，量力而行",
  
  "impersonation": "这是严重的冒充公检法诈骗！请立即停止配合：\n\n❌ 诈骗识别：\n• 公检法绝不会电话办案\n• 不存在'安全账户'概念\n• 真正的调查有正式法律程序\n• 执法部门不会要求转账\n\n🚨 应急处理：\n1. 立即挂断电话\n2. 拨打110或相关部门官方电话核实\n3. 不要转移任何资金\n4. 保留通话记录作为证据\n5. 及时报警",
  
  "part-time": "这是典型的刷单诈骗陷阱！请立即停止：\n\n⚠️ 刷单真相：\n• 刷单行为本身就是违法的\n• 正规兼职绝不需要垫付资金\n• 前期小额返利是为了取得信任\n• 后期会要求垫付大额资金然后跑路\n\n🛡️ 正确选择：\n1. 立即停止参与刷单活动\n2. 不要继续垫付任何资金\n3. 选择正规求职平台找工作\n4. 如已被骗，立即报警\n5. 提醒身边人注意此类诈骗"
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { addChatMessage } = useStore()

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: content.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    addChatMessage({ role: 'user', content: content.trim() })
    setInputValue("")
    setIsLoading(true)

    // 模拟AI响应延迟
    setTimeout(() => {
      let aiResponse = "我理解您的担忧。基于您描述的情况，我来为您分析一下：\n\n"
      
      // 简单的关键词匹配来生成响应
      const lowerContent = content.toLowerCase()
      if (lowerContent.includes("退款") || lowerContent.includes("客服")) {
        aiResponse += aiResponses.shopping
      } else if (lowerContent.includes("投资") || lowerContent.includes("理财") || lowerContent.includes("收益")) {
        aiResponse += aiResponses.investment
      } else if (lowerContent.includes("警察") || lowerContent.includes("公安") || lowerContent.includes("洗钱")) {
        aiResponse += aiResponses.impersonation
      } else if (lowerContent.includes("刷单") || lowerContent.includes("兼职") || lowerContent.includes("垫付")) {
        aiResponse += aiResponses["part-time"]
      } else {
        aiResponse += "根据您的描述，建议您保持警惕：\n\n🔍 分析要点：\n• 任何要求提前付款的都要谨慎\n• 过高的收益承诺通常不可信\n• 通过官方渠道核实信息真实性\n• 保护好个人隐私和财产信息\n\n如果您不确定，建议咨询专业人士或相关部门。记住：宁可错过机会，也不要冒险受骗！"
      }

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: aiResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      addChatMessage({ role: 'assistant', content: aiResponse })
      setIsLoading(false)
    }, 1500)
  }

  const handlePresetScenario = (scenario: typeof presetScenarios[0]) => {
    sendMessage(scenario.prompt)
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">AI防诈助手</h1>
        <p className="text-lg text-muted-foreground">
          智能识别诈骗场景，提供专业的防范建议
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 场景选择 */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                常见场景
              </CardTitle>
              <CardDescription>
                选择一个场景开始对话
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {presetScenarios.map((scenario) => (
                <Button
                  key={scenario.id}
                  variant="outline"
                  className="w-full h-auto p-3 text-left"
                  onClick={() => handlePresetScenario(scenario)}
                >
                  <div>
                    <div className="font-medium text-sm">{scenario.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {scenario.description}
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* 安全提醒 */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-600">
                <AlertTriangle className="h-5 w-5 mr-2" />
                安全提醒
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• 遇到可疑情况立即停止操作</p>
              <p>• 通过官方渠道核实信息</p>
              <p>• 不要透露个人敏感信息</p>
              <p>• 如已被骗请立即报警</p>
            </CardContent>
          </Card>
        </div>

        {/* 聊天界面 */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
                智能对话
              </CardTitle>
              <CardDescription>
                描述您遇到的情况，获取专业建议
              </CardDescription>
            </CardHeader>
            
            {/* 消息区域 */}
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      选择一个场景开始对话，或直接描述您的情况
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`flex max-w-[80%] ${
                            message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          <Avatar className="w-8 h-8 mx-2">
                            <AvatarFallback>
                              {message.role === 'user' ? (
                                <User className="h-4 w-4" />
                              ) : (
                                <Bot className="h-4 w-4" />
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`rounded-lg p-3 ${
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">
                              {message.content}
                            </p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString('zh-CN', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex">
                          <Avatar className="w-8 h-8 mx-2">
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-muted rounded-lg p-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>

              {/* 输入区域 */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="描述您遇到的情况..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage(inputValue)
                      }
                    }}
                    disabled={isLoading}
                  />
                  <Button
                    onClick={() => sendMessage(inputValue)}
                    disabled={!inputValue.trim() || isLoading}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}