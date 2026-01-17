import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Descriptions, Tag, Table, Input, Modal, Checkbox, message, Spin, Empty, Popconfirm } from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    UserAddOutlined,
    SearchOutlined,
    UserDeleteOutlined,
    CheckOutlined,
    CloseOutlined,
    ExclamationCircleOutlined,
    DollarOutlined,
    BookOutlined,
    BankOutlined,
    CalendarOutlined,
    CreditCardOutlined,
    ReloadOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { courseService } from '../../../services/courseService';
import styles from './index.module.scss';

const { Search } = Input;

const CourseDetail = () => {
    const { courseCode } = useParams();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    // State
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
    const [availableStudents, setAvailableStudents] = useState([]);
    const [studentSearchQuery, setStudentSearchQuery] = useState('');
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);
    const [enrolledSearchQuery, setEnrolledSearchQuery] = useState('');
    const [isRemoveMode, setIsRemoveMode] = useState(false);
    const [selectedEnrollmentIds, setSelectedEnrollmentIds] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    // Fetch course detail
    const fetchCourseDetail = async () => {
        setLoading(true);
        try {
            const response = await courseService.getCourseDetail(courseCode);
            // Map backend response to frontend state
            const mappedCourse = {
                courseId: response.courseId,
                courseCode: response.courseCode,
                courseName: response.courseName,
                providerName: response.providerName,
                mode: response.mode,
                status: response.status,
                startDate: response.startDate,
                endDate: response.endDate,
                paymentType: response.paymentType,
                billingCycle: response.billingCycle,
                totalFee: response.totalFee,
                fee: response.totalFee // Alias for compatibility
            };
            setCourse(mappedCourse);
            
            // Map enrolled students
            const mappedStudents = (response.enrolledStudents || []).map(student => ({
                educationAccountId: student.accountHolderId || student.AccountHolderId,
                accountHolderId: student.accountHolderId || student.AccountHolderId,
                studentName: student.studentName || student.StudentName,
                userName: student.studentName || student.StudentName,
                nric: student.nric || student.NRIC || '-',
                enrolledAt: student.enrolledAt || student.EnrolledAt,
                totalPaid: student.totalPaid || student.TotalPaid || 0,
                totalDue: student.totalDue || student.TotalDue || 0
            }));
            console.log('mappedStudents', response);
            setEnrolledStudents(mappedStudents);
        } catch (error) {
            messageApi.error(error.message || 'Failed to load course details');
            console.error('Error fetching course:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch available students (non-enrolled)
    const fetchAvailableStudents = async () => {
        if (!course) return;
        try {
            const response = await courseService.getNonEnrolledAccounts(course.courseId);
            setAvailableStudents(response.nonEnrolledAccounts || []);
        } catch (error) {
            messageApi.error('Failed to load available students');
            console.error('Error fetching available students:', error);
        }
    };

    useEffect(() => {
        if (courseCode) {
            fetchCourseDetail();
        }
    }, [courseCode]);

    useEffect(() => {
        if (isAddStudentModalOpen && course) {
            fetchAvailableStudents();
        }
    }, [isAddStudentModalOpen, course]);

    // Calculate fee per cycle based on total fee and duration
    const calculateFeePerCycle = (course) => {
        if (!course) return 0;
        
        // If no start/end dates, return the fee as is (one-time payment)
        if (!course.startDate || !course.endDate) {
            return course.fee || course.totalFee || 0;
        }
        
        const startDate = new Date(course.startDate);
        const endDate = new Date(course.endDate);
        const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                          (endDate.getMonth() - startDate.getMonth()) + 1;
        
        let cycles = 1;
        const billingCycle = course.billingCycle?.toLowerCase();
        
        switch (billingCycle) {
            case 'monthly':
                cycles = monthsDiff;
                break;
            case 'quarterly':
                cycles = Math.ceil(monthsDiff / 3);
                break;
            case 'biannually':
                cycles = Math.ceil(monthsDiff / 6);
                break;
            case 'yearly':
                cycles = Math.ceil(monthsDiff / 12);
                break;
            default:
                cycles = 1;
        }
        
        const totalFee = course.totalFee || course.fee || 0;
        return cycles > 0 ? totalFee / cycles : totalFee;
    };

    // Calculate stats
    const totalCollected = useMemo(() => {
        return enrolledStudents.reduce((sum, student) => sum + (student.totalPaid || 0), 0);
    }, [enrolledStudents]);

    const totalOutstanding = useMemo(() => {
        return enrolledStudents.reduce((sum, student) => sum + (student.totalDue || 0), 0);
    }, [enrolledStudents]);

    // Filter available students
    const filteredAvailableStudents = useMemo(() => {
        if (!studentSearchQuery.trim()) return availableStudents;
        const query = studentSearchQuery.toLowerCase();
        return availableStudents.filter(student =>
            student.fullName?.toLowerCase().includes(query) ||
            student.nric?.toLowerCase().includes(query)
        );
    }, [availableStudents, studentSearchQuery]);

    // Filter enrolled students
    const filteredEnrolledStudents = useMemo(() => {
        if (!enrolledSearchQuery.trim()) return enrolledStudents;
        const query = enrolledSearchQuery.toLowerCase();
        return enrolledStudents.filter(student =>
            (student.studentName || student.userName)?.toLowerCase().includes(query) ||
            student.nric?.toLowerCase().includes(query)
        );
    }, [enrolledStudents, enrolledSearchQuery]);

    // Toggle student selection
    const toggleStudentSelection = (studentId) => {
        setSelectedStudentIds(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    // Toggle enrollment selection
    const toggleEnrollmentSelection = (studentId) => {
        setSelectedEnrollmentIds(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    // Select all enrollments
    const toggleSelectAllEnrollments = () => {
        if (selectedEnrollmentIds.length === filteredEnrolledStudents.length) {
            setSelectedEnrollmentIds([]);
        } else {
            setSelectedEnrollmentIds(filteredEnrolledStudents.map(s => s.accountHolderId || s.educationAccountId));
        }
    };

    // Handle add students
    const handleAddStudents = async () => {
        if (selectedStudentIds.length === 0 || !course) return;

        setSubmitting(true);
        try {
            await courseService.bulkEnrollStudents(courseCode, {
                accountIds: selectedStudentIds
            });

            messageApi.success(`Successfully enrolled ${selectedStudentIds.length} student(s)`);
            setIsAddStudentModalOpen(false);
            setSelectedStudentIds([]);
            setStudentSearchQuery('');
            
            // Refresh course detail
            await fetchCourseDetail();
        } catch (error) {
            messageApi.error(error.message || 'Failed to enroll students');
            console.error('Error enrolling students:', error);
        } finally {
            setSubmitting(false);
        }
    };

    // Handle remove students
    const handleRemoveStudents = async () => {
        if (selectedEnrollmentIds.length === 0 || !course) return;

        setSubmitting(true);
        try {
            await courseService.bulkRemoveStudents(courseCode, {
                educationAccountIds: selectedEnrollmentIds
            });

            messageApi.success(`Successfully removed ${selectedEnrollmentIds.length} student(s)`);
            setSelectedEnrollmentIds([]);
            setIsRemoveMode(false);
            
            // Refresh course detail
            await fetchCourseDetail();
        } catch (error) {
            messageApi.error(error.message || 'Failed to remove students');
            console.error('Error removing students:', error);
        } finally {
            setSubmitting(false);
        }
    };

    // Handle delete course
    const handleDeleteCourse = async () => {
        // Implement if needed
        messageApi.info('Delete course functionality not implemented');
    };

    // Enrolled students table columns
    const enrolledColumns = [
        ...(isRemoveMode ? [{
            title: (
                <Checkbox
                    checked={selectedEnrollmentIds.length === filteredEnrolledStudents.length && filteredEnrolledStudents.length > 0}
                    onChange={toggleSelectAllEnrollments}
                />
            ),
            dataIndex: 'select',
            key: 'select',
            width: 50,
            render: (_, record) => (
                <Checkbox
                    checked={selectedEnrollmentIds.includes(record.accountHolderId || record.educationAccountId)}
                    onChange={() => toggleEnrollmentSelection(record.accountHolderId || record.educationAccountId)}
                    onClick={(e) => e.stopPropagation()}
                />
            )
        }] : []),
        {
            title: 'Student Name',
            dataIndex: 'studentName',
            key: 'studentName',
            render: (text, record) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{record.studentName || record.userName || text}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{record.nric || '-'}</div>
                </div>
            )
        },
        {
            title: 'Enrolled Date',
            dataIndex: 'enrolledAt',
            key: 'enrolledAt',
            render: (date) => date ? new Date(date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }) : '-'
        }
    ];

    // Available students table columns
    const availableColumns = [
        {
            title: (
                <Checkbox
                    checked={selectedStudentIds.length === filteredAvailableStudents.length && filteredAvailableStudents.length > 0}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setSelectedStudentIds(filteredAvailableStudents.map(s => s.educationAccountId));
                        } else {
                            setSelectedStudentIds([]);
                        }
                    }}
                />
            ),
            dataIndex: 'select',
            key: 'select',
            width: 50,
            render: (_, record) => (
                <Checkbox
                    checked={selectedStudentIds.includes(record.educationAccountId)}
                    onChange={() => toggleStudentSelection(record.educationAccountId)}
                />
            )
        },
        {
            title: 'Student Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text, record) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{text}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{record.nric || '-'}</div>
                </div>
            )
        }
    ];

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <Spin size="large" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className={styles.emptyContainer}>
                <Empty description="Course not found" />
                <Button type="primary" onClick={() => navigate('/courses')} style={{ marginTop: 16 }}>
                    Back to Courses
                </Button>
            </div>
        );
    }

    const billingCycleLabels = {
        'Monthly': 'Monthly',
        'Quarterly': 'Quarterly',
        'Biannually': 'Bi-annually',
        'Yearly': 'Annually'
    };

    return (
        <div className={styles.courseDetailContainer}>
            {contextHolder}

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/courses')}
                        type="text"
                        className={styles.backButton}
                    />
                    <div>
                        <h1 className={styles.courseTitle}>{course.courseName}</h1>
                        <span className={styles.courseCode}>{course.courseCode}</span>
                    </div>
                </div>
                {/* <div className={styles.headerActions}>
                    <Popconfirm
                        title="Delete Course"
                        description="Are you sure you want to delete this course? This action cannot be undone."
                        onConfirm={handleDeleteCourse}
                        okText="Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true }}
                    >
                        <Button icon={<DeleteOutlined />} danger>
                            Delete Course
                        </Button>
                    </Popconfirm>
                </div> */}
            </div>

            {/* Stats Cards */}
            <div className={styles.statsContainer}>
                <Card className={styles.statCard}>
                    <div className={styles.statContent}>
                        <div className={styles.statIcon} style={{ backgroundColor: '#e0f2fe' }}>
                            <UserAddOutlined style={{ color: '#0284c7', fontSize: 24 }} />
                        </div>
                        <div className={styles.statDetails}>
                            <div className={styles.statLabel}>Total Enrolled</div>
                            <div className={styles.statValue}>{enrolledStudents.length}</div>
                        </div>
                    </div>
                </Card>
                <Card className={styles.statCard}>
                    <div className={styles.statContent}>
                        <div className={styles.statIcon} style={{ backgroundColor: '#eef7ec' }}>
                            <DollarOutlined style={{ color: '#66b30e', fontSize: 24 }} />
                        </div>
                        <div className={styles.statDetails}>
                            <div className={styles.statLabel}>Total Fee</div>
                            <div className={styles.statValue}>${(course?.totalFee || course?.fee || 0).toFixed(2)}</div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Course Details */}
            <Card title="Course Details" className={styles.detailsCard}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', padding: '4px 0' }}>
                    {/* Course Name */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <BookOutlined style={{ fontSize: '20px', color: '#64748b', marginTop: '2px' }} />
                        <div>
                            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Course Name</div>
                            <div style={{ fontWeight: 500, color: '#0f172a' }}>{course.courseName}</div>
                        </div>
                    </div>

                    {/* Provider */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <BankOutlined style={{ fontSize: '20px', color: '#64748b', marginTop: '2px' }} />
                        <div>
                            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Provider</div>
                            <div style={{ fontWeight: 500, color: '#0f172a' }}>{course.providerName}</div>
                        </div>
                    </div>

                    {/* Course Start */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <CalendarOutlined style={{ fontSize: '20px', color: '#64748b', marginTop: '2px' }} />
                        <div>
                            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Course Start</div>
                            <div style={{ fontWeight: 500, color: '#0f172a' }}>
                                {course.startDate ? new Date(course.startDate).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                }) : '-'}
                            </div>
                        </div>
                    </div>

                    {/* Course End */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <CalendarOutlined style={{ fontSize: '20px', color: '#64748b', marginTop: '2px' }} />
                        <div>
                            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Course End</div>
                            <div style={{ fontWeight: 500, color: '#0f172a' }}>
                                {course.endDate ? new Date(course.endDate).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                }) : '-'}
                            </div>
                        </div>
                    </div>

                    {/* Payment Type */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <CreditCardOutlined style={{ fontSize: '20px', color: '#64748b', marginTop: '2px' }} />
                        <div>
                            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Payment Type</div>
                            <div style={{ fontWeight: 500, color: '#0f172a' }}>{course.paymentType || 'One Time'}</div>
                        </div>
                    </div>

                    {/* Billing Cycle */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <ReloadOutlined style={{ fontSize: '20px', color: '#64748b', marginTop: '2px' }} />
                        <div>
                            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Billing Cycle</div>
                            <div style={{ fontWeight: 500, color: '#0f172a' }}>
                                {course.paymentType === 'Recurring' 
                                    ? (course.billingCycle ? billingCycleLabels[course.billingCycle] || course.billingCycle : '-')
                                    : '—'
                                }
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <CheckCircleOutlined style={{ fontSize: '20px', color: '#64748b', marginTop: '2px' }} />
                        <div>
                            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Status</div>
                            <div style={{ fontWeight: 500, color: '#0f172a' }}>
                                <Tag color={course.status === 'Active' ? 'green' : 'red'}>
                                    {course.status}
                                </Tag>
                            </div>
                        </div>
                    </div>

                    {/* Fee per Cycle - Only show for Recurring payments */}
                    {course.paymentType === 'Recurring' && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <DollarOutlined style={{ fontSize: '20px', color: '#64748b', marginTop: '2px' }} />
                            <div>
                                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Fee per Cycle</div>
                                <div style={{ fontWeight: 500, color: '#0f172a' }}>
                                    ${calculateFeePerCycle(course).toFixed(2)} / {course.billingCycle ? billingCycleLabels[course.billingCycle] || course.billingCycle : 'Cycle'}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {/* Enrolled Students */}
            <Card
                title="Enrolled Students"
                className={styles.studentsCard}
                extra={
                    <div className={styles.studentsActions}>
                        {isRemoveMode ? (
                            <>
                                <Button
                                    onClick={() => {
                                        setIsRemoveMode(false);
                                        setSelectedEnrollmentIds([]);
                                    }}
                                    icon={<CloseOutlined />}
                                >
                                    Cancel
                                </Button>
                                <Popconfirm
                                    title="Remove Students"
                                    description={`Are you sure you want to remove ${selectedEnrollmentIds.length} student(s)?`}
                                    onConfirm={handleRemoveStudents}
                                    okText="Remove"
                                    cancelText="Cancel"
                                    okButtonProps={{ danger: true }}
                                    disabled={selectedEnrollmentIds.length === 0}
                                >
                                    <Button
                                        type="primary"
                                        danger
                                        icon={<UserDeleteOutlined />}
                                        loading={submitting}
                                        disabled={selectedEnrollmentIds.length === 0}
                                    >
                                        Remove Selected ({selectedEnrollmentIds.length})
                                    </Button>
                                </Popconfirm>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={() => setIsRemoveMode(true)}
                                    icon={<UserDeleteOutlined />}
                                    disabled={enrolledStudents.length === 0}
                                >
                                    Remove Students
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<UserAddOutlined />}
                                    onClick={() => setIsAddStudentModalOpen(true)}
                                >
                                    Add Students
                                </Button>
                            </>
                        )}
                    </div>
                }
            >
                <Search
                    placeholder="Search by name or NRIC..."
                    value={enrolledSearchQuery}
                    onChange={(e) => setEnrolledSearchQuery(e.target.value)}
                    style={{ marginBottom: 16, width: 300 }}
                    allowClear
                />
                <Table
                    columns={enrolledColumns}
                    dataSource={filteredEnrolledStudents}
                    rowKey={(record) => record.accountHolderId || record.educationAccountId}
                    pagination={{ pageSize: 10 }}
                    locale={{ emptyText: 'No students enrolled' }}
                    onRow={(record) => ({
                        onClick: () => {
                            if (!isRemoveMode) {
                                navigate(`/accounts/${record.accountHolderId || record.educationAccountId}`);
                            }
                        },
                        style: { cursor: isRemoveMode ? 'default' : 'pointer' }
                    })}
                />
            </Card>

            {/* Add Students Modal */}
            <Modal
                title="Add Students to Course"
                open={isAddStudentModalOpen}
                onCancel={() => {
                    setIsAddStudentModalOpen(false);
                    setSelectedStudentIds([]);
                    setStudentSearchQuery('');
                }}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => {
                            setIsAddStudentModalOpen(false);
                            setSelectedStudentIds([]);
                            setStudentSearchQuery('');
                        }}
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="add"
                        type="primary"
                        onClick={handleAddStudents}
                        loading={submitting}
                        disabled={selectedStudentIds.length === 0}
                    >
                        Add {selectedStudentIds.length > 0 ? `(${selectedStudentIds.length})` : ''} Student(s)
                    </Button>
                ]}
                width={700}
            >
                <Search
                    placeholder="Search by name or NRIC..."
                    value={studentSearchQuery}
                    onChange={(e) => setStudentSearchQuery(e.target.value)}
                    style={{ marginBottom: 16 }}
                    allowClear
                />
                <Table
                    columns={availableColumns}
                    dataSource={filteredAvailableStudents}
                    rowKey="educationAccountId"
                    pagination={{ pageSize: 8 }}
                    locale={{ emptyText: 'No available students' }}
                    scroll={{ y: 400 }}
                />
            </Modal>
        </div>
    );
};

export default CourseDetail;
