import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { TrendingUp, Calendar, Target, AlertTriangle, RefreshCw } from 'lucide-react';
import { analyticsService } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ForecastChart = () => {
  const [forecastData, setForecastData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadForecastData();
    loadRecommendations();
  }, [timeRange]);

  const loadForecastData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getSalesForecast(undefined, timeRange);
      setForecastData(data);
    } catch (error) {
      console.error('Error loading forecast:', error);
      setError('Erro ao carregar previsão de vendas');
      // Set fallback data
      setForecastData({
        dates: Array.from({ length: timeRange }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - timeRange + i);
          return date.toISOString().split('T')[0];
        }),
        historical: Array.from({ length: Math.floor(timeRange / 2) }, () => Math.floor(Math.random() * 5000) + 2000),
        forecast: Array.from({ length: Math.ceil(timeRange / 2) }, () => Math.floor(Math.random() * 6000) + 2500),
        predictedRevenue: 45000,
        predictedOrders: 180,
        growthRate: 12.5
      });
    } finally {
      setLoading(false);
    }
  };

  const loadRecommendations = async () => {
    try {
      const data = await analyticsService.getStockRecommendations();
      setRecommendations(data);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      // Set fallback recommendations
      setRecommendations([
        {
          productTitle: 'Smartphone Samsung Galaxy A54',
          currentStock: 15,
          recommendedStock: 25,
          priority: 'medium',
          recommendation: 'Recomendamos aumentar o estoque em 10 unidades baseado na previsão de vendas.',
          stockoutDate: '2024-02-15'
        },
        {
          productTitle: 'Notebook Dell Inspiron 15',
          currentStock: 3,
          recommendedStock: 15,
          priority: 'high',
          recommendation: 'Estoque crítico! Reabasteça urgentemente para evitar perda de vendas.',
          stockoutDate: '2024-01-25'
        }
      ]);
    }
  };

  const handleRetry = () => {
    loadForecastData();
    loadRecommendations();
  };

  const chartData = {
    labels: forecastData?.dates || [],
    datasets: [
      {
        label: 'Vendas Históricas',
        data: forecastData?.historical || [],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Previsão',
        data: forecastData?.forecast || [],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderDash: [5, 5],
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Análise Preditiva de Vendas'
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: R$ ${context.parsed.y?.toLocaleString() || 0}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Data'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Vendas (R$)'
        },
        ticks: {
          callback: function(value: any) {
            return 'R$ ' + value.toLocaleString();
          }
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  return (
    <div className="space-y-6">
      {/* Forecast Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Análise Preditiva</h2>
              {error && (
                <button
                  onClick={handleRetry}
                  className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                  title="Tentar novamente"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value={7}>7 dias</option>
                <option value={30}>30 dias</option>
                <option value={90}>90 dias</option>
              </select>
            </div>
          </div>
          
          {error && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center text-yellow-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span className="text-sm">{error} - Usando dados de exemplo</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
          )}
        </div>

        {/* Forecast Metrics */}
        {forecastData && (
          <div className="p-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  R$ {(forecastData.predictedRevenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-gray-500">Receita Prevista</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {(forecastData.predictedOrders || 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Pedidos Previstos</div>
              </div>
              
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  (forecastData.growthRate || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {(forecastData.growthRate || 0) >= 0 ? '+' : ''}{(forecastData.growthRate || 0).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-500">Taxa de Crescimento</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stock Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-accent-500" />
            <h2 className="text-xl font-semibold text-gray-900">Recomendações de Estoque</h2>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-600' :
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {rec.priority === 'high' ? <AlertTriangle className="w-5 h-5" /> :
                   rec.priority === 'medium' ? <Calendar className="w-5 h-5" /> :
                   <Target className="w-5 h-5" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      {rec.productTitle}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rec.priority === 'high' ? 'Urgente' :
                       rec.priority === 'medium' ? 'Médio' : 'Baixo'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">
                    {rec.recommendation}
                  </p>
                  
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>Estoque atual: {rec.currentStock}</span>
                    <span>Recomendado: {rec.recommendedStock}</span>
                    <span>Previsão de esgotamento: {rec.stockoutDate}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {recommendations.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma recomendação disponível</p>
            <p className="text-sm text-gray-400 mt-1">
              As recomendações aparecerão baseadas no histórico de vendas
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForecastChart;