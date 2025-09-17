'use client'

import { useState } from 'react';
import { mockUsers } from './mockUsers';

export default function UsuariosAdminPage() {
  const [users, setUsers] = useState(mockUsers);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEdit = (user: any) => {
    setEditingId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const handleSave = (id: number) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, name: editName, email: editEmail } : user
    ));
    setEditingId(null);
  };

  return (
  <div className="min-h-screen bg-black pt-8 px-2 md:px-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-black border-[#fee600] rounded-2xl border-2 p-4 md:p-8 shadow-[6px_8px_24px_0px_rgba(253,230,0,0.4)] flex flex-col items-center">
        <h1 className="text-center text-2xl font-anton text-[#fee600] mb-6">Administración de Usuarios</h1>
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[600px] bg-black border border-[#fee600] rounded-lg text-white table-fixed">
            <colgroup>
              <col className="w-1/4" />
              <col className="w-1/4" />
              <col className="w-1/6" />
              <col className="w-1/3" />
            </colgroup>
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-[#fee600] text-center">Nombre</th>
                <th className="px-4 py-2 border-b border-[#fee600] text-center">Email</th>
                <th className="px-4 py-2 border-b border-[#fee600] text-center">Rol</th>
                <th className="px-4 py-2 border-b border-[#fee600] text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="hover:bg-[#fee600]/10 transition-colors">
                  <td className="px-4 py-2 border-b border-[#fee600] text-center align-middle">
                    {editingId === user.id ? (
                      <input
                        className="border border-[#fee600] rounded px-2 py-1 w-full bg-black text-white focus:ring-2 focus:ring-[#fee600] text-center"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="px-4 py-2 border-b border-[#fee600] text-center align-middle">
                    {editingId === user.id ? (
                      <input
                        className="border border-[#fee600] rounded px-2 py-1 w-full bg-black text-white focus:ring-2 focus:ring-[#fee600] text-center"
                        value={editEmail}
                        onChange={e => setEditEmail(e.target.value)}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="px-4 py-2 border-b border-[#fee600] text-center align-middle">{user.role}</td>
                  <td className="px-4 py-2 border-b border-[#fee600] flex flex-col md:flex-row items-center justify-center gap-2 align-middle">
                    {editingId === user.id ? (
                      <>
                        <button
                          className="bg-[#fee600] text-black font-semibold px-3 py-1 rounded hover:bg-black hover:text-[#fee600] border border-[#fee600] transition-colors"
                          onClick={() => handleSave(user.id)}
                        >
                          Guardar
                        </button>
                        <button
                          className="bg-gray-400 text-black font-semibold px-3 py-1 rounded hover:bg-black hover:text-[#fee600] border border-[#fee600] transition-colors"
                          onClick={() => setEditingId(null)}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-[#fee600] text-black font-semibold px-3 py-1 rounded hover:bg-black hover:text-[#fee600] border border-[#fee600] transition-colors"
                          onClick={() => handleEdit(user)}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-[#fee600] text-black font-semibold px-3 py-1 rounded hover:bg-black hover:text-[#fee600] border border-[#fee600] transition-colors"
                          onClick={() => handleDelete(user.id)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
