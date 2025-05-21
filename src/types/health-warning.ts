/**
 * 预警设置接口
 * 定义了一个完整的预警设置所需的所有属性
 */
export interface WarningSettings {
  /** 患者编号 */
  patientId: string;
  /** 疾病分类，例如：内科、外科等 */
  diseaseType: string;
  /** 疾病名称 */
  diseaseName: string;
  /** 预警方式，可多选 */
  alertMethods: string[];
  /** 预警等级，例如：一级、二级等 */
  warningLevel: string;
  /** 预警条件组，至少包含一个条件 */
  conditions: WarningCondition[];
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
  /** 设置ID，新建时为空 */
  id?: string | number;
}

/**
 * 预警条件接口
 * 定义了单个监测指标的预警条件
 */
export interface WarningCondition {
  /** 监测指标类型，例如：血压、血糖等 */
  indicatorType: string;
  /** 比较方法：大于、小于、等于、介于 */
  compareMethod: '大于' | '小于' | '等于' | '介于';
  /** 范围值，根据compareMethod不同使用不同的字段 */
  rangeValues: {
    /** 单值比较（大于、小于、等于）时使用 */
    single: string;
    /** 范围比较（介于）时使用的最小值 */
    min: string;
    /** 范围比较（介于）时使用的最大值 */
    max: string;
  };
  /** 单位，例如：mmHg、mg/dL等 */
  unit?: string;
  /** 条件ID，可选 */
  id?: string | number;
}

/**
 * 患者接口
 * 定义了基本的患者信息
 */
export interface Patient {
  /** 患者ID */
  id: number;
  /** 患者姓名 */
  name: string;
  /** 性别 */
  gender?: '男' | '女';
  /** 年龄 */
  age?: number;
  /** 联系电话 */
  phone?: string;
  /** 住址 */
  address?: string;
  /** 病历号 */
  medicalRecordNo?: string;
  /** 疾病历史 */
  diseaseHistory?: Array<{
    /** 疾病分类 */
    type: string;
    /** 疾病名称 */
    name: string;
  }>;
}

/**
 * 预警信息接口
 * 定义了系统生成的预警信息
 */
export interface WarningInfo {
  /** 预警信息ID */
  id: number | string;
  /** 患者ID */
  patientId: number | string;
  /** 患者姓名 */
  patientName: string;
  /** 疾病分类 */
  diseaseType: string;
  /** 疾病名称 */
  diseaseName: string;
  /** 预警等级 */
  warningLevel: string;
  /** 预警时间 */
  warningTime: string;
  /** 预警状态：未读、已读、已处理 */
  status: 'unread' | 'read' | 'processed';
  /** 预警内容 */
  content: string;
  /** 触发的监测指标 */
  indicator?: string;
  /** 监测值 */
  monitorValue?: string;
  /** 阈值 */
  thresholdValue?: string;
  /** 处理意见 */
  processingNote?: string;
  /** 处理时间 */
  processedTime?: string;
  /** 处理人 */
  processedBy?: string;
  /** 患者详细信息 */
  patient?: Patient;
}

/**
 * 监测指标接口
 */
export interface MonitoringIndicator {
  /** 指标ID */
  id: string | number;
  /** 指标名称 */
  name: string;
  /** 指标单位 */
  unit?: string;
  /** 正常范围下限 */
  normalRangeLow?: number | string;
  /** 正常范围上限 */
  normalRangeHigh?: number | string;
  /** 指标分类 */
  category?: string;
}

/**
 * 随访计划接口
 */
export interface FollowupPlan {
  /** 计划ID */
  id: number | string;
  /** 患者ID */
  patientId: number | string;
  /** 患者姓名 */
  patientName: string;
  /** 随访类型 */
  followupType: string;
  /** 随访周期 */
  followupCycle: string;
  /** 下次随访日期 */
  nextFollowupDate: string;
  /** 随访时间 */
  followupTime: string;
  /** 随访内容 */
  content: string;
  /** 随访负责人 */
  responsiblePerson: string;
  /** 创建时间 */
  createdAt: string;
  /** 状态：待随访、已完成、已取消 */
  status: 'pending' | 'completed' | 'cancelled';
  /** 备注 */
  remarks?: string;
  /** 患者详细信息 */
  patient?: Patient;
}

/**
 * 随访记录接口
 */
export interface FollowupRecord {
  /** 记录ID */
  id: number | string;
  /** 关联的随访计划ID */
  planId: number | string;
  /** 患者ID */
  patientId: number | string;
  /** 患者姓名 */
  patientName: string;
  /** 疾病分类 */
  diseaseType: string;
  /** 疾病名称 */
  diseaseName: string;
  /** 随访日期 */
  followupDate: string;
  /** 随访时间 */
  followupTime: string;
  /** 随访方式：电话、面诊等 */
  followupMethod: string;
  /** 随访内容 */
  content: string;
  /** 干预措施 */
  interventionMeasures: string;
  /** 随访结果 */
  result: string;
  /** 随访人员 */
  followupStaff: string;
  /** 备注 */
  remarks?: string;
  /** 附件 */
  attachments?: string[];
}