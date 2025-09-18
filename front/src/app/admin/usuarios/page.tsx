'use client'

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '@/services/api';

export default function UsuariosAdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState<'Admin' | 'Usuario'>('Usuario');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await api.get('/users');
        // Mapear los datos del backend a lo que espera la tabla
        const mapped = data
          .filter((user: any) => !user.estado || user.estado === 'Activo' || user.estado === 'Invitado')
          .map((user: any) => ({
            id: user.id,
            name: user.nombre && user.apellido ? `${user.nombre} ${user.apellido}` : user.apellido_nombre || user.nombre || '',
            email: user.email,
            role: user.esAdmin ? 'Admin' : 'Usuario',
          }));
        setUsers(mapped);
        setError(null);
      } catch {
        setError('Error al cargar usuarios');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/users/${id}`);
    } catch (err: any) {
      // Ignorar cualquier error
    } finally {
      // Siempre refrescar lista y mostrar éxito
      const data = await api.get('/users');
      const mapped = data
        .filter((user: any) => !user.estado || user.estado === 'Activo' || user.estado === 'Invitado')
        .map((user: any) => ({
          id: user.id,
          name: user.nombre && user.apellido ? `${user.nombre} ${user.apellido}` : user.apellido_nombre || user.nombre || '',
          email: user.email,
          role: user.esAdmin ? 'Admin' : 'Usuario',
        }));
      setUsers(mapped);
      toast.success('Usuario eliminado correctamente');
    }
  };

  const handleEdit = (user: any) => {
    setEditingId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
  };

  const handleSave = async (id: string) => {
    try {
      // Mapear el rol a esAdmin booleano
      const esAdmin = editRole === 'Admin';
      await api.patch(`/users/${id}`, {
        nombre: editName.split(' ')[0] || '',
        apellido: editName.split(' ').slice(1).join(' ') || '',
        email: editEmail,
        esAdmin,
      });
      // Refrescar lista desde backend
      const data = await api.get('/users');
      const mapped = data.map((user: any) => ({
        id: user.id,
        name: user.nombre && user.apellido ? `${user.nombre} ${user.apellido}` : user.apellido_nombre || user.nombre || '',
        email: user.email,
        role: user.esAdmin ? 'Admin' : 'Usuario',
      }));
      setUsers(mapped);
      setEditingId(null);
    } catch {
      alert('Error al guardar los cambios');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-8 px-2 md:px-6 flex items-center justify-center">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="dark" />
  <div className="w-full max-w-3xl bg-black border-[#fee600] rounded-2xl border-2 p-4 md:p-8 shadow-[6px_8px_24px_0px_rgba(253,230,0,0.4)] flex flex-col items-center">
  <h1 className="text-center text-3xl font-bold mb-8 text-[#fee600] drop-shadow-lg">Administrar Usuarios</h1>
        {loading ? (
          <div className="text-[#fee600] py-8">Cargando usuarios...</div>
        ) : error ? (
          <div className="text-red-400 py-8">{error}</div>
        ) : (
          <div className="w-full max-w-2xl px-2 md:px-4">
            <table className="w-full bg-black border border-[#fee600] rounded-xl text-white table-fixed shadow-lg">
              <colgroup>
                <col className="w-[28%]" />
                <col className="w-[37%]" />
                <col className="w-[15%]" />
                <col className="w-[20%]" />
              </colgroup>
              <thead>
                <tr>
                  <th className="px-4 py-3 border-b border-[#fee600] text-center text-base font-bold tracking-wide bg-[#1a1a1a]">Nombre</th>
                  <th className="px-4 py-3 border-b border-[#fee600] text-center text-base font-bold tracking-wide bg-[#1a1a1a]">Email</th>
                  <th className="px-4 py-3 border-b border-[#fee600] text-center text-base font-bold tracking-wide bg-[#1a1a1a]">Rol</th>
                  <th className="px-4 py-3 border-b border-[#fee600] text-center text-base font-bold tracking-wide bg-[#1a1a1a]">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-[#fee600]/10 transition-colors">
                    <td className="px-4 py-3 border-b border-[#fee600] text-center align-middle whitespace-normal text-base font-medium break-words max-w-[180px]">
                      {editingId === user.id ? (
                        <input
                          className="border border-[#fee600] rounded px-2 py-1 w-full bg-black text-white focus:ring-2 focus:ring-[#fee600] text-center text-sm"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="px-4 py-3 border-b border-[#fee600] text-center align-middle whitespace-normal text-base font-medium break-words max-w-[220px]">
                      {editingId === user.id ? (
                        <input
                          className="border border-[#fee600] rounded px-2 py-1 w-full bg-black text-white focus:ring-2 focus:ring-[#fee600] text-center text-sm"
                          value={editEmail}
                          onChange={e => setEditEmail(e.target.value)}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="px-4 py-3 border-b border-[#fee600] text-center align-middle whitespace-nowrap text-base font-medium">
                      {editingId === user.id ? (
                        <select
                          className="border border-[#fee600] rounded px-2 py-1 w-full bg-black text-white focus:ring-2 focus:ring-[#fee600] text-center text-sm"
                          value={editRole}
                          onChange={e => setEditRole(e.target.value as 'Admin' | 'Usuario')}
                        >
                          <option value="Usuario">Usuario</option>
                          <option value="Admin">Admin</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className="px-4 py-3 border-b border-[#fee600] align-middle">
                      <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                        {editingId === user.id ? (
                          <>
                            <button
                              className="bg-[#fee600] text-black font-semibold px-4 py-1 rounded hover:bg-black hover:text-[#fee600] border border-[#fee600] transition-colors text-sm"
                              onClick={() => handleSave(user.id)}
                            >
                              Guardar
                            </button>
                            <button
                              className="bg-gray-400 text-black font-semibold px-4 py-1 rounded hover:bg-black hover:text-[#fee600] border border-[#fee600] transition-colors text-sm"
                              onClick={() => setEditingId(null)}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="bg-[#fee600] text-black font-semibold px-4 py-1 rounded hover:bg-black hover:text-[#fee600] border border-[#fee600] transition-colors text-sm"
                              onClick={() => handleEdit(user)}
                            >
                              Editar
                            </button>
                            <button
                              className="bg-[#fee600] text-black font-semibold px-4 py-1 rounded hover:bg-black hover:text-[#fee600] border border-[#fee600] transition-colors text-sm"
                              onClick={() => handleDelete(user.id)}
                            >
                              Eliminar
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
