'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Search, Plus, Settings, Trash2, Eye, X } from 'lucide-react'
import { getEquipment, Equipment } from '@/lib/equipment'
import { apiFetch } from '@/lib/api'
import { Label } from '@/components/ui/label'

// Dialog Component for Create/Edit
function EquipmentDialog({
  isOpen,
  onClose,
  onSave,
  initialData
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: Equipment | null;
}) {
  const [formData, setFormData] = useState({
    name: '',
    serial_number: '',
    department: '',
    employee: '',
    category_id: '',
    status: 'active',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        serial_number: initialData.serial_number || '',
        department: initialData.department || '',
        employee: initialData.employee || '',
        category_id: initialData.category_id ? initialData.category_id.toString() : '',
        status: initialData.status || 'active',
      })
    } else {
      setFormData({
        name: '', serial_number: '', department: '', employee: '', category_id: '', status: 'active'
      })
    }
  }, [initialData, isOpen])

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-[500px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{initialData ? 'Edit Equipment' : 'New Equipment'}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Serial Number</Label>
            <Input value={formData.serial_number} onChange={e => setFormData({ ...formData, serial_number: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Department</Label>
              <Input value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Employee</Label>
              <Input value={formData.employee} onChange={e => setFormData({ ...formData, employee: e.target.value })} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={() => onSave(formData)}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function EquipmentPage() {
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Equipment | null>(null)

  const loadEquipment = async () => {
    try {
      const data = await getEquipment()
      setEquipmentList(data)
    } catch (e) {
      console.error("Failed to load equipment", e)
    }
  }

  useEffect(() => {
    loadEquipment()
  }, [])

  const handleSave = async (data: any) => {
    try {
      if (editingItem) {
        await apiFetch(`/api/equipment/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
      } else {
        await apiFetch('/api/equipment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
      }
      setIsDialogOpen(false)
      loadEquipment()
    } catch (e) {
      alert("Failed to save: " + e)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await apiFetch(`/api/equipment/${id}`, { method: 'DELETE' })
      loadEquipment()
    } catch (e) {
      alert("Failed to delete")
    }
  }

  const filteredEquipment = equipmentList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.serial_number || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.department || '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 relative">
      <EquipmentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        initialData={editingItem}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Equipment</h1>
          <p className="text-muted-foreground">
            Manage all company assets and equipment
          </p>
        </div>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => { setEditingItem(null); setIsDialogOpen(true); }}>
          <Plus className="h-4 w-4" />
          New Equipment
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, serial number, or department..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Equipment Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Equipment ({filteredEquipment.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Equipment Name</th>
                  <th className="pb-3 font-medium">Employee</th>
                  <th className="pb-3 font-medium">Department</th>
                  <th className="pb-3 font-medium">Serial Number</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredEquipment.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-b border-border/50 transition-colors hover:bg-muted/50 cursor-pointer ${selectedEquipment === item.id ? 'bg-blue-500/10' : ''
                      }`}
                    onClick={() => setSelectedEquipment(item.id)}
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
                          {item.name.charAt(0)}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-xs">
                            {(item.employee || "Unk")
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{item.employee || "Unassigned"}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge variant="outline">{item.department || "General"}</Badge>
                    </td>
                    <td className="py-4">
                      <code className="rounded bg-muted px-2 py-1 text-xs">
                        {item.serial_number}
                      </code>
                    </td>
                    <td className="py-4">
                      <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>{item.status}</Badge>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingItem(item);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(item.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Equipment Categories */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Equipment Categories</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-gradient-to-br from-blue-500/5 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Computers</h3>
                  <p className="text-sm text-muted-foreground">
                    Responsible: OdooBot
                  </p>
                </div>
                <Badge variant="info">24 Units</Badge>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-gradient-to-br from-purple-500/5 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Software</h3>
                  <p className="text-sm text-muted-foreground">
                    Responsible: OdooBot
                  </p>
                </div>
                <Badge variant="purple">12 Licenses</Badge>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-gradient-to-br from-emerald-500/5 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Monitors</h3>
                  <p className="text-sm text-muted-foreground">
                    Responsible: Mitchell Admin
                  </p>
                </div>
                <Badge variant="success">18 Units</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
