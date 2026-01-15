import { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Button, Table, Tag, Spin, Alert, App } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import AddCourseModal from './components/AddCourseModal/AddCourseModal';
import CourseFilter from './components/CourseFilter/CourseFilter';
import { courseService } from '../../services/courseService';
import styles from './CourseManagement.module.scss';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

const CourseManagement = () => {
    const { notification } = App.useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    const [filters, setFilters] = useState({
        search: '',
        provider: [],
        mode: [],
        paymentType: [],
        billingCycle: [],
        status: [],
        startDate: null,
        endDate: null,
        minFee: null,
        maxFee: null
    });

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                PageNumber: pagination.current,
                PageSize: pagination.pageSize,
                SearchTerm: filters.search || undefined,
                Provider: filters.provider.length ? filters.provider : undefined,
                ModeOfTraining: filters.mode.length ? filters.mode : undefined,
                Status: filters.status.length ? filters.status : undefined,
                PaymentType: filters.paymentType.length ? filters.paymentType : undefined,
                BillingCycle: filters.billingCycle.length ? filters.billingCycle : undefined,
                StartDate: filters.startDate ? dayjs(filters.startDate).format('YYYY-MM-DD') : undefined,
                EndDate: filters.endDate ? dayjs(filters.endDate).format('YYYY-MM-DD') : undefined,
                TotalFeeMin: filters.minFee || undefined,
                TotalFeeMax: filters.maxFee || undefined,
                SortBy: 0,
                SortDirection: 1
            };
            const res = await courseService.getListCourses(params);

            // Response structure: { items: [], totalCount: 0, ... }
            const items = res.items || [];
            const total = res.totalCount || 0;

            setCourses(items);
            setPagination(prev => ({ ...prev, total: total }));

        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to fetch courses');
        } finally {
            setLoading(false);
        }
    }, [pagination.current, pagination.pageSize, filters]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const dataSource = courses.map((course) => ({
        key: course.courseCode,
        courseId: course.courseCode,
        courseName: course.courseName,
        provider: course.providerName || '',
        mode: course.modeOfTraining || '',
        startDate: course.startDate ? dayjs(course.startDate).format("DD/MM/YY") : '',
        endDate: course.endDate ? dayjs(course.endDate).format("DD/MM/YY") : '',
        paymentType: course.paymentType || '-',
        billingCycle: course.billingCycle || '-', // Mapping billingCycle, defaulting if missing
        totalFee: course.totalFee ? `$${course.totalFee.toLocaleString()}` : '$0.00',
        enrolled: course.enrolledCount !== undefined ? course.enrolledCount : 0
    }));

    const handleAddCourse = async (values) => {
        try {
            const payload = {
                courseName: values.name,
                providerName: values.provider,
                modeOfTraining: values.mode,
                courseStartDate: values.startDate ? dayjs(values.startDate).toISOString() : null,
                courseEndDate: values.endDate ? dayjs(values.endDate).toISOString() : null,
                paymentOption: values.payment?.Type,
                billingCycle: values.billingCycle,
                totalFee: parseFloat(values.totalFee),
                feePerCycle: parseFloat(values.feePerCycle),
                status: 'Inactive'
            };

            await courseService.createCourse(payload);
            notification.success({ message: 'Success', description: 'Course added successfully' });
            setIsModalOpen(false);
            fetchCourses();
        } catch (err) {
            notification.error({ message: 'Error', description: err.message || 'Failed to create course' });
        }
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(prev => ({
            ...prev,
            current: pagination.current,
            pageSize: pagination.pageSize
        }));
        // Logic to handle sorting can be added here if needed to update API params
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Course ID',
            dataIndex: 'courseId',
            key: 'courseId',
            className: styles.columnCourseId,
            render: (text) => <span style={{ color: '#64748b' }}>{text}</span>
        },
        {
            title: 'Course Name',
            dataIndex: 'courseName',
            key: 'courseName',
            className: styles.columnCourseName,
            sorter: true,
            render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>
        },
        {
            title: 'Provider',
            dataIndex: 'provider',
            key: 'provider',
            className: styles.ColumnProvider,
            sorter: true,
            render: (text) => <span className={styles.providerText}>{text}</span>
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            className: styles.columnDate,
            sorter: true,
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            className: styles.columnDate,
            sorter: true,
        },
        {
            title: 'Payment Type',
            dataIndex: 'paymentType',
            key: 'paymentType',
            className: styles.columnPaymentType,
        },
        {
            title: 'Billing Cycle',
            dataIndex: 'billingCycle',
            key: 'billingCycle',
        },
        {
            title: 'Fee',
            dataIndex: 'totalFee',
            key: 'totalFee',
            className: styles.columnTotalFee,
            sorter: true,
            render: (text) => <span style={{ fontWeight: 600 }}>{text}</span>
        },
        {
            title: 'Mode of Training',
            dataIndex: 'mode',
            key: 'mode',
            className: styles.columnMode,
        },
        {
            title: 'Enrolled Students',
            dataIndex: 'enrolled',
            key: 'enrolled',
            className: styles.columnEnrolled,
            align: 'right'
        },
    ]

    return (
        <div className={styles.courseManagementContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.headerTop}>
                    <h1 className={styles.pageTitle}> Course Management </h1>
                    <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    className={styles.addButton}
                    onClick={handleOpenModal}
                    >
                        Add Course
                    </Button>
                </div>
                <p className={styles.pageDescription}>
                    Manage courses and student enrollments. Click on a course to view details.
                </p>
            </div>

            <CourseFilter
                filters={filters}
                onFilterChange={(newFilters) => {
                    setFilters(newFilters);
                    setPagination(prev => ({ ...prev, current: 1 })); // Reset to page 1 on filter
                }}
            />

            {error && (
                <Alert
                    message="Error Loading Courses"
                    description={error}
                    type="error"
                    showIcon
                    style={{ marginBottom: '24px' }}
                />
            )}

            <div className={styles.tableSection}>
                <Table
                    loading={loading}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        showSizeChanger: true
                    }}
                    onChange={handleTableChange}
                    className={styles.courseTable}
                />
            </div>

            <AddCourseModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onAdd={handleAddCourse}
            />
        </div>
    );
};

export default CourseManagement