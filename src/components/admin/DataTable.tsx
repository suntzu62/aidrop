import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowDown, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  searchable?: boolean;
  searchKeys?: string[];
  pagination?: boolean;
  itemsPerPage?: number;
  filters?: {
    key: string;
    options: { value: string; label: string }[];
  }[];
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  searchable = false,
  searchKeys = [],
  pagination = false,
  itemsPerPage = 10,
  filters = []
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeFilters, setActiveFilters] = useState<{[key: string]: string}>({});
  
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update filtered data when props change
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Handle search with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      if (!searchable || searchTerm.trim() === '') {
        applyFiltersAndSort(data);
        return;
      }
      
      const keys = searchKeys.length > 0 ? searchKeys : Object.keys(data[0] || {});
      const filtered = data.filter(item => {
        return keys.some(key => {
          const value = item[key];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          }
          if (typeof value === 'number') {
            return value.toString().includes(searchTerm);
          }
          return false;
        });
      });
      
      applyFiltersAndSort(filtered);
    }, 300);
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, data, searchable, searchKeys]);

  // Apply filters and sort
  const applyFiltersAndSort = (dataToFilter: any[]) => {
    // Apply filters
    let result = [...dataToFilter];
    
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter(item => item[key] === value);
      }
    });
    
    // Apply sorting
    if (sortKey) {
      result = [...result].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    setFilteredData(result);
    setCurrentPage(1); // Reset to first page after filtering/sorting
  };

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    
    // Apply new filters
    let filtered = [...data];
    
    Object.entries(newFilters).forEach(([filterKey, filterValue]) => {
      if (filterValue && filterValue !== 'all') {
        filtered = filtered.filter(item => item[filterKey] === filterValue);
      }
    });
    
    applyFiltersAndSort(filtered);
  };

  // Handle sorting
  const handleSort = (key: string) => {
    const direction = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDirection(direction);
    
    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredData(sorted);
  };

  // Pagination logic
  const totalPages = pagination ? Math.ceil(filteredData.length / itemsPerPage) : 1;
  const paginatedData = pagination
    ? filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredData;
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate status badge styles
  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'delivered':
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
      case 'processing':
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'canceled':
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className="overflow-hidden rounded-lg">
      {/* Search and Filter Bar */}
      {(searchable || filters.length > 0) && (
        <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-wrap items-center justify-between gap-4">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full md:w-80"
              />
            </div>
          )}
          
          <div className="flex items-center space-x-3 flex-wrap gap-2">
            {filters.map((filter) => (
              <div key={filter.key} className="relative">
                <select
                  value={activeFilters[filter.key] || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  className="pl-3 pr-8 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                >
                  <option value="">Todos</option>
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortKey === column.key && (
                      <span>
                        {sortDirection === 'asc' ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <motion.tr 
                  key={rowIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: rowIndex * 0.03 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column) => (
                    <td key={`${rowIndex}-${column.key}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {column.key === 'status' ? (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusStyles(row[column.key])}`}>
                          {row[column.key]}
                        </span>
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-6 py-10 text-center text-gray-500"
                >
                  Nenhum dado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredData.length)} de {filteredData.length} resultados
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === currentPage;
              
              return (
                <button
                  key={index}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-8 h-8 rounded-md ${
                    isActive 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;