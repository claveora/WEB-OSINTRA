import React, { useEffect, useState } from 'react';
import { Users, Briefcase, Award } from 'lucide-react';
import api from '@/lib/axios';
import type { Position } from '@/types';

const DivisionsSection: React.FC = () => {
    const [positions, setPositions] = useState<Position[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const response = await api.get('/positions');
                setPositions(response.data);
            } catch (error) {
                console.error('Failed to fetch divisions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPositions();
    }, []);

    const getIconForPosition = (index: number) => {
        const icons = [Users, Briefcase, Award];
        return icons[index % icons.length];
    };

    if (loading) {
        return (
            <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#3B4D3A' }} />
                        <p style={{ color: '#6E8BA3' }}>Memuat posisi...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="divisions" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            <style>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .position-card {
                    animation: slideInUp 0.6s ease-out forwards;
                }
                
                .position-card:hover {
                    transform: translateY(-8px);
                }
                
                .position-icon {
                    transition: all 0.3s ease;
                }
                
                .position-card:hover .position-icon {
                    transform: scale(1.1);
                }
            `}</style>

            <div className="absolute inset-0 opacity-5" style={{
                background: 'radial-gradient(circle at 20% 50%, #E8DCC3 0%, transparent 50%)',
                pointerEvents: 'none'
            }} />

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{
                            backgroundColor: 'rgba(232, 220, 195, 0.2)',
                            color: '#3B4D3A'
                        }}>
                            Organisasi Siswa
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#3B4D3A' }}>
                        Struktur OSIS
                    </h2>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-12 h-1 rounded-full" style={{ backgroundColor: '#E8DCC3' }} />
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3B4D3A' }} />
                        <div className="w-12 h-1 rounded-full" style={{ backgroundColor: '#E8DCC3' }} />
                    </div>
                    <p style={{ color: '#6E8BA3' }} className="text-lg max-w-2xl mx-auto">
                        Berbagai posisi dan divisi yang berperan penting dalam menjalankan organisasi OSIS
                    </p>
                </div>

                {positions.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {positions.map((position, index) => {
                            const IconComponent = getIconForPosition(index);
                            return (
                                <div
                                    key={position.id}
                                    className="position-card p-6 rounded-2xl transition-all duration-300 group"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        backgroundColor: '#FFFFFF',
                                        border: '1px solid rgba(232, 220, 195, 0.3)',
                                        boxShadow: '0 4px 15px rgba(59, 77, 58, 0.08)'
                                    }}
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-4">
                                            <div 
                                                className="position-icon p-3 rounded-xl transition-all duration-300"
                                                style={{
                                                    background: 'linear-gradient(135deg, #3B4D3A 0%, #2a3729 100%)'
                                                }}
                                            >
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>
                                            <div 
                                                className="text-xs font-semibold px-3 py-1 rounded-full"
                                                style={{
                                                    backgroundColor: 'rgba(232, 220, 195, 0.2)',
                                                    color: '#3B4D3A'
                                                }}
                                            >
                                                #{index + 1}
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-white" style={{ color: '#3B4D3A' }}>
                                            {position.name}
                                        </h3>
                                        
                                        <p style={{ color: '#6E8BA3' }} className="text-sm leading-relaxed flex-grow">
                                            {position.description || 'Posisi penting dalam struktur OSIS'}
                                        </p>

                                        <div 
                                            className="mt-4 pt-4 border-t transition-all duration-300 opacity-0 group-hover:opacity-100"
                                            style={{ borderColor: 'rgba(232, 220, 195, 0.2)' }}
                                        >
                                        
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="mb-4">
                            <Users className="w-16 h-16 mx-auto opacity-20" style={{ color: '#3B4D3A' }} />
                        </div>
                        <p style={{ color: '#6E8BA3' }} className="text-lg font-medium">
                            Belum ada posisi yang terdaftar
                        </p>
                        <p style={{ color: '#6E8BA3' }} className="text-sm mt-2">
                            Posisi akan ditampilkan setelah ditambahkan melalui dashboard
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DivisionsSection;
