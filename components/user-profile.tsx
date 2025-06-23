"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Calendar, Shield, Edit, Save, X, Camera, Key, Bell, Palette } from "lucide-react"
import { useUser } from "@/hooks/use-user"
import { ROLES_OBJECT } from "@/config"
import { useHandleError } from "./handler-issues"
import { apiClient } from "@/lib/utils"


interface UserProfile {
  id: string
  name: string
  email: string
  role: typeof ROLES_OBJECT.ADMIN | typeof ROLES_OBJECT.USER
  status: "active" | "inactive"
  createdAt: string
}

export default function UserProfile() {
  const { sub } = useUser()
  const { handlerError } = useHandleError()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    id: "",
    name: "",
    email: "",
    role: ROLES_OBJECT.USER,
    status: "inactive",
    createdAt: "",
  })

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  })

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await apiClient.get("/users/me")
        const data = res.data

        setProfile({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          status: data.isActive ? "active" : "inactive",
          createdAt: data.createdAt,
        })

        setEditForm({
          name: data.name,
          email: data.email,
        })
      } catch (error) {
        handlerError("Erro ao carregar perfil")
      }
    }

    fetchProfile()
  }, [sub])

  const handleSave = async () => {
    try {
      await apiClient.patch(`/users/me`, {
        name: editForm.name,
        email: editForm.email,
      })

      setProfile({ ...profile, ...editForm })
      setIsEditing(false)
    } catch (error) {
      handlerError("Erro ao salvar perfil")
    }
  }

  const handleCancel = () => {
    setEditForm({
      name: profile.name,
      email: profile.email
    })
    setIsEditing(false)
  }

  const getRoleBadgeVariant = (role: UserProfile["role"]) =>
    role === "admin" ? "destructive" : "outline"

  const getRoleLabel = (role: UserProfile["role"]) =>
    role === "admin" ? "Administrador" : "Usuário"

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
                <AvatarImage alt={profile.name} />
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
              Membro desde{" "}
              {profile.createdAt}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              Último acesso:{" "}
            </div>
          </CardContent>
        </Card>

        {/* Main Info Tabs */}
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
                    {[
                      { label: "Nome", id: "name", icon: <User />, field: "name" },
                      { label: "Email", id: "email", icon: <Mail />, field: "email" },
                      { label: "Telefone", id: "phone", icon: "📞", field: "phone" },
                      { label: "Departamento", id: "department", icon: "🏢", field: "department" },
                    ].map(({ label, id, icon, field }) => (
                      <div key={id} className="space-y-2">
                        <Label htmlFor={id}>{label}</Label>
                        {isEditing ? (
                          <Input
                            id={id}
                            value={editForm[field as keyof typeof editForm]}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                [field]: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                            <span className="text-muted-foreground">{icon}</span>
                            {profile[field as keyof typeof profile] || "Não informado"}
                          </div>
                        )}
                      </div>
                    ))}
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
                  {/* Simples placeholders */}
                  <div className="flex justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Notificações por Email</p>
                        <p className="text-sm text-muted-foreground">Receba por email</p>
                      </div>
                    </div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferências</CardTitle>
                  <CardDescription>Personalize sua experiência</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Palette className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Tema</p>
                        <p className="text-sm text-muted-foreground">Claro ou escuro</p>
                      </div>
                    </div>
                    <Button variant="outline">Configurar</Button>
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
