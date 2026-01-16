import { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, Typography, message } from 'antd';
import {
    CloseOutlined,
    CheckOutlined,
    DollarOutlined,
    CreditCardOutlined,
    ArrowRightOutlined,
    ArrowLeftOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    LockOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './AddCourseModal.module.scss';

import { courseService } from '../../../../services/courseService';

const { Text } = Typography;

const AddCourseModal = ({ open, onClose, onAdd }) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    // State
    const [isReviewStep, setIsReviewStep] = useState(false);
    const [providersList, setProvidersList] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    // Watch form values
    const courseStartDate = Form.useWatch('startDate', form);
    const courseEndDate = Form.useWatch('endDate', form);
    const billingCycle = Form.useWatch('billingCycle', form);
    const paymentOption = Form.useWatch('paymentOption', form);
    const inputValue = Form.useWatch('fee', form);

    const modeOptions = [
        { label: 'Online', value: 'online' },
        { label: 'In-Person', value: 'in-person' },
        { label: 'Hybrid', value: 'hybrid' }
    ];

    const paymentOptions = [
        { label: 'One Time', value: 'One-time' },
        { label: 'Recurring', value: 'Recurring' }
    ];

    const billingCycleOptions = [
        { label: 'Monthly', value: 'Monthly' },
        { label: 'Quarterly', value: 'Quarterly' },
        { label: 'Bi-annually', value: 'Biannually' },
        { label: 'Annually', value: 'Yearly' }
    ];

    // Helper: Reset State when modal closes
    useEffect(() => {
        if (!open) {
            form.resetFields();
            setIsReviewStep(false);
        } else {
            // Default values
            form.setFieldsValue({
                status: 'Active',
                paymentOption: 'One-time'
            });
            fetchProviders();
        }
    }, [open, form]);

    const fetchProviders = async () => {
        try {
            const res = await courseService.getProviders();
            setProvidersList(res || []);
        } catch (error) {
            messageApi.error('Failed to load providers');
        }
    };

    const [formData, setFormData] = useState({});

    // Unified Values (Fix for useWatch undefined when Form unmounts)
    const activeStartDate = isReviewStep ? formData.startDate : courseStartDate;
    const activeEndDate = isReviewStep ? formData.endDate : courseEndDate;
    const activeBillingCycle = isReviewStep ? formData.billingCycle : billingCycle;
    const activePaymentOption = isReviewStep ? formData.paymentOption : paymentOption;
    const activeFee = isReviewStep ? formData.fee : inputValue;

    // Helper: Logic from scan.tsx
    const calculateCycles = (start, end, cycle) => {
        if (!start || !end) return 1;
        const startDate = dayjs(start);
        const endDate = dayjs(end);
        const monthsDiff = endDate.diff(startDate, 'month') + 1; // Inclusive count

        if (monthsDiff <= 0) return 1;

        switch (cycle) {
            case 'Monthly': return monthsDiff;
            case 'Quarterly': return Math.ceil(monthsDiff / 3);
            case 'Biannually': return Math.ceil(monthsDiff / 6);
            case 'Yearly': return Math.ceil(monthsDiff / 12);
            default: return 1;
        }
    };

    const getCourseDurationMonths = () => {
        if (!activeStartDate || !activeEndDate) return 0;
        return dayjs(activeEndDate).diff(dayjs(activeStartDate), 'month') + 1;
    };

    const isBillingCycleValid = (cycle) => {
        const months = getCourseDurationMonths();
        if (months === 0) return false;
        switch (cycle) {
            case 'Monthly': return months >= 1;
            case 'Quarterly': return months >= 3;
            case 'Biannually': return months >= 6;
            case 'Yearly': return months >= 12;
            default: return true;
        }
    };

    const calculateFeePerCycle = () => {
        if (!activeFee || !activeBillingCycle || !activeStartDate || !activeEndDate) return '0.00';
        const cycles = calculateCycles(activeStartDate, activeEndDate, activeBillingCycle);
        return (parseFloat(activeFee) / cycles).toFixed(2);
    };

    const handleProceedToReview = async () => {
        try {
            await form.validateFields();
            
            if (!inputValue || parseFloat(inputValue) <= 0) {
                messageApi.error('Please enter a valid fee amount');
                return;
            }
            if (paymentOption === 'Recurring' && !billingCycle) {
                messageApi.error('Please select a billing cycle');
                return;
            }

            // Store the calculated values before switching to review step
            const formValues = form.getFieldsValue(true);
            setFormData({
                ...formValues,
                calculatedFeePerCycle: calculateFeePerCycle(),
                calculatedTotalFee: inputValue
            });
            setIsReviewStep(true);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleConfirmAdd = async () => {
        const values = formData;

        const selectedProvider = providersList.find(p => p.providerId === values.provider);
        const finalTotalFee = parseFloat(values.calculatedTotalFee);

        const data = {
            name: values.courseName,
            providerId: values.provider,
            providerName: selectedProvider ? selectedProvider.providerName : '',
            mode: values.mode,
            startDate: values.startDate,
            endDate: values.endDate,
            payment: { Type: values.paymentOption },
            billingCycle: values.paymentOption === 'One-time' ? null : values.billingCycle,
            feePerCycle: null,
            totalFee: finalTotalFee,
            status: values.status
        };
        setSubmitting(true);
        try {
            await onAdd(data);
        } finally {
            setSubmitting(false);
        }
    };

    const renderOption = (option, fieldName) => {
        const isSelected = form.getFieldValue(fieldName) === option.value;
        const isDisabled = option.disabled;
        
        return (
            <div
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    width: '100%',
                    opacity: isDisabled ? 0.5 : 1,
                    cursor: isDisabled ? 'not-allowed' : 'pointer'
                }}
            >
                {isDisabled ? (
                    <LockOutlined style={{ color: '#94a3b8', fontSize: '14px' }} />
                ) : (
                    <CheckOutlined className={styles.checkoutIcon} style={{ visibility: isSelected ? 'visible' : 'hidden', color: 'teal' }} />
                )}
                <span style={{ color: isDisabled ? '#94a3b8' : 'inherit' }}>{option.label}</span>
            </div>
        );
    };

    return (
        <>
            {contextHolder}
            <Modal
                open={open}
                onCancel={onClose}
                footer={null}
                closeIcon={<CloseOutlined />}
                width={600}
                className={styles.addCourseModal}
                wrapClassName={styles.addCourseModal}
                styles={{ mask: { backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(0px)' } }}
                centered
            >
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>{isReviewStep ? 'Review Course Details' : 'Add New Course'}</h2>
                        <p className={styles.modalSubtitle}>
                            {isReviewStep
                                ? 'Please review all the information before creating the course.'
                                : 'Enter course details to create a new course.'}
                        </p>
                    </div>

                    {!isReviewStep ? (
                        <Form form={form} layout="vertical" className={styles.courseForm}>
                            <Form.Item label="Course Name" name="courseName" rules={[{ required: true, message: 'Required' }]} required>
                                <Input placeholder="e.g., Python Programming" />
                            </Form.Item>

                            <Form.Item label="Provider" name="provider" rules={[{ required: true, message: 'Required' }]} required>
                                <Select
                                    placeholder="Select school"
                                    optionRender={(opt) => renderOption(opt, 'provider')}
                                    options={providersList.map(p => ({ label: p.providerName, value: p.providerId }))}
                                    popupClassName={styles.selectDropdown}
                                />
                            </Form.Item>

                            <Form.Item label="Mode of Training" name="mode" rules={[{ required: true, message: 'Required' }]} required>
                                <Select
                                    placeholder="Select mode"
                                    optionRender={(opt) => renderOption(opt, 'mode')}
                                    options={modeOptions}
                                    popupClassName={styles.selectDropdown}
                                />
                            </Form.Item>

                            <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Required' }]} required>
                                <Select
                                    placeholder="Select status"
                                    optionRender={(opt) => renderOption(opt, 'status')}
                                    options={[
                                        { label: 'Active', value: 'Active' },
                                        { label: 'Inactive', value: 'Inactive' }
                                    ]}
                                    popupClassName={styles.selectDropdown}
                                />
                            </Form.Item>

                            <div className={styles.dateRow}>
                                <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: 'Required' }]} required className={styles.dateField}>
                                    <DatePicker format="DD/MM/YYYY" placeholder="DD/MM/YYYY" className={styles.datePicker} />
                                </Form.Item>
                                <Form.Item label="End Date" name="endDate" rules={[{ required: true, message: 'Required' }]} required className={styles.dateField}>
                                    <DatePicker format="DD/MM/YYYY" placeholder="DD/MM/YYYY" className={styles.datePicker} />
                                </Form.Item>
                            </div>

                            <div className={styles.feeSection}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <Text strong className={styles.sectionTitle}>Fee Configuration</Text>
                                    {(!courseStartDate || !courseEndDate) && (
                                        <div style={{ 
                                            fontSize: '0.85rem', 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            gap: '6px',
                                            marginTop: '0.5rem', 
                                            padding: '0.5rem 0.75rem',
                                            backgroundColor: '#fef3c7',
                                            border: '1px solid #fbbf24',
                                            borderRadius: '6px',
                                            color: '#92400e'
                                        }}>
                                            <InfoCircleOutlined style={{ fontSize: '14px' }} />
                                            <span>Please select course start and end dates first to configure fees</span>
                                        </div>
                                    )}
                                </div>

                                <Form.Item label="Payment Type" name="paymentOption" rules={[{ required: true }]} required>
                                    <Select
                                        placeholder="Select payment type"
                                        options={paymentOptions}
                                        optionRender={(opt) => renderOption(opt, 'paymentOption')}
                                        popupClassName={styles.selectDropdown}
                                        disabled={!courseStartDate || !courseEndDate}
                                    />
                                </Form.Item>

                                {paymentOption === 'Recurring' && (
                                    <>
                                        <Form.Item label="Billing Cycle" name="billingCycle" rules={[{ required: true }]} required>
                                            <Select
                                                placeholder="Select billing cycle"
                                                popupClassName={styles.selectDropdown}
                                                optionRender={(opt) => renderOption(opt, 'billingCycle')}
                                                options={billingCycleOptions.map(opt => ({
                                                    ...opt,
                                                    disabled: !isBillingCycleValid(opt.value)
                                                }))}
                                            />
                                        </Form.Item>
                                        {courseStartDate && courseEndDate && getCourseDurationMonths() < 3 && (
                                            <div style={{ 
                                                fontSize: '0.8rem', 
                                                color: '#64748b',
                                                marginTop: '-0.5rem',
                                                marginBottom: '1rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}>
                                                <InfoCircleOutlined style={{ fontSize: '12px' }} />
                                                <span>Some billing cycles are disabled due to short course duration ({getCourseDurationMonths()} month{getCourseDurationMonths() !== 1 ? 's' : ''})</span>
                                            </div>
                                        )}
                                    </>
                                )}

                                {paymentOption === 'Recurring' && billingCycle && (
                                    <div className={styles.feeToggleContainer}>
                                        <Form.Item
                                            label="Total Course Fee"
                                            name="fee"
                                            rules={[{ required: true, message: 'Please enter total fee' }]}
                                        >
                                            <Input
                                                type="number"
                                                prefix="$"
                                                placeholder="0.00"
                                                disabled={!courseStartDate || !courseEndDate}
                                            />
                                        </Form.Item>

                                        {inputValue && courseStartDate && courseEndDate && (
                                            <div className={styles.feeSummary}>
                                                <CheckCircleOutlined style={{ color: '#00b96b' }} />
                                                <span style={{ marginLeft: 8 }}>
                                                    Fee per Cycle: <b>${calculateFeePerCycle()}</b> ({calculateCycles(courseStartDate, courseEndDate, billingCycle)} cycles)
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {paymentOption === 'One-time' && (
                                    <Form.Item label="Course Fee" name="fee" rules={[{ required: true }]}>
                                        <Input type="number" prefix="$" placeholder="0.00" />
                                    </Form.Item>
                                )}
                            </div>

                            <div className={styles.modalFooter}>
                                <Button onClick={onClose} className={styles.cancelButton}>Cancel</Button>
                                <Button type="primary" onClick={handleProceedToReview} className={styles.submitButton}>
                                    Review Course <ArrowRightOutlined />
                                </Button>
                            </div>
                        </Form>
                    ) : (
                        <div className={styles.reviewStep}>
                            <div className={styles.reviewContent}>

                                <div className={styles.reviewSectionGroup}>
                                    <div className={styles.groupHeader}>
                                        <div style={{ transform: 'rotate(-10deg)', display: 'inline-block' }}>🎓</div> Course Information
                                    </div>
                                    <div className={styles.infoGrid}>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Course Name:</span>
                                            <span className={styles.value}>{formData.courseName}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Provider:</span>
                                            <span className={styles.value}>
                                                {providersList.find(p => p.providerId === formData.provider)?.providerName || formData.provider}
                                            </span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Mode of Training:</span>
                                            <span className={styles.value}>{formData.mode}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Status:</span>
                                            <span className={`${styles.statusBadge} ${formData.status === 'Active' ? styles.statusActive : styles.statusInactive}`}>
                                                {formData.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.reviewSectionGroup}>
                                    <div className={styles.groupHeader}>
                                        <CalendarOutlined /> Course Schedule
                                    </div>
                                    <div className={styles.infoGrid}>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Start Date:</span>
                                            <span className={styles.value}>{activeStartDate ? dayjs(activeStartDate).format('DD/MM/YY') : '-'}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>End Date:</span>
                                            <span className={styles.value}>{activeEndDate ? dayjs(activeEndDate).format('DD/MM/YY') : '-'}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Duration:</span>
                                            <span className={styles.value}>
                                                {getCourseDurationMonths()} month{getCourseDurationMonths() !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.reviewSectionGroup} ${styles.feeCard}`}>
                                    <div className={styles.groupHeader}>
                                        <DollarOutlined /> Fee Information
                                    </div>
                                    <div className={styles.infoGrid}>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Payment Type:</span>
                                            <span className={styles.value}>
                                                {paymentOptions.find(p => p.value === activePaymentOption)?.label || activePaymentOption}
                                            </span>
                                        </div>
                                        {activePaymentOption === 'Recurring' && (
                                            <>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Billing Cycle:</span>
                                                    <span className={styles.value}>
                                                        {billingCycleOptions.find(b => b.value === activeBillingCycle)?.label || activeBillingCycle}
                                                    </span>
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Number of Cycles:</span>
                                                    <span className={styles.value}>{calculateCycles(activeStartDate, activeEndDate, activeBillingCycle)}</span>
                                                </div>
                                                <div className={styles.infoRow}>
                                                    <span className={styles.label}>Fee per Cycle:</span>
                                                    <span className={styles.value} style={{ fontWeight: 'bold', color: '#162f69' }}>${formData.calculatedFeePerCycle}</span>
                                                </div>
                                            </>
                                        )}
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Total Course Fee:</span>
                                            <span className={styles.value}>${parseFloat(formData.calculatedTotalFee || 0).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.modalFooter}>
                                <Button onClick={() => setIsReviewStep(false)} className={styles.cancelButton}>
                                    <ArrowLeftOutlined /> Back to Edit
                                </Button>
                                <Button type="primary" onClick={handleConfirmAdd} loading={submitting} className={styles.submitButton}>
                                    Confirm & Create <CheckCircleOutlined />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default AddCourseModal;
