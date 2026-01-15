import { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, Typography, message, Tooltip, Divider } from 'antd';
import {
    CloseOutlined,
    CheckOutlined,
    DollarOutlined,
    CreditCardOutlined,
    ArrowRightOutlined,
    ArrowLeftOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './AddCourseModal.module.scss';

const { Text } = Typography;

const AddCourseModal = ({ open, onClose, onAdd }) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    // State
    const [isReviewStep, setIsReviewStep] = useState(false);
    const [feeEntryMode, setFeeEntryMode] = useState('per_cycle'); // 'per_cycle' | 'total'
    const [isHovering, setIsHovering] = useState(false);

    // Watch form values
    const courseStartDate = Form.useWatch('startDate', form);
    const courseEndDate = Form.useWatch('endDate', form);
    const billingCycle = Form.useWatch('billingCycle', form);
    const paymentOption = Form.useWatch('paymentOption', form);
    const inputValue = Form.useWatch('fee', form);

    const providers = [
        'Nanyang Technological University',
        'National University of Singapore',
        'Singapore Management University',
        'Singapore Polytechnic',
        'Temasek Polytechnic'
    ];

    const modeOptions = [
        { label: 'Online', value: 'Online' },
        { label: 'In-Person', value: 'In-Person' },
        { label: 'Hybrid', value: 'Hybrid' }
    ];

    const paymentOptions = [
        { label: 'Recurring', value: 'Recurring' },
        { label: 'One Time', value: 'One Time' }
    ];

    const billingCycleOptions = [
        { label: 'Monthly', value: 'Monthly' },
        { label: 'Quarterly', value: 'Quarterly' },
        { label: 'Bi-annually', value: 'Bi-annually' },
        { label: 'Annually', value: 'Annually' }
    ];

    // Helper: Reset State when modal closes
    useEffect(() => {
        if (!open) {
            form.resetFields();
            setIsReviewStep(false);
            setFeeEntryMode('per_cycle');
        } else {
            // Default values
            form.setFieldsValue({
                status: 'Active'
            });
        }
    }, [open, form]);

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
            case 'Bi-annually': return Math.ceil(monthsDiff / 6);
            case 'Annually': return Math.ceil(monthsDiff / 12);
            default: return 1;
        }
    };

    const getCourseDurationMonths = () => {
        if (!courseStartDate || !courseEndDate) return 0;
        return dayjs(courseEndDate).diff(dayjs(courseStartDate), 'month') + 1;
    };

    const isBillingCycleValid = (cycle) => {
        const months = getCourseDurationMonths();
        if (months === 0) return true;
        switch (cycle) {
            case 'Monthly': return months >= 1;
            case 'Quarterly': return months >= 3;
            case 'Bi-annually': return months >= 6;
            case 'Annually': return months >= 12;
            default: return true;
        }
    };

    const calculateFeePerCycle = () => {
        if (feeEntryMode === 'per_cycle' || !inputValue) return inputValue;
        const cycles = calculateCycles(courseStartDate, courseEndDate, billingCycle);
        return (parseFloat(inputValue) / cycles).toFixed(2);
    };

    const calculateTotalFee = () => {
        if (feeEntryMode === 'total' || !inputValue) return inputValue;
        const cycles = calculateCycles(courseStartDate, courseEndDate, billingCycle);
        return (parseFloat(inputValue) * cycles).toFixed(2);
    };

    // Actions
    const handleProceedToReview = async () => {
        try {
            await form.validateFields();

            // Custom Validation matching scan.tsx
            const finalFee = feeEntryMode === 'per_cycle' ? inputValue : calculateFeePerCycle();
            if (!finalFee || parseFloat(finalFee) <= 0) {
                messageApi.error('Please enter a valid fee amount');
                return;
            }
            if (paymentOption === 'Recurring' && !billingCycle) {
                messageApi.error('Please select a billing cycle');
                return;
            }

            setIsReviewStep(true);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleConfirmAdd = () => {
        const values = form.getFieldsValue();

        // Match API payload expected by CourseManagement.jsx handleAddCourse
        const data = {
            name: values.courseName,
            provider: values.provider,
            mode: values.mode,
            startDate: values.startDate,
            endDate: values.endDate,
            payment: { Type: values.paymentOption },
            billingCycle: values.paymentOption === 'One Time' ? null : values.billingCycle,
            feePerCycle: feeEntryMode === 'per_cycle' ? values.fee : calculateFeePerCycle(),
            totalFee: feeEntryMode === 'total' ? values.fee : calculateTotalFee(),
            status: values.status
        };

        onAdd(data);
    };

    // Render Helpers
    const renderOption = (option, fieldName) => {
        const isSelected = form.getFieldValue(fieldName) === option.value;
        return (
            <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <CheckOutlined className={styles.checkoutIcon} style={{ visibility: isSelected ? 'visible' : 'hidden', color: 'teal' }} />
                <span>{option.label}</span>
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
                width={500}
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
                                    options={providers.map(p => ({ label: p, value: p }))}
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
                                        <Text type="secondary" style={{ fontSize: '0.85rem', display: 'block', marginTop: '0.25rem', color: '#64748b' }}>
                                            Please fill in course start and end dates first
                                        </Text>
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

                                {/* Show Billing Cycle ONLY if Payment Option is selected as Recurring */}
                                {paymentOption === 'Recurring' && (
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
                                )}

                                {/* Show Fee Input for Recurring ONLY if Billing Cycle is selected */}
                                {paymentOption === 'Recurring' && billingCycle && (
                                    <div className={styles.feeToggleContainer}>
                                        <div className={styles.toggleButtons}>
                                            <Button
                                                type={feeEntryMode === 'per_cycle' ? 'primary' : 'default'}
                                                onClick={() => setFeeEntryMode('per_cycle')}
                                                icon={<DollarOutlined />}
                                                className={styles.toggleBtn}
                                            >
                                                Fee per Cycle
                                            </Button>
                                            <Button
                                                type={feeEntryMode === 'total' ? 'primary' : 'default'}
                                                onClick={() => setFeeEntryMode('total')}
                                                icon={<CreditCardOutlined />}
                                                className={styles.toggleBtn}
                                            >
                                                Total Fee
                                            </Button>
                                        </div>

                                        <Form.Item
                                            name="fee"
                                            rules={[{ required: true, message: 'Please enter fee' }]}
                                            style={{ marginBottom: 0 }}
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
                                                    {feeEntryMode === 'per_cycle'
                                                        ? <>Total: <b>${calculateTotalFee()}</b> ({calculateCycles(courseStartDate, courseEndDate, billingCycle)} cycles)</>
                                                        : <>Per Cycle: <b>${calculateFeePerCycle()}</b> ({calculateCycles(courseStartDate, courseEndDate, billingCycle)} cycles)</>
                                                    }
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Show Fee Input for One Time immediately */}
                                {paymentOption === 'One Time' && (
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
                        // REVIEW STEP
                        <div className={styles.reviewStep}>
                            <div className={styles.reviewContent}>
                                <div className={styles.reviewSection}>
                                    <Text type="secondary"><CalendarOutlined /> Course Name</Text>
                                    <Text strong>{form.getFieldValue('courseName')}</Text>
                                </div>
                                <div className={styles.reviewSection}>
                                    <Text type="secondary">Provider</Text>
                                    <Text strong>{form.getFieldValue('provider')}</Text>
                                </div>
                                <div className={styles.reviewRow}>
                                    <div>
                                        <Text type="secondary">Start Date</Text>
                                        <div><Text strong>{dayjs(courseStartDate).format('DD MMM YYYY')}</Text></div>
                                    </div>
                                    <div>
                                        <Text type="secondary">End Date</Text>
                                        <div><Text strong>{dayjs(courseEndDate).format('DD MMM YYYY')}</Text></div>
                                    </div>
                                </div>

                                <Divider />

                                <div className={styles.reviewSection}>
                                    <Text type="secondary">Payment Structure</Text>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text strong>{paymentOption} {paymentOption === 'Recurring' && `(${billingCycle})`}</Text>
                                    </div>
                                </div>

                                <div className={styles.reviewRow}>
                                    <div>
                                        <Text type="secondary">{paymentOption === 'Recurring' ? `Fee Per ${billingCycle}` : 'Course Fee'}</Text>
                                        <div style={{ fontSize: '1.1em', color: '#10b981', fontWeight: 'bold' }}>
                                            ${feeEntryMode === 'per_cycle' || paymentOption === 'One Time' ? parseFloat(inputValue).toFixed(2) : calculateFeePerCycle()}
                                        </div>
                                    </div>
                                    {paymentOption === 'Recurring' && (
                                        <div>
                                            <Text type="secondary">Total Fee</Text>
                                            <div style={{ fontSize: '1.1em', fontWeight: 'bold' }}>
                                                ${feeEntryMode === 'total' ? parseFloat(inputValue).toFixed(2) : calculateTotalFee()}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.modalFooter}>
                                <Button onClick={() => setIsReviewStep(false)} className={styles.cancelButton}>
                                    <ArrowLeftOutlined /> Back to Edit
                                </Button>
                                <Button type="primary" onClick={handleConfirmAdd} className={styles.submitButton}>
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
