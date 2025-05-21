/**
 * 聊天消息类型
 */
export interface ChatMessage {
  /** 消息ID */
  id: number;
  /** 消息内容 */
  content: string;
  /** 消息发送时间戳 */
  timestamp: number;
  /** 发送者类型：'doctor'医生, 'patient'患者, 'system'系统 */
  sender: 'doctor' | 'patient' | 'system';
  /** 发送者名称 */
  senderName: string;
}

/**
 * 咨询状态
 * - active: 进行中
 * - ended: 已结束
 */
export type ConsultationStatus = 'active' | 'ended';

/**
 * 病人信息类型
 */
export interface Patient {
  /** 病人ID */
  id: number;
  /** 病人姓名 */
  name: string;
  /** 性别 */
  gender: '男' | '女';
  /** 年龄 */
  age: number;
  /** 联系方式 */
  phone: string;
  /** 病历号 */
  medicalRecordNo: string;
}

/**
 * 咨询记录类型
 */
export interface ConsultationRecord {
  /** 咨询ID */
  id: number;
  /** 患者ID */
  patientId: number;
  /** 患者信息 */
  patient: Patient;
  /** 医生ID */
  doctorId: number;
  /** 医生姓名 */
  doctorName: string;
  /** 咨询开始时间 */
  startTime: number;
  /** 咨询结束时间 */
  endTime: number | null;
  /** 咨询状态 */
  status: ConsultationStatus;
  /** 咨询消息列表 */
  messages: ChatMessage[];
}