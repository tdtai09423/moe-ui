// src/constants/mockData.js

// --- 1. DỮ LIỆU NGƯỜI DÙNG & THỐNG KÊ ---
export const userData = {
  name: "Eric",
  balance: "$10,665.00",
  activeCoursesCount: 12,
  outstandingAmount: "$2,500.00",
  pendingChargesCount: 5
};

// --- 2. DANH SÁCH KHÓA HỌC (ENROLLED) - 20 items ---
export const coursesData = [
  { 
    key: '1', id: '1', 
    courseName: 'Course D Combined Method test', 
    university: 'National University of Singapore', 
    fee: '$500.00', paymentType: 'Recurring', billingCycle: 'Monthly', 
    enrolledDate: '14/01/26', billingDate: '14/01/26', nextBillDate: '01 Feb 2026', 
    status: 'Outstanding', 
    startDate: '15/01/26', endDate: '15/01/27', totalFee: '$6,000.00', outstandingAmount: '$500.00' 
  },
  { 
    key: '2', id: '2', 
    courseName: 'COURSE E - Advanced React Patterns', 
    university: 'Singapore Management University', 
    fee: '$500.00', paymentType: 'Recurring', billingCycle: 'Monthly', 
    enrolledDate: '14/01/26', billingDate: '05/01/26', nextBillDate: '01 Feb 2026', 
    status: 'Outstanding', 
    startDate: '14/01/26', endDate: '14/01/27', totalFee: '$6,000.00', outstandingAmount: '$500.00' 
  },
  { 
    key: '3', id: '3', 
    courseName: 'COURSE A - UI/UX Design Fundamentals', 
    university: 'Nanyang Technological University', 
    fee: '$500.00', paymentType: 'Recurring', billingCycle: 'Monthly', 
    enrolledDate: '13/01/26', billingDate: '05/01/26', nextBillDate: '—', 
    status: 'Paid', 
    startDate: '13/01/26', endDate: '13/01/27', totalFee: '$6,000.00', outstandingAmount: '$0.00' 
  },
  { 
    key: '4', id: '4', 
    courseName: 'COURSE B - Digital Marketing Strategy', 
    university: 'National University of Singapore', 
    fee: '$500.00', paymentType: 'Recurring', billingCycle: 'Monthly', 
    enrolledDate: '13/01/26', billingDate: '13/01/26', nextBillDate: '—', 
    status: 'Paid', 
    startDate: '13/01/26', endDate: '13/01/27', totalFee: '$6,000.00', outstandingAmount: '$0.00' 
  },
  { 
    key: '5', id: '5', 
    courseName: 'Course C - Data Science Bootcamp', 
    university: 'Nanyang Technological University', 
    fee: '$500.00', paymentType: 'One Time', billingCycle: '—', 
    enrolledDate: '13/01/26', billingDate: '—', nextBillDate: '—', 
    status: 'Fully Paid', 
    startDate: '13/01/26', endDate: '—', totalFee: '$500.00', outstandingAmount: '$0.00' 
  },
  { 
    key: '6', id: '6', 
    courseName: 'Artificial Intelligence Masterclass', 
    university: 'Singapore University of Technology and Design', 
    fee: '$1,200.00', paymentType: 'Recurring', billingCycle: 'Quarterly', 
    enrolledDate: '10/01/26', billingDate: '10/04/26', nextBillDate: '10 Apr 2026', 
    status: 'Paid', 
    startDate: '10/01/26', endDate: '10/01/28', totalFee: '$9,600.00', outstandingAmount: '$0.00' 
  },
  { 
    key: '7', id: '7', 
    courseName: 'Blockchain & Crypto Economics', 
    university: 'National University of Singapore', 
    fee: '$800.00', paymentType: 'Recurring', billingCycle: 'Monthly', 
    enrolledDate: '05/01/26', billingDate: '05/02/26', nextBillDate: '05 Feb 2026', 
    status: 'Outstanding', 
    startDate: '05/01/26', endDate: '05/06/26', totalFee: '$4,800.00', outstandingAmount: '$800.00' 
  },
  { 
    key: '8', id: '8', 
    courseName: 'Cyber Security Essentials', 
    university: 'Singapore Polytechnic', 
    fee: '$300.00', paymentType: 'One Time', billingCycle: '—', 
    enrolledDate: '01/01/26', billingDate: '—', nextBillDate: '—', 
    status: 'Fully Paid', 
    startDate: '01/01/26', endDate: '01/03/26', totalFee: '$300.00', outstandingAmount: '$0.00' 
  },
  { 
    key: '9', id: '9', 
    courseName: 'Business Analytics for Managers', 
    university: 'INSEAD Asia Campus', 
    fee: '$2,500.00', paymentType: 'Recurring', billingCycle: 'Semester', 
    enrolledDate: '15/12/25', billingDate: '15/05/26', nextBillDate: '15 May 2026', 
    status: 'Paid', 
    startDate: '15/12/25', endDate: '15/12/27', totalFee: '$10,000.00', outstandingAmount: '$0.00' 
  },
  { 
    key: '10', id: '10', 
    courseName: 'Cloud Computing with AWS', 
    university: 'Nanyang Technological University', 
    fee: '$450.00', paymentType: 'Recurring', billingCycle: 'Monthly', 
    enrolledDate: '20/12/25', billingDate: '20/01/26', nextBillDate: '20 Feb 2026', 
    status: 'Paid', 
    startDate: '20/12/25', endDate: '20/06/26', totalFee: '$2,700.00', outstandingAmount: '$0.00' 
  },
  { 
    key: '11', id: '11', 
    courseName: 'Psychology 101: Introduction', 
    university: 'James Cook University Singapore', 
    fee: '$600.00', paymentType: 'Recurring', billingCycle: 'Monthly', 
    enrolledDate: '25/12/25', billingDate: '25/01/26', nextBillDate: '25 Feb 2026', 
    status: 'Outstanding', 
    startDate: '25/12/25', endDate: '25/05/26', totalFee: '$3,600.00', outstandingAmount: '$600.00' 
  },
  { 
    key: '12', id: '12', 
    courseName: 'Graphic Design Masterclass', 
    university: 'LASALLE College of the Arts', 
    fee: '$350.00', paymentType: 'Recurring', billingCycle: 'Monthly', 
    enrolledDate: '28/12/25', billingDate: '28/01/26', nextBillDate: '28 Feb 2026', 
    status: 'Outstanding', 
    startDate: '28/12/25', endDate: '28/12/26', totalFee: '$4,200.00', outstandingAmount: '$350.00' 
  },
  { 
    key: '13', id: '13', 
    courseName: 'Machine Learning A-Z', 
    university: 'National University of Singapore', 
    fee: '$900.00', paymentType: 'Recurring', billingCycle: 'Monthly', 
    enrolledDate: '14/01/26', billingDate: '14/01/26', nextBillDate: '14 Feb 2026', 
    status: 'Paid', 
    startDate: '14/01/26', endDate: '14/07/26', totalFee: '$5,400.00', outstandingAmount: '$0.00' 
  },
  { 
    key: '14', id: '14', 
    courseName: 'Financial Accounting', 
    university: 'Singapore Management University', 
    fee: '$750.00', paymentType: 'Recurring', billingCycle: 'Monthly', 
    enrolledDate: '10/01/26', billingDate: '10/02/26', nextBillDate: '10 Feb 2026', 
    status: 'Paid', 
    startDate: '10/01/26', endDate: '10/01/27', totalFee: '$9,000.00', outstandingAmount: '$0.00' 
  },
  { 
    key: '15', id: '15', 
    courseName: 'English Literature: Shakespeare', 
    university: 'National University of Singapore', 
    fee: '$400.00', paymentType: 'One Time', billingCycle: '—', 
    enrolledDate: '01/01/26', billingDate: '—', nextBillDate: '—', 
    status: 'Fully Paid', 
    startDate: '01/01/26', endDate: '01/06/26', totalFee: '$400.00', outstandingAmount: '$0.00' 
  },
];

