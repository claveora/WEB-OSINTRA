import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import DashboardLayout from '@/layouts/DashboardLayout';
import api from '@/lib/axios';
import Swal from 'sweetalert2';
import Modal from '@/components/ui/Modal';

const PositionsPage: React.FC = () => {
    const [positions, setPositions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [editing, setEditing] = useState<any | null>(null);

    const fetch = async () => {
        try {
            const res = await api.get('/positions');
            setPositions(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetch(); }, []);

    // Modal state for custom form
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState<{ id?: number | null; name: string; description?: string }>({ id: null, name: '', description: '' });

    const openModal = (pos?: any) => {
        if (pos) {
            setForm({ id: pos.id, name: pos.name ?? '', description: pos.description ?? '' });
        } else {
            setForm({ id: null, name: '', description: '' });
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const submitForm = async () => {
        if (!form.name || !form.name.trim()) {
            // inline validation
            Swal.fire('Gagal', 'Nama posisi wajib diisi', 'error');
            return;
        }

        try {
            if (form.id) {
                await api.put(`/positions/${form.id}`, { name: form.name, description: form.description });
                Swal.fire('Berhasil', 'Position updated', 'success');
            } else {
                await api.post('/positions', { name: form.name, description: form.description });
                Swal.fire('Berhasil', 'Position created', 'success');
            }
            fetch();
            closeModal();
        } catch (err: any) {
            const resp = err?.response?.data;
            if (resp && resp.errors) {
                const first = Object.values(resp.errors)[0];
                const message = Array.isArray(first) ? first[0] : String(first);
                Swal.fire('Gagal', message, 'error');
            } else {
                const msg = resp?.message || err?.message || 'Error';
                Swal.fire('Gagal', msg, 'error');
            }
        }
    };

    const remove = async (id: number) => {
        const result = await Swal.fire({ title: 'Hapus position?', icon: 'warning', showCancelButton: true });
        if (!result.isConfirmed) return;
        await api.delete(`/positions/${id}`);
        Swal.fire('Dihapus', '', 'success');
        fetch();
    };

    return (
        <>
            <Head title="Positions - OSINTRA" />
            <DashboardLayout>
                <div className="space-y-6 p-6">
                    <div>
                        <h1 className="text-3xl font-bold text-[#3B4D3A]">Positions</h1>
                        <p className="text-[#6E8BA3] mt-1">Manage positions / jabatan OSIS</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#6E8BA3]">Tambah atau kelola posisi OSIS</p>
                        </div>
                        <div>
                            <button onClick={() => openModal()} className="bg-[#3B4D3A] text-white px-4 py-2 rounded-lg">Add</button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        {loading ? <p>Loading...</p> : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr>
                                        <th className="py-2">#</th>
                                        <th>Name</th>
                                        <th>Deskripsi</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {positions.map((p, idx) => (
                                        <tr key={p.id} className="border-t">
                                            <td className="py-3">{idx+1}</td>
                                            <td>{p.name}</td>
                                            <td>{p.description ?? '-'}</td>
                                            <td className="text-right">
                                                <button onClick={() => openModal(p)} className="px-3 py-1 mr-2 border rounded">Edit</button>
                                                <button onClick={() => remove(p.id)} className="px-3 py-1 bg-red-500 text-white rounded">Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                {/* Modal for add/edit */}
                <Modal
                    isOpen={modalOpen}
                    title={form.id ? 'Edit Posisi' : 'Tambah Posisi'}
                    onClose={closeModal}
                    onConfirm={submitForm}
                    confirmLabel={form.id ? 'Update' : 'Add'}
                    cancelLabel="Batal"
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama posisi</label>
                            <input
                                value={form.name}
                                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Nama posisi"
                                className="mt-1 block w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#3B4D3A]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Deskripsi / jobdesk</label>
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Deskripsi / jobdesk"
                                className="mt-1 block w-full rounded-lg border border-gray-200 p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#3B4D3A]"
                            />
                        </div>
                    </div>
                </Modal>
            </DashboardLayout>
        </>
    );
};

export default PositionsPage;
