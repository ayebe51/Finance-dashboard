import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DashboardData {
    summary: {
        income: number;
        expenses: number;
        netBalance: number;
    };
    trends: {
        label: string;
        income: number;
        expense: number;
    }[];
    categories: {
        name: string;
        amount: number;
        color: string;
    }[];
}

const Reports: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRequests = async () => {
            try {
                const res = await api.get('/reports/dashboard');
                setData(res.data);
            } catch (error) {
                console.error('Failed to load reports data', error);
            } finally {
                setLoading(false);
            }
        };
        loadRequests();
    }, []);

    if (loading) return <div className="p-10 text-center">Memuat laporan...</div>;
    if (!data) return <div className="p-10 text-center">Gagal memuat data.</div>;

    // Charts Config
    const lineChartData = {
        labels: data.trends.map(t => t.label),
        datasets: [
            {
                label: 'Pemasukan',
                data: data.trends.map(t => t.income),
                borderColor: '#2bee6c', // Primary Green
                backgroundColor: 'rgba(43, 238, 108, 0.5)',
                tension: 0.4,
            },
            {
                label: 'Pengeluaran',
                data: data.trends.map(t => t.expense),
                borderColor: '#ef4444', // Red
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
                tension: 0.4,
            },
        ],
    };

    const doughnutChartData = {
        labels: data.categories.map(c => c.name),
        datasets: [
            {
                data: data.categories.map(c => c.amount),
                backgroundColor: data.categories.map(c => c.color || '#cccccc'),
                borderColor: '#ffffff',
                borderWidth: 2,
            },
        ],
    };

    const formatCurrency = (val: number) => {
         return new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0 
        }).format(val);
    };

    const handleExportPDF = () => {
        if (!data) return;

        const doc = new jsPDF();

        // Header
        doc.setFontSize(20);
        doc.text('Laporan Keuangan', 14, 22);
        doc.setFontSize(10);
        doc.text(`Dibuat pada: ${new Date().toLocaleDateString('id-ID')}`, 14, 30);

        // Summary Table
        autoTable(doc, {
            startY: 40,
            head: [['Metrik', 'Nilai']],
            body: [
                ['Total Pemasukan', formatCurrency(data.summary.income)],
                ['Total Pengeluaran', formatCurrency(data.summary.expenses)],
                ['Saldo Bersih', formatCurrency(data.summary.netBalance)],
            ],
            theme: 'striped',
            headStyles: { fillColor: [43, 238, 108] },
        });

        // Trends Table
        const summaryEndY = (doc as any).lastAutoTable.finalY + 10;
        doc.text('Tren Bulanan', 14, summaryEndY);
        
        autoTable(doc, {
            startY: summaryEndY + 5,
            head: [['Bulan', 'Pemasukan', 'Pengeluaran']],
            body: data.trends.map(t => [t.label, formatCurrency(t.income), formatCurrency(t.expense)]),
        });

        // Categories Table
        const trendsEndY = (doc as any).lastAutoTable.finalY + 10;
        doc.text('Rincian Pengeluaran', 14, trendsEndY);

        autoTable(doc, {
            startY: trendsEndY + 5,
            head: [['Kategori', 'Jumlah']],
            body: data.categories.map(c => [c.name, formatCurrency(c.amount)]),
        });

        doc.save('finance_report.pdf');
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Laporan & Analisis</h1>
                    <p className="text-sm text-gray-500">Ringkasan Bulan Ini</p>
                </div>
                <button 
                    onClick={handleExportPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
                >
                     <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                     Unduh PDF
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-sm">
                    <p className="text-gray-500 text-sm font-medium">Total Pemasukan</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(data.summary.income)}</h3>
                </div>
                 <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-sm">
                    <p className="text-gray-500 text-sm font-medium">Total Pengeluaran</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(data.summary.expenses)}</h3>
                </div>
                 <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-sm">
                    <p className="text-gray-500 text-sm font-medium">Saldo Bersih</p>
                    <h3 className={`text-2xl font-bold mt-1 ${data.summary.netBalance >= 0 ? 'text-[#2bee6c]' : 'text-red-500'}`}>
                        {formatCurrency(data.summary.netBalance)}
                    </h3>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Line Chart */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pemasukan vs Pengeluaran (6 Bulan)</h3>
                    <div className="h-80">
                         <Line options={{ responsive: true, maintainAspectRatio: false }} data={lineChartData} />
                    </div>
                </div>

                {/* Doughnut Chart */}
                 <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pengeluaran Teratas</h3>
                    <div className="h-64 flex justify-center">
                        {data.categories.length > 0 ? (
                            <Doughnut options={{ responsive: true, maintainAspectRatio: false }} data={doughnutChartData} />
                        ) : (
                            <div className="flex items-center justify-center text-gray-500 text-sm">Tidak ada data pengeluaran</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Reports;
