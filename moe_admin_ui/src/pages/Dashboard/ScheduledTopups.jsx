import React, { useState } from 'react'; // Đừng quên import useState
import { Table, Tag, Button } from "antd";
import { CalendarOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import styles from "./ScheduledTopups.module.scss";

const ScheduledTopups = () => {
    const [viewType, setViewType] = useState('batch');
    
    // Data cho Batch
    const batchData = [
        {
            key: '1',
            accounts: 1,
            ruleName: 'All junior Singapore Citizens (Aged 18-25)',
            amount: 500.00,
            scheduledDate: '30/01/26',
            scheduledTime: '09:00:00',
            status: 'Scheduled',
        },
        {
            key: '2',
            accounts: 2,
            ruleName: 'Senior AI Training Policies',
            amount: 1000.00,
            scheduledDate: '02/03/26',
            scheduledTime: '14:00:00',
            status: 'Scheduled',
        },
    ];

    // Data cho Individual (Dựa trên hình ảnh bạn cung cấp)
    const individualData = [
        {
            key: 'i1',
            name: 'Huy Dao',
            amount: 1000.00,
            scheduledDate: '16/01/26',
            scheduledTime: '09:00:00',
            status: 'Scheduled',
        }
    ];

    // Cấu hình columns cho Batch
    const batchColumns = [
        {
            title: 'Rule Name',
            dataIndex: 'ruleName',
            key: 'ruleName',
            render: (text, record) => (
                <div className={styles.ruleColumn}>
                    <span className={styles.ruleName}>{text}</span>
                    <span className={styles.accountCount}>{record.accounts} accounts</span>
                </div>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => <span className={styles.amountText}>${amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>,
        },
        {
            title: 'Scheduled',
            key: 'scheduled',
            render: (_, record) => (
                <div className={styles.dateTime}>
                    <span>{record.scheduledDate}</span>
                    <span className={styles.time}>{record.scheduledTime}</span>
                </div>
            ),
        },
        {
            title: 'Top up Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag className={styles.statusTag} bordered={false}>
                    {status}
                </Tag>
            ),
        },
    ];

    // Cấu hình columns cho Individual
    const individualColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className={styles.ruleName}>{text}</span>,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => <span className={styles.amountText}>${amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>,
        },
        {
            title: 'Scheduled',
            key: 'scheduled',
            render: (_, record) => (
                <div className={styles.dateTime}>
                    <span>{record.scheduledDate}</span>
                    <span className={styles.time}>{record.scheduledTime}</span>
                </div>
            ),
        },
        {
            title: 'Top up Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag className={styles.statusTag} bordered={false}>
                    {status}
                </Tag>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleInfo}>
                    <div className={styles.iconWrapper}>
                        <CalendarOutlined />
                    </div>
                    <div>
                        <h3 className={styles.title}>Scheduled Top-ups</h3>
                        <p className={styles.subTitle}>Upcoming scheduled top-ups</p>
                    </div>
                </div>
                <Button className={styles.viewAllBtn}>View All →</Button>
            </div>

            <div className={styles.filterSection}>
                <div className={styles.filterBtns}>
                    <Button 
                        className={`${styles.filterBtn} ${viewType === 'batch' ? styles.active : ''}`}
                        onClick={() => setViewType('batch')}
                    >
                        <TeamOutlined /> Batch
                    </Button>
                    <Button 
                        className={`${styles.filterBtn} ${viewType === 'individual' ? styles.active : ''}`}
                        onClick={() => setViewType('individual')}
                    >
                        <UserOutlined /> Individual
                    </Button>
                </div>
                
                <Table
                    columns={viewType === 'batch' ? batchColumns : individualColumns}
                    dataSource={viewType === 'batch' ? batchData : individualData}
                    pagination={false}
                    className={styles.customTable}
                />
            </div>
        </div>
    );
}

export default ScheduledTopups;