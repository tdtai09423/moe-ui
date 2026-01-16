import React, { useState, useEffect, useCallback } from 'react';
import { message, Alert } from 'antd';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import CourseHeader from './components/CourseHeader';
import CourseFilters from './components/CourseFilters';
import CourseTable from './components/CourseTable';
import AddCourseModal from '../components/AddCourseModal/AddCourseModal';
import { courseService } from '../../../services/courseService';
import styles from './index.module.scss';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

const CourseManage = () => {
  const [messageApi, contextHolder] = message.useMessage();
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
    minFee: '',
    maxFee: ''
  });

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        PageNumber: pagination.current,
        PageSize: pagination.pageSize,
        SearchTerm: filters.search || undefined,
        Provider: filters.provider?.length ? filters.provider : undefined,
        ModeOfTraining: filters.mode?.length ? filters.mode : undefined,
        Status: filters.status?.length ? filters.status : undefined,
        PaymentType: filters.paymentType?.length ? filters.paymentType : undefined,
        BillingCycle: filters.billingCycle?.length ? filters.billingCycle : undefined,
        StartDate: filters.startDate ? dayjs(filters.startDate).format('YYYY-MM-DD') : undefined,
        EndDate: filters.endDate ? dayjs(filters.endDate).format('YYYY-MM-DD') : undefined,
        TotalFeeMin: filters.minFee || undefined,
        TotalFeeMax: filters.maxFee || undefined,
        SortBy: 0,
        SortDirection: 1
      };
      const res = await courseService.getListCourses(params);

      const items = Array.isArray(res?.items) ? res.items : (Array.isArray(res) ? res : []);
      const total = res?.totalCount || 0;

      setCourses(items);
      setPagination(prev => ({ ...prev, total: total }));
    } catch (err) {
      setError(err.message || 'Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.current, pagination.pageSize, filters]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleTableChange = (paginationConfig, _, sorter) => {
    setPagination({
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
      total: pagination.total
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCourse = async (courseData) => {
    try {
      await courseService.createCourse(courseData);
      messageApi.success('Course added successfully!');
      handleCloseModal();
      fetchCourses();
    } catch (err) {
      messageApi.error(err.message || 'Failed to add course');
      console.error('Error adding course:', err);
    }
  };

  const handleExport = () => {
    messageApi.info('Export functionality coming soon!');
  };

  const dataSource = courses.map(course => ({
    key: course.courseId,
    courseId: course.courseId,
    courseName: course.courseName,
    provider: course.providerName,
    startDate: course.startDate ? dayjs(course.startDate).format('DD/MM/YYYY') : '-',
    endDate: course.endDate ? dayjs(course.endDate).format('DD/MM/YYYY') : '-',
    paymentType: course.paymentType || '-',
    billingCycle: course.billingCycle || '-',
    totalFee: course.totalFee ? `$${parseFloat(course.totalFee).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : '-',
    mode: course.modeOfTraining || '-',
    enrolled: course.enrolledCount || 0
  }));

  return (
    <div className={styles.courseManageContainer}>
      {contextHolder}
      
      <CourseHeader 
        onAddCourse={handleOpenModal}
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

      <CourseFilters
        filters={filters}
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          setPagination(prev => ({ ...prev, current: 1 }));
        }}
        total={pagination.total}
        dataCount={dataSource.length}
        onExport={handleExport}
      />

      <CourseTable
        loading={loading}
        dataSource={dataSource}
        pagination={pagination}
        onTableChange={handleTableChange}
      />

      <AddCourseModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddCourse}
      />
    </div>
  );
};

export default CourseManage;
