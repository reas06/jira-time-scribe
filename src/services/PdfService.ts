
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

export interface TimeLogData {
  id: string;
  issueKey: string;
  issueSummary: string;
  date: string;
  timeSpent: number; // in minutes
  description: string;
}

export const generateTimeLogPdf = (
  logs: TimeLogData[], 
  period: 'week' | 'month',
  userName: string = 'User'
): jsPDF => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Get current date for header
  const currentDate = format(new Date(), 'MMMM d, yyyy');
  
  // Set up the document title and header
  doc.setFontSize(16);
  doc.text(`Time Tracking Report - ${period === 'week' ? 'Weekly' : 'Monthly'}`, 14, 22);
  
  doc.setFontSize(12);
  doc.text(`Generated on: ${currentDate}`, 14, 30);
  doc.text(`User: ${userName}`, 14, 38);
  
  // Calculate total time spent
  const totalMinutes = logs.reduce((total, log) => total + log.timeSpent, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const totalTimeText = `${totalHours}h ${remainingMinutes > 0 ? remainingMinutes + 'm' : ''}`;
  
  doc.text(`Total Time: ${totalTimeText}`, 14, 46);
  
  // Format the data for the table
  const tableData = logs.map(log => [
    log.issueKey,
    log.issueSummary,
    format(new Date(log.date), 'MMM d, yyyy'),
    formatTime(log.timeSpent),
    log.description
  ]);
  
  // Add the table to the PDF
  autoTable(doc, {
    head: [['Issue', 'Summary', 'Date', 'Time Spent', 'Description']],
    body: tableData,
    startY: 55,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 40 },
      2: { cellWidth: 25 },
      3: { cellWidth: 20 },
      4: { cellWidth: 'auto' }
    }
  });
  
  return doc;
};

// Helper function to format time in hours and minutes
const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  } else if (mins === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${mins}m`;
};

// Function to filter logs for the current week
export const filterLogsForCurrentWeek = (logs: TimeLogData[]): TimeLogData[] => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  
  // Set to the beginning of the current week (Sunday as day 0)
  startOfWeek.setDate(today.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);
  
  return logs.filter(log => new Date(log.date) >= startOfWeek);
};

// Function to filter logs for the current month
export const filterLogsForCurrentMonth = (logs: TimeLogData[]): TimeLogData[] => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  return logs.filter(log => new Date(log.date) >= startOfMonth);
};

