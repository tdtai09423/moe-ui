import React, { useState, useEffect } from 'react';
import { Table, Button, Spin } from "antd";
import { CalendarOutlined, UserOutlined, TeamOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { dashboardService } from '../../../services/dashboardService';
import StatusTag from '../../../components/common/StatusTag/StatusTag';
import styles from "./ScheduledTopups.module.scss";

const ScheduledTopups = () => {
    const [viewType, setViewType] = useState('batch'); // 'batch' or 'individual'
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const typeId = viewType === 'batch' ? 0 : 1;
            const response = await dashboardService.getScheduledTopups(typeId);
            // Ensure response is array
            const dataArray = Array.isArray(response) ? response : (response?.data || []);
            setData(dataArray); 
        } catch (error) {
            console.error("Failed to fetch Scheduled Top-ups: ", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [viewType]);
    
    const formatDateTime = (isoString) => {
        if (!isoString) return { date: '-', time: '-' };
        const dateObj = new Date(isoString);
        
        // Format: dd/mm/yyyy
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        const date = `${day}/${month}/${year}`;

        // Format: HH:mm
        const hour = String(dateObj.getHours()).padStart(2, '0');
        const minute = String(dateObj.getMinutes()).padStart(2, '0');
        const time = `${hour}:${minute}`;

        return { date, time };
    };

    const batchColumns = [
        {
            title: 'Rule Name',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            render: (text, record) => (
                <div className={styles.ruleCell}>
                    <span className={styles.ruleName}>{text}</span>
                    <span className={styles.accountCount}>{record.numberOfAccountsAffected || 0} accounts</span>
                </div>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'topUpAmount',
            key: 'topUpAmount',
            render: (amount) => <span className={styles.amountText}>${(amount || 0).toLocaleString('en-US')}</span>,
        },
        {
            title: 'Scheduled',
            dataIndex: 'scheduledTime',
            key: 'scheduledTime',
            align: 'center',
            render: (text) => {
                const { date, time } = formatDateTime(text);
                return (
                    <div className={styles.dateTimeCell}>
                        <span className={styles.date}>{date}</span>
                        <span className={styles.time}>{time}</span>
                    </div>
                );
            },
        },
        {
            title: 'Top up Status',
            dataIndex: 'status',
            key: 'status',
            align: 'left',
            render: (status) => (
                <StatusTag status={status || 'Scheduled'} />
            ),
        },
    ];

    const individualColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            render: (text) => <span className={styles.ruleName}>{text}</span>,
        },
        {
            title: 'Amount',
            dataIndex: 'topUpAmount',
            key: 'topUpAmount',
            render: (amount) => <span className={styles.amountText}>${(amount || 0).toLocaleString('en-US')}</span>,
        },
        {
            title: 'Scheduled',
            dataIndex: 'scheduledTime',
            key: 'scheduledTime',
            align: 'center',
            render: (text) => {
                const { date, time } = formatDateTime(text);
                return (
                    <div className={styles.dateTimeCell}>
                        <span className={styles.date}>{date}</span>
                        <span className={styles.time}>{time}</span>
                    </div>
                );
            },
        },
        {
            title: 'Top up Status',
            dataIndex: 'status',
            key: 'status',
            align: 'left',
            render: (status) => (
                <StatusTag status={status || 'Scheduled'} />
            ),
        },
    ];

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                    <div className={styles.iconBox}>
                        <CalendarOutlined />
                    </div>
                    <div>
                        <h3 className={styles.title}>Scheduled Top-ups</h3>
                        <p className={styles.subTitle}>Upcoming scheduled top-ups</p>
                    </div>
                </div>
                <Button className={styles.viewAllBtn}>
                    View All <ArrowRightOutlined style={{ fontSize: '12px' }} />
                </Button>
            </div>

            <div className={styles.filterControl}>
                <button 
                    className={`${styles.toggleBtn} ${viewType === 'batch' ? styles.active : ''}`}
                    onClick={() => setViewType('batch')}
                >
                    <TeamOutlined /> Batch
                </button>
                <button 
                    className={`${styles.toggleBtn} ${viewType === 'individual' ? styles.active : ''}`}
                    onClick={() => setViewType('individual')}
                >
                    <UserOutlined /> Individual
                </button>
            </div>
            
            <Spin spinning={loading}>
                <div className={styles.tableWrapper}>
                    <Table
                        columns={viewType === 'batch' ? batchColumns : individualColumns}
                        dataSource={data}
                        rowKey={(record) => record.id || record.key || Math.random()}
                        pagination={false}
                        className={styles.customTable}
                    />
                </div>
            </Spin>
        </div>
    );
}

export default ScheduledTopups;