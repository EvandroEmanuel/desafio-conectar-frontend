"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Calendar, Shield, Edit, Save, X, Camera, Key, Bell, Palette } from "lucide-react"

interface UserProfile {
  id: number
  name: string
  email: string
  role: "admin" | "user" | "moderator"
  status: "active" | "inactive"
  createdAt: string
  avatar?: string
  phone?: string
  department?: string
  lastLogin?: string
}

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    id: 1,
    name: "Marcus Dev",
    email: "marcus@fleetsmanage.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15",
    phone: "(11) 99999-9999",
    department: "EDUCAÇÃO",
    lastLogin: "2024-12-21T19:46:24.000Z",
  })

  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone || "",
    department: profile.department || "",
  })

  const handleSave = () => {
    setProfile({
      ...profile,
      ...editForm,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone || "",
      department: profile.department || "",
    })
    setIsEditing(false)
  }

  const getRoleBadgeVariant = (role: UserProfile["role"]) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "moderator":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getRoleLabel = (role: UserProfile["role"]) => {
    switch (role) {
      case "admin":
        return "Administrador"
      case "moderator":
        return "Moderador"
      default:
        return "Usuário"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Perfil do Usuário</h1>
          <p className="text-muted-foreground">Gerencie suas informações pessoais e configurações</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback className="text-lg">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <Badge variant={getRoleBadgeVariant(profile.role)}>{getRoleLabel(profile.role)}</Badge>
              <Badge variant={profile.status === "active" ? "default" : "secondary"}>
                {profile.status === "active" ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Membro desde {new Date(profile.createdAt).toLocaleDateString("pt-BR")}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              Último acesso: {new Date(profile.lastLogin || "").toLocaleDateString("pt-BR")}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Pessoal</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="preferences">Preferências</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>Atualize suas informações pessoais e de contato</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        <X className="mr-2 h-4 w-4" />
                        Cancelar
                      </Button>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {profile.name}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {profile.email}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          placeholder="(11) 99999-9999"
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                          <span className="text-muted-foreground">📞</span>
                          {profile.phone || "Não informado"}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Departamento</Label>
                      {isEditing ? (
                        <Input
                          id="department"
                          value={editForm.department}
                          onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                          <span className="text-muted-foreground">🏢</span>
                          {profile.department || "Não informado"}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>Gerencie sua senha e configurações de segurança</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Key className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Senha</p>
                          <p className="text-sm text-muted-foreground">Última alteração há 30 dias</p>
                        </div>
                      </div>
                      <Button variant="outline">Alterar Senha</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Autenticação de Dois Fatores</p>
                          <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                        </div>
                      </div>
                      <Button variant="outline">Configurar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>Configure como você deseja receber notificações</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Notificações por Email</p>
                          <p className="text-sm text-muted-foreground">Receba atualizações importantes por email</p>
                        </div>
                      </div>
                      <Button variant="outline">Configurar</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Notificações Push</p>
                          <p className="text-sm text-muted-foreground">Receba notificações em tempo real</p>
                        </div>
                      </div>
                      <Button variant="outline">Configurar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferências</CardTitle>
                  <CardDescription>Personalize sua experiência no sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Palette className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Tema</p>
                          <p className="text-sm text-muted-foreground">Escolha entre tema claro ou escuro</p>
                        </div>
                      </div>
                      <Button variant="outline">Configurar</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">🌐</span>
                        <div>
                          <p className="font-medium">Idioma</p>
                          <p className="text-sm text-muted-foreground">Português (Brasil)</p>
                        </div>
                      </div>
                      <Button variant="outline">Alterar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
