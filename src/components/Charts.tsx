"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const fraudTypeData = [
  { name: '网购诈骗', value: 137, percentage: 38.2 },
  { name: '冒充诈骗', value: 77, percentage: 21.5 },
  { name: '刷单诈骗', value: 72, percentage: 20.1 },
  { name: '投资诈骗', value: 45, percentage: 12.6 },
  { name: '游戏诈骗', value: 27, percentage: 7.5 }
]

const regionData = [
  { name: '上海', cases: 98, percentage: 27.4 },
  { name: '浙江', cases: 89, percentage: 24.9 },
  { name: '江苏', cases: 67, percentage: 18.7 },
  { name: '北京', cases: 56, percentage: 15.6 },
  { name: '广东', cases: 48, percentage: 13.4 }
]

const ageGroupData = [
  { name: '18-25岁', cases: 204, riskLevel: 'high' },
  { name: '26-35岁', cases: 89, riskLevel: 'medium' },
  { name: '36-50岁', cases: 45, riskLevel: 'low' },
  { name: '50岁以上', cases: 20, riskLevel: 'medium' }
]

const monthlyTrendData = [
  { month: '2024-06', cases: 28 },
  { month: '2024-07', cases: 35 },
  { month: '2024-08', cases: 42 },
  { month: '2024-09', cases: 48 },
  { month: '2024-10', cases: 56 },
  { month: '2024-11', cases: 63 }
]

const platformData = [
  { name: '小红书', cases: 89, percentage: 24.9 },
  { name: '微信', cases: 78, percentage: 21.8 },
  { name: 'QQ', cases: 65, percentage: 18.2 },
  { name: '电话', cases: 57, percentage: 15.9 },
  { name: '短信', cases: 39, percentage: 10.9 },
  { name: '其他', cases: 30, percentage: 8.4 }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    dataKey: string;
    value: number;
    payload: { percentage?: number };
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.dataKey}: {entry.value}
            {entry.payload.percentage && ` (${entry.payload.percentage}%)`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function FraudTypeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>诈骗类型分布</CardTitle>
        <CardDescription>各类诈骗案例数量统计</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fraudTypeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function RegionPieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>地区分布</CardTitle>
        <CardDescription>诈骗案例地区分布情况</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={regionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name} ${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="cases"
            >
              {regionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function AgeGroupChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>年龄段分析</CardTitle>
        <CardDescription>不同年龄段受骗情况</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ageGroupData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="cases" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function TrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>案例趋势</CardTitle>
        <CardDescription>近6个月诈骗案例数量变化</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="cases" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function PlatformChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>诈骗平台分布</CardTitle>
        <CardDescription>各平台诈骗案例分布</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={platformData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name} ${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="cases"
            >
              {platformData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}