import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Activity, Users, Wrench } from 'lucide-react'

export default function Reporting() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reporting Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of maintenance activities and asset health.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Maintenance Requests</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">+14% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Equipment</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">3 units under maintenance</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.5%</div>
              <p className="text-xs text-muted-foreground">SLA Compliance Rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2h</div>
              <p className="text-xs text-muted-foreground">-0.5h from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder Charts Area */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Maintenance Trends</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed bg-muted/50 text-muted-foreground">
                Placeholder: Weekly Request Volume Chart
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Requests by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-full flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Computers</p>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[45%] rounded-full bg-blue-500" />
                    </div>
                  </div>
                  <div className="ml-4 font-medium">45%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-full flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Machinery</p>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[30%] rounded-full bg-emerald-500" />
                    </div>
                  </div>
                  <div className="ml-4 font-medium">30%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-full flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Facilities</p>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[25%] rounded-full bg-orange-500" />
                    </div>
                  </div>
                  <div className="ml-4 font-medium">25%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
