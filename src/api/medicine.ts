import axios from 'axios';

// 药品库存数据接口
export interface MedicineInventory {
  id: string;
  name: string;
  code: string;
  type: string;
  stock: number;
  unit: string;
  dailyUsage: number;
  daysRemaining: number;
  warningLevel: 'normal' | 'warning' | 'critical';
}

// 药品采购建议接口
export interface PurchaseAdvice {
  advice: string;
  urgent?: Array<{
    id: string;
    name: string;
    code: string;
    currentStock: number;
    unit: string;
    daysRemaining: number;
    suggestedOrder: number;
  }>;
}

// API响应数据接口
interface ApiResponse<T> {
  code: number;
  message?: string;
  data: T;
}

// 基础API URL
const API_URL = '/api/medicine';

/**
 * 获取所有药品库存数据
 */
export async function getAllMedicineInventory(): Promise<MedicineInventory[]> {
  try {
    const response = await axios.get<ApiResponse<MedicineInventory[]>>(`${API_URL}/inventory`);
    
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || '获取药品库存数据失败');
    }
  } catch (error) {
    console.error('获取药品库存数据错误:', error);
    throw error;
  }
}

/**
 * 根据关键词搜索药品库存
 * @param query 搜索关键词
 */
export async function searchMedicineInventory(query: string): Promise<MedicineInventory[]> {
  try {
    const response = await axios.get<ApiResponse<MedicineInventory[]>>(`${API_URL}/inventory/search`, {
      params: { query }
    });
    
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || '搜索药品库存数据失败');
    }
  } catch (error) {
    console.error('搜索药品库存错误:', error);
    throw error;
  }
}

/**
 * 获取药品采购建议
 */
export async function getMedicinePurchaseAdvice(): Promise<PurchaseAdvice> {
  try {
    const response = await axios.get<ApiResponse<PurchaseAdvice>>(`${API_URL}/purchase-advice`);
    
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || '获取药品采购建议失败');
    }
  } catch (error) {
    console.error('获取药品采购建议错误:', error);
    throw error;
  }
}

/**
 * 更新药品库存信息
 * @param medicineId 药品ID
 * @param data 更新数据
 */
export async function updateMedicineInventory(
  medicineId: string, 
  data: { stock?: number; minStock?: number; dailyUsage?: number }
): Promise<void> {
  try {
    const response = await axios.put<ApiResponse<null>>(
      `${API_URL}/inventory/${medicineId}`, 
      data
    );
    
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '更新药品库存信息失败');
    }
  } catch (error) {
    console.error('更新药品库存信息错误:', error);
    throw error;
  }
}

/**
 * 获取药品库存历史趋势
 * @param medicineId 药品ID
 * @param days 历史天数，默认30天
 */
export async function getMedicineInventoryTrend(medicineId: string, days: number = 30): Promise<any> {
  try {
    const response = await axios.get<ApiResponse<any>>(`${API_URL}/inventory/${medicineId}/trend`, {
      params: { days }
    });
    
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || '获取药品库存趋势数据失败');
    }
  } catch (error) {
    console.error('获取药品库存趋势错误:', error);
    throw error;
  }
}

/**
 * 获取药品分类列表
 */
export async function getMedicineCategories(): Promise<any[]> {
  try {
    const response = await axios.get<ApiResponse<any[]>>(`${API_URL}/categories`);
    
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || '获取药品分类数据失败');
    }
  } catch (error) {
    console.error('获取药品分类错误:', error);
    throw error;
  }
}

/**
 * 导出药品库存报表
 * @param format 导出格式，如 'excel' 或 'pdf'
 */
export async function exportMedicineInventory(format: string = 'excel'): Promise<string> {
  try {
    const response = await axios.get<Blob>(`${API_URL}/inventory/export`, {
      params: { format },
      responseType: 'blob'
    });
    
    // 创建下载链接
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `药品库存报表.${format === 'excel' ? 'xlsx' : 'pdf'}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return url;
  } catch (error) {
    console.error('导出药品库存报表错误:', error);
    throw error;
  }
}

/**
 * 获取库存预警药品列表
 */
export async function getLowStockMedicines(): Promise<MedicineInventory[]> {
  try {
    const response = await axios.get<ApiResponse<MedicineInventory[]>>(`${API_URL}/inventory/low-stock`);
    
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || '获取库存预警药品数据失败');
    }
  } catch (error) {
    console.error('获取库存预警药品错误:', error);
    throw error;
  }
}