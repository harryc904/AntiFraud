import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ClipboardList, MessageCircle, TrendingUp, Users, AlertTriangle } from "lucide-react"
import { FraudTypeChart, RegionPieChart } from "@/components/Charts"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                守护您的财产安全
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                专业的反诈宣传平台，提供真实案例教育、个人风险评估和智能AI助手，帮助您识别和防范各类电信网络诈骗
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/assessment">
                  立即开始风险评估
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/education">
                  学习防诈知识
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary" />
                <CardTitle>反诈教育</CardTitle>
                <CardDescription>
                  基于真实案例的防诈教育内容
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  收录网购诈骗、冒充诈骗、刷单诈骗等多种类型的真实案例，帮助您了解诈骗手法和防范措施
                </p>
                <Button className="mt-4" variant="outline" asChild>
                  <Link href="/education">开始学习</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <ClipboardList className="h-10 w-10 text-primary" />
                <CardTitle>风险评估</CardTitle>
                <CardDescription>
                  个性化的诈骗风险等级评估
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  通过科学的问卷调查，评估您的个人风险等级，提供针对性的防范建议和安全提醒
                </p>
                <Button className="mt-4" variant="outline" asChild>
                  <Link href="/assessment">开始测评</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MessageCircle className="h-10 w-10 text-primary" />
                <CardTitle>AI助手</CardTitle>
                <CardDescription>
                  智能反诈对话和场景模拟
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  与AI助手对话，模拟诈骗场景，学习正确的应对方法，提升您的防诈意识和能力
                </p>
                <Button className="mt-4" variant="outline" asChild>
                  <Link href="/ai-chat">立即体验</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">平台数据概览</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                基于真实数据构建的反诈防护体系
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <div className="text-center">
                  <div className="text-2xl font-bold">358+</div>
                  <div className="text-sm text-gray-500">真实诈骗案例</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-blue-500" />
                <div className="text-center">
                  <div className="text-2xl font-bold">70%+</div>
                  <div className="text-sm text-gray-500">学生主动式诈骗比例</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-green-500" />
                <div className="text-center">
                  <div className="text-2xl font-bold">335+</div>
                  <div className="text-sm text-gray-500">大学生用户样本</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">常见诈骗类型</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                了解最常见的诈骗手法，提高防范意识
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">网购诈骗</CardTitle>
                <CardDescription>137起案例</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  虚假购物网站、退款诈骗、客服诈骗等网购相关的诈骗手法
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">冒充诈骗</CardTitle>
                <CardDescription>77起案例</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  冒充公检法、银行客服、熟人等身份进行的诈骗活动
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-600">刷单诈骗</CardTitle>
                <CardDescription>72起案例</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  以刷单返利为诱饵，逐步诱导受害者转账的诈骗方式
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">数据分析</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                基于真实案例的数据分析，帮助您更好地了解诈骗趋势
              </p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <FraudTypeChart />
            <RegionPieChart />
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 反诈宣传平台. 守护您的财产安全.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#terms">
            使用条款
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#privacy">
            隐私政策
          </Link>
        </nav>
      </footer>
    </div>
  )
}