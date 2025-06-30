"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, MapPin, Users, Calendar } from "lucide-react"
import { fraudCases } from "@/data/fraudCases"

type FraudCase = {
  id: string
  title: string
  type: string
  region: string
  target: string
  amount: number
  description: string
  prevention: string[]
  date: string
  platform?: string
}

export default function EducationPage() {
  const [cases, setCases] = useState<FraudCase[]>(fraudCases)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedRegion, setSelectedRegion] = useState<string>("all")

  const fraudTypes = ["all", "网购诈骗", "冒充诈骗", "刷单诈骗", "投资诈骗", "游戏诈骗"]
  const regions = ["all", "上海", "浙江", "江苏", "北京", "广东"]

  useEffect(() => {
    let filtered = fraudCases

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((item) => item.type === selectedType)
    }

    if (selectedRegion !== "all") {
      filtered = filtered.filter((item) => item.region === selectedRegion)
    }

    setCases(filtered)
  }, [searchTerm, selectedType, selectedRegion])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "网购诈骗":
        return "bg-red-100 text-red-800"
      case "冒充诈骗":
        return "bg-orange-100 text-orange-800"
      case "刷单诈骗":
        return "bg-yellow-100 text-yellow-800"
      case "投资诈骗":
        return "bg-purple-100 text-purple-800"
      case "游戏诈骗":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">反诈教育中心</h1>
        <p className="text-lg text-muted-foreground mb-6">
          学习真实案例，掌握防诈技巧，守护财产安全
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索案例..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="选择类型" />
            </SelectTrigger>
            <SelectContent>
              {fraudTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === "all" ? "所有类型" : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="选择地区" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region === "all" ? "所有地区" : region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground mb-6">
          共找到 <span className="font-semibold">{cases.length}</span> 个案例
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((fraudCase) => (
          <Card key={fraudCase.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge className={getTypeColor(fraudCase.type)}>
                  {fraudCase.type}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {fraudCase.date}
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">
                {fraudCase.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {fraudCase.region}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {fraudCase.target}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {fraudCase.description}
              </p>
              
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">损失金额</div>
                <div className="text-lg font-bold text-red-600">
                  ¥{fraudCase.amount.toLocaleString()}
                </div>
              </div>

              {fraudCase.platform && (
                <div className="mb-4">
                  <Badge variant="outline" className="text-xs">
                    平台: {fraudCase.platform}
                  </Badge>
                </div>
              )}

              <div className="mb-4">
                <div className="text-sm font-medium mb-2">防范要点</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {fraudCase.prevention.slice(0, 2).map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-1 h-1 rounded-full bg-current mt-2 mr-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                查看详情
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {cases.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">没有找到匹配的案例</div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedType("all")
              setSelectedRegion("all")
            }}
          >
            清除筛选条件
          </Button>
        </div>
      )}
    </div>
  )
}