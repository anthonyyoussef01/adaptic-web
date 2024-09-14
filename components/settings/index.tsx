"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Alert } from "@/components/ui/alert"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general")

  // AI Settings State
  const [isAutomatedTrading, setIsAutomatedTrading] = useState(true)
  const [riskLevel, setRiskLevel] = useState(50)
  const [riskAllocation, setRiskAllocation] = useState({
    Stocks: 50,
    Options: 30,
    Crypto: 20,
  })

  const totalRiskAllocation = Object.values(riskAllocation).reduce(
    (acc, val) => acc + val,
    0
  )

  const handleRiskChange = (assetType: string, value: number) => {
    setRiskAllocation((prev) => ({
      ...prev,
      [assetType]: value,
    }))
  }

  // Notification Settings State
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)

  // Trading Preferences State
  const [defaultOrderType, setDefaultOrderType] = useState("Limit")
  const [tradingHours, setTradingHours] = useState("Regular")

  // Security Settings State
  const [twoFactorAuth, setTwoFactorAuth] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [changePassword, setChangePassword] = useState("")

  return (
    <div className="mx-auto w-full space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-xl font-bold lg:text-2xl">Settings</h1>
        <p className="text-muted-foreground lg:text-lg">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="trading">Trading Preferences</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="mt-4 space-y-6">
          <Card className="rounded-2xl shadow-lg shadow-black/10">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="john.doe@example.com" />
                  </div>
                </div>
                <Button className="mt-4">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="mt-4 space-y-6">
          <Card className="rounded-2xl shadow-lg shadow-black/10">
            <CardHeader>
              <CardTitle> Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SMS Notifications</span>
                    <Switch
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Push Notifications</span>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </div>
                <Button className="mt-4">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trading Preferences Settings */}
        <TabsContent value="trading" className="mt-4 space-y-6">
          <Card className="rounded-2xl shadow-lg shadow-black/10">
            <CardHeader>
              <CardTitle> Trading Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="mt-4 space-y-4">
                  <div>
                    <Label>Default Order Type</Label>
                    <Select
                      value={defaultOrderType}
                      onValueChange={setDefaultOrderType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select order type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Market">Market</SelectItem>
                        <SelectItem value="Limit">Limit</SelectItem>
                        <SelectItem value="Stop">Stop</SelectItem>
                        <SelectItem value="Stop Limit">Stop Limit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Trading Hours</Label>
                    <Select
                      value={tradingHours}
                      onValueChange={setTradingHours}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select trading hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="Extended">Extended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="mt-4">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Settings */}
        <TabsContent value="ai" className="mt-4 space-y-6">
          <Card className="rounded-2xl shadow-lg shadow-black/10">
            <CardHeader>
              <CardTitle> AI-Powered Trading</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="mt-4 space-y-6">
                  <div className="flex items-center justify-between">
                    <span>
                      {isAutomatedTrading
                        ? "Automated Trading Enabled"
                        : "Enable Automated Trading"}
                    </span>
                    <Switch
                      checked={isAutomatedTrading}
                      onCheckedChange={setIsAutomatedTrading}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Risk Level</span>
                      <span>{riskLevel}%</span>
                    </div>
                    <Slider
                      value={[riskLevel]}
                      onValueChange={(value: number[]) =>
                        setRiskLevel(value[0])
                      }
                      max={100}
                      step={1}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Conservative</span>
                      <span>Aggressive</span>
                    </div>
                  </div>

                  {/* Configurable Risk Allocation */}
                  <div className="mt-6 space-y-4">
                    <CardTitle>Configure Risk Allocation</CardTitle>
                    {(
                      Object.keys(riskAllocation) as Array<
                        keyof typeof riskAllocation
                      >
                    ).map((assetType) => (
                      <div key={assetType} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{assetType}</span>
                          <span>{riskAllocation[assetType]}%</span>
                        </div>
                        <Slider
                          value={[riskAllocation[assetType]]}
                          onValueChange={(value: number[]) =>
                            handleRiskChange(assetType, value[0])
                          }
                          max={100}
                          step={1}
                        />
                      </div>
                    ))}
                    {totalRiskAllocation !== 100 && (
                      <div className="text-red-600">
                        Total allocation must equal 100%. Current total:{" "}
                        {totalRiskAllocation}%
                      </div>
                    )}
                  </div>
                  <Button className="mt-4">Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="mt-4 space-y-6">
          <Card className="rounded-2xl shadow-lg shadow-black/10">
            <CardHeader>
              <CardTitle> Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Two-Factor Authentication</span>
                    <Switch
                      checked={twoFactorAuth}
                      onCheckedChange={setTwoFactorAuth}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Login Alerts</span>
                    <Switch
                      checked={loginAlerts}
                      onCheckedChange={setLoginAlerts}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Change Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="New Password"
                      value={changePassword}
                      onChange={(e) => setChangePassword(e.target.value)}
                    />
                    <Button variant="default" className="mt-2">
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>{" "}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
