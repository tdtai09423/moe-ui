import { useState } from 'react';
import { Input, Select, DatePicker, Button, InputNumber } from 'antd';
import {
    SearchOutlined,
    DownloadOutlined,
    BankOutlined,
    DesktopOutlined,
    CreditCardOutlined,
    SyncOutlined,
    CheckCircleOutlined,
    CalendarOutlined,
    DollarOutlined,
    CheckOutlined
} from '@ant-design/icons';
import styles from './CourseFilter.module.scss';

const { Option } = Select;

const CourseFilter = ({ filters, onFilterChange }) => {
    const [hoveredFilters, setHoveredFilters] = useState({});

    const handleFilterChange = (key, value) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const handleHover = (key, value) => {
        setHoveredFilters(prev => ({ ...prev, [key]: value }));
    };

    const providers = [
        'Nanyang Technological University',
        'National University of Singapore',
        'Singapore Management University',
        'Singapore Polytechnic',
        'Temasek Polytechnic'
    ];

    const modes = ['Online', 'In-Person', 'Hybrid'];
    const paymentTypes = ['Recurring', 'One Time'];
    const billingCycles = ['Monthly', 'Quarterly', 'Yearly'];
    const statuses = ['Active', 'Inactive'];

    const renderCustomOption = (label, value, filterKey, isSelected) => (
        <div
            className={styles.dropdownItem}
            onMouseEnter={() => handleHover(filterKey, value)}
            onMouseLeave={() => handleHover(filterKey, null)}
        >
            <CheckOutlined
                className={styles.checkoutIcon}
                style={{ visibility: isSelected || hoveredFilters[filterKey] === value ? 'visible' : 'hidden' }}
            />
            <span>{label}</span>
        </div>
    );

    return (
        <div className={styles.filterContainer}>
            <div className={styles.searchRow}>
                <Input
                    placeholder="Search by course name or provider..."
                    prefix={<SearchOutlined />}
                    className={styles.searchInput}
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                />
            </div>

            <div className={styles.filterGrid}>
                {/* Provider */}
                <div className={styles.filterItem}>
                    <div className={styles.label}><BankOutlined /> Provider</div>
                    <Select
                        placeholder="All Providers"
                        className={styles.select}
                        value={filters.provider}
                        onChange={(val) => handleFilterChange('provider', val)}
                        allowClear
                        optionLabelProp="label"
                    >
                        <Option value="" label="All Providers">
                            {renderCustomOption("All Providers", "", "provider", filters.provider === "")}
                        </Option>
                        {providers.map(p => (
                            <Option key={p} value={p} label={p}>
                                {renderCustomOption(p, p, "provider", filters.provider === p)}
                            </Option>
                        ))}
                    </Select>
                </div>

                {/* Mode */}
                <div className={styles.filterItem}>
                    <div className={styles.label}><DesktopOutlined /> Mode of Training</div>
                    <Select
                        placeholder="All Modes"
                        className={styles.select}
                        value={filters.mode}
                        onChange={(val) => handleFilterChange('mode', val)}
                        allowClear
                        optionLabelProp="label"
                    >
                        <Option value="" label="All Modes">
                            {renderCustomOption("All Modes", "", "mode", filters.mode === "")}
                        </Option>
                        {modes.map(m => (
                            <Option key={m} value={m} label={m}>
                                {renderCustomOption(m, m, "mode", filters.mode === m)}
                            </Option>
                        ))}
                    </Select>
                </div>

                {/* Payment Type */}
                <div className={styles.filterItem}>
                    <div className={styles.label}><CreditCardOutlined /> Payment Type</div>
                    <Select
                        placeholder="All Types"
                        className={styles.select}
                        value={filters.paymentType}
                        onChange={(val) => handleFilterChange('paymentType', val)}
                        allowClear
                        optionLabelProp="label"
                    >
                        <Option value="" label="All Types">
                            {renderCustomOption("All Types", "", "paymentType", filters.paymentType === "")}
                        </Option>
                        {paymentTypes.map(p => (
                            <Option key={p} value={p} label={p}>
                                {renderCustomOption(p, p, "paymentType", filters.paymentType === p)}
                            </Option>
                        ))}
                    </Select>
                </div>

                {/* Billing Cycle */}
                <div className={styles.filterItem}>
                    <div className={styles.label}><SyncOutlined /> Billing Cycle</div>
                    <Select
                        placeholder="All Cycles"
                        className={styles.select}
                        value={filters.billingCycle}
                        onChange={(val) => handleFilterChange('billingCycle', val)}
                        allowClear
                        optionLabelProp="label"
                    >
                        <Option value="" label="All Cycles">
                            {renderCustomOption("All Cycles", "", "billingCycle", filters.billingCycle === "")}
                        </Option>
                        {billingCycles.map(c => (
                            <Option key={c} value={c} label={c}>
                                {renderCustomOption(c, c, "billingCycle", filters.billingCycle === c)}
                            </Option>
                        ))}
                    </Select>
                </div>

                {/* Status */}
                <div className={styles.filterItem}>
                    <div className={styles.label}><CheckCircleOutlined /> Status</div>
                    <Select
                        placeholder="All Statuses"
                        className={styles.select}
                        value={filters.status}
                        onChange={(val) => handleFilterChange('status', val)}
                        allowClear
                        optionLabelProp="label"
                    >
                        <Option value="" label="All Statuses">
                            {renderCustomOption("All Statuses", "", "status", filters.status === "")}
                        </Option>
                        {statuses.map(s => (
                            <Option key={s} value={s} label={s}>
                                {renderCustomOption(s, s, "status", filters.status === s)}
                            </Option>
                        ))}
                    </Select>
                </div>

                {/* Date Range - Start */}
                <div className={styles.filterItem}>
                    <div className={styles.label}><CalendarOutlined /> Course Start Date</div>
                    <DatePicker
                        className={styles.datePicker}
                        placeholder="Select date"
                        format="DD/MM/YYYY"
                        onChange={(date) => handleFilterChange('startDate', date)}
                    />
                </div>

                {/* Date Range - End */}
                <div className={styles.filterItem}>
                    <div className={styles.label}><CalendarOutlined /> Course End Date</div>
                    <DatePicker
                        className={styles.datePicker}
                        placeholder="Select date"
                        format="DD/MM/YYYY"
                        onChange={(date) => handleFilterChange('endDate', date)}
                    />
                </div>

                {/* Fee Range */}
                <div className={styles.filterItem}>
                    <div className={styles.label}><DollarOutlined /> Fee Range ($)</div>
                    <div className={styles.feeRange}>
                        <InputNumber
                            className={styles.feeInput}
                            placeholder="Min"
                            min={0}
                            onChange={(val) => handleFilterChange('minFee', val)}
                        />
                        <span>-</span>
                        <InputNumber
                            className={styles.feeInput}
                            placeholder="Max"
                            min={0}
                            onChange={(val) => handleFilterChange('maxFee', val)}
                        />
                    </div>
                </div>

                {/* Export Button */}
                <div className={styles.exportRow}>
                    <Button icon={<DownloadOutlined />} className={styles.exportButton}>
                        Export
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CourseFilter;