// --- 3. PHÍ ĐANG CHỜ (PENDING FEES) - 8 items ---
export const pendingFeesData = [
  { 
    key: '1', courseName: 'Course D Combined Method test', university: 'National University of Singapore',
    amount: '$500.00', cycle: 'Monthly', billDate: '14 Jan 2026', dueDate: '31 Jan 2026', daysLeft: '16 days', status: 'Outstanding' 
  },
  { 
    key: '2', courseName: 'COURSE E', university: 'Singapore Management University',
    amount: '$500.00', cycle: 'Monthly', billDate: '05 Jan 2026', dueDate: '31 Jan 2026', daysLeft: '16 days', status: 'Outstanding' 
  },
  { 
    key: '3', courseName: 'Blockchain & Crypto Economics', university: 'National University of Singapore',
    amount: '$800.00', cycle: 'Monthly', billDate: '05 Feb 2026', dueDate: '15 Feb 2026', daysLeft: '30 days', status: 'Outstanding' 
  },
  { 
    key: '4', courseName: 'Psychology 101: Introduction', university: 'James Cook University Singapore',
    amount: '$600.00', cycle: 'Monthly', billDate: '25 Jan 2026', dueDate: '05 Feb 2026', daysLeft: '21 days', status: 'Outstanding' 
  },
  { 
    key: '5', courseName: 'Graphic Design Masterclass', university: 'LASALLE College of the Arts',
    amount: '$350.00', cycle: 'Monthly', billDate: '28 Jan 2026', dueDate: '10 Feb 2026', daysLeft: '25 days', status: 'Outstanding' 
  },
  { 
    key: '6', courseName: 'Advanced React Patterns', university: 'Singapore Management University',
    amount: '$500.00', cycle: 'Monthly', billDate: '01 Feb 2026', dueDate: '15 Feb 2026', daysLeft: '31 days', status: 'Outstanding' 
  },
  { 
    key: '7', courseName: 'Data Science Bootcamp', university: 'Nanyang Technological University',
    amount: '$250.00', cycle: 'Installment', billDate: '01 Feb 2026', dueDate: '10 Feb 2026', daysLeft: '26 days', status: 'Outstanding' 
  },
  { 
    key: '8', courseName: 'IELTS Preparation', university: 'British Council Singapore',
    amount: '$200.00', cycle: 'One Time', billDate: '20 Jan 2026', dueDate: '30 Jan 2026', daysLeft: '15 days', status: 'Outstanding' 
  },
];

