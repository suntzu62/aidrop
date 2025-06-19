import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, TrendingDown, AlertTriangle, FolderSync as Sync, Edit3, ExternalLink } from 'lucide-react';
import { useStore } from '../store/useStore';
import { inventoryService } from '../services/api';
import { format } from 'date-fns';

const InventoryTableLive = () => {
  const { products, isConnected, setProducts, updateProduct } = useStore();
  const [syncing, setSyncing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ price: number; stock: number }>({ price: 0, stock: 0 });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await inventoryService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      await inventoryService.syncProducts();
      await loadProducts();
    } catch (error) {
      console.error('Error syncing products:', error);
    } finally {
      setSyncing(false);
    }
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setEditValues({ price: product.price, stock: product.stock });
  };

  const handleSave = async (id: string) => {
    try {
      await inventoryService.updateProduct(id, editValues);
      updateProduct(id, editValues);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'text-red-600', bg: 'bg-red-100', label: 'Sem estoque' };
    if (stock < 10) return { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Estoque baixo' };
    return { color: 'text-green-600', bg: 'bg-green-100', label: 'Em estoque' };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">Inventário em Tempo Real</h2>
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
          
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Sync className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Sincronizando...' : 'Sincronizar'}</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estoque
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendidos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Última Sync
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              const isEditing = editingId === product.id;
              
              return (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg flex items-center justify-center mr-3">
                        <Package className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {product.title}
                        </div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editValues.price}
                        onChange={(e) => setEditValues({ ...editValues, price: Number(e.target.value) })}
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                        step="0.01"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900">
                        R$ {product.price.toFixed(2)}
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editValues.stock}
                        onChange={(e) => setEditValues({ ...editValues, stock: Number(e.target.value) })}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                          {product.stock}
                        </span>
                        {product.stock < 10 && (
                          <AlertTriangle className="w-4 h-4 text-yellow-500 ml-2" />
                        )}
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{product.sold}</span>
                      <TrendingUp className="w-4 h-4 text-green-500 ml-2" />
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.status === 'active' ? 'bg-green-100 text-green-800' :
                      product.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status === 'active' ? 'Ativo' : 
                       product.status === 'paused' ? 'Pausado' : 'Fechado'}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(product.lastSync), 'dd/MM HH:mm')}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSave(product.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Salvar
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum produto encontrado</p>
          <button
            onClick={handleSync}
            className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            Sincronizar produtos
          </button>
        </div>
      )}
    </div>
  );
};

export default InventoryTableLive;