// --- 4. LỊCH SỬ THANH TOÁN (HISTORY) - 15 items ---
export const paymentHistoryData = [
  { key: '1', courseId: '1', courseName: 'Course D One Time Payment', university: 'National University of Singapore', amount: '$500.00', cycle: 'one_time', paidDate: '13 Jan 2026', method: 'PayNow', status: 'Paid' },
  { key: '2', courseId: '4', courseName: 'COURSE B PAID', university: 'National University of Singapore', amount: '$500.00', cycle: 'Monthly', paidDate: '13 Jan 2026', method: 'PayNow', status: 'Paid' },
  { key: '3', courseId: '3', courseName: 'COURSE A OUTSTANDING', university: 'Nanyang Technological University', amount: '$500.00', cycle: 'Monthly', paidDate: '14 Jan 2026', method: 'Account Balance', status: 'Paid' },
  { key: '4', courseId: '6', courseName: 'AI Masterclass Q1', university: 'SUTD', amount: '$1,200.00', cycle: 'Quarterly', paidDate: '10 Jan 2026', method: 'Credit Card', status: 'Paid' },
  { key: '5', courseId: '9', courseName: 'Business Analytics Sem 1', university: 'INSEAD', amount: '$2,500.00', cycle: 'Semester', paidDate: '15 Dec 2025', method: 'Bank Transfer', status: 'Paid' },
  { key: '6', courseId: '10', courseName: 'Cloud Computing Dec', university: 'NTU', amount: '$450.00', cycle: 'Monthly', paidDate: '20 Dec 2025', method: 'Account Balance', status: 'Paid' },
  { key: '7', courseId: '11', courseName: 'Psychology 101 Dec', university: 'JCU', amount: '$600.00', cycle: 'Monthly', paidDate: '25 Dec 2025', method: 'PayNow', status: 'Paid' },
  { key: '8', courseId: '12', courseName: 'Graphic Design Dec', university: 'LASALLE', amount: '$350.00', cycle: 'Monthly', paidDate: '28 Dec 2025', method: 'GrabPay', status: 'Paid' },
  { key: '9', courseId: '10', courseName: 'Cloud Computing Jan', university: 'NTU', amount: '$450.00', cycle: 'Monthly', paidDate: '20 Jan 2026', method: 'Account Balance', status: 'Paid' },
  { key: '10', courseId: '8', courseName: 'Cyber Security Full', university: 'Singapore Poly', amount: '$300.00', cycle: 'One Time', paidDate: '01 Jan 2026', method: 'Credit Card', status: 'Paid' },
  { key: '11', courseId: '14', courseName: 'Fin. Accounting Jan', university: 'SMU', amount: '$750.00', cycle: 'Monthly', paidDate: '10 Jan 2026', method: 'Giro', status: 'Paid' },
  { key: '12', courseId: '15', courseName: 'English Lit Full', university: 'NUS', amount: '$400.00', cycle: 'One Time', paidDate: '01 Jan 2026', method: 'PayNow', status: 'Paid' },
  { key: '13', courseId: '13', courseName: 'Machine Learning Jan', university: 'NUS', amount: '$900.00', cycle: 'Monthly', paidDate: '14 Jan 2026', method: 'Credit Card', status: 'Paid' },
  { key: '14', courseId: '2', courseName: 'COURSE E Dec', university: 'SMU', amount: '$500.00', cycle: 'Monthly', paidDate: '14 Dec 2025', method: 'Account Balance', status: 'Paid' },
  { key: '15', courseId: '1', courseName: 'Course D Dec', university: 'NUS', amount: '$500.00', cycle: 'Monthly', paidDate: '14 Dec 2025', method: 'PayNow', status: 'Paid' },
];

// --- 5. HÓA ĐƠN SẮP TỚI (UPCOMING) ---
export const upcomingBillsData = [
  { key: '1', courseId: '1', month: 'Feb 2026', due: '05/02/26', amount: '$500.00', status: 'Scheduled' },
  { key: '2', courseId: '1', month: 'Mar 2026', due: '05/03/26', amount: '$500.00', status: 'Scheduled' },
  { key: '3', courseId: '1', month: 'Apr 2026', due: '05/04/26', amount: '$500.00', status: 'Scheduled' },
  { key: '4', courseId: '2', month: 'Feb 2026', due: '05/02/26', amount: '$500.00', status: 'Scheduled' },
  { key: '5', courseId: '7', month: 'Feb 2026', due: '05/02/26', amount: '$800.00', status: 'Pending' },
];