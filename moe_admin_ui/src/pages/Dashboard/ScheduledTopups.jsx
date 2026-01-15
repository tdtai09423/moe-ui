import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Spin } from "antd";
import { CalendarOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import { dashboardService } from "../../services/dashboardService"
import styles from "./ScheduledTopups.module.scss";

const ScheduledTopups = () => {
    const [viewType, setViewType] = useState('batch');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const typeId = viewType === 'batch' ? 0 : 1;
            const response = await dashboardService.getScheduledTopups(typeId);
            const dataArray = Array.isArray(response) ? response : (response?.data || []);
            setData(dataArray); 
        }
        catch (error) {
            console.error("Failed to fetch Scheduled Top-ups: ", error);
            setData([]);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [viewType]);
    
    const formatDateTime = (isoString) => {
        if (!isoString) return { date: '-', time: '-' };
        const dateObj = new Date(isoString);
        const date = dateObj.toLocaleDateString('en-GB');
        const time = dateObj.toLocaleTimeString('en-GB', { hour12: false });
        return { date, time };
    };

    // const batchData = [
    //     {
    //         key: '1',
    //         accounts: 1,
    //         ruleName: 'All junior Singapore Citizens (Aged 18-25)',
    //         amount: 500.00,
    //         scheduledDate: '30/01/26',
    //         scheduledTime: '09:00:00',
    //         status: 'Scheduled',
    //     },
    //     {
    //         key: '2',
    //         accounts: 2,
    //         ruleName: 'Senior AI Training Policies',
    //         amount: 1000.00,
    //         scheduledDate: '02/03/26',
    //         scheduledTime: '14:00:00',
    //         status: 'Scheduled',
    //     },
    // ];

    // const individualData = [
    //     {
    //         key: 'i1',
    //         name: 'Huy Dao',
    //         amount: 1000.00,
    //         scheduledDate: '16/01/26',
    //         scheduledTime: '09:00:00',
    //         status: 'Scheduled',
    //     }
    // ];

    const batchColumns = [
        {
            title: 'Rule Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className={styles.ruleColumn}>
                    <span className={styles.ruleName}>{text}</span>
                    <span className={styles.accountCount}>{record.accounts || 0} accounts</span>
                </div>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'topUpAmount',
            key: 'topUpAmount',
            render: (amount) => <span className={styles.amountText}>${(amount || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>,
        },
        {
            title: 'Scheduled',
            dataIndex: 'scheduledTime',
            key: 'scheduledTime',
            render: (text) => {
                const { date, time } = formatDateTime(text);
                return (
                    <div className={styles.dateTime}>
                        <span>{date}</span>
                        <span className={styles.time}>{time}</span>
                    </div>
                );
            },
        },
        {
            title: 'Top up Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag className={styles.statusTag} variant="filled">
                    {status}
                </Tag>
            ),
        },
    ];

    const individualColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className={styles.ruleName}>{text}</span>,
        },
        {
            title: 'Amount',
            dataIndex: 'topUpAmount',
            key: 'topUpAmount',
            render: (amount) => <span className={styles.amountText}>${amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>,
        },
        {
            title: 'Scheduled',
            dataIndex: 'scheduledTime',
            key: 'scheduledTime',
            render: (text) => {
                const { date, time } = formatDateTime(text);
                return (
                    <div className={styles.dateTime}>
                        <span>{date}</span>
                        <span className={styles.time}>{time}</span>
                    </div>
                );
            },
        },
        {
            title: 'Top up Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag className={styles.statusTag} variant="filled">
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
                
                <Spin spinning={loading}>
                    <Table
                        columns={viewType === 'batch' ? batchColumns : individualColumns}
                        dataSource={data}
                        rowKey={(record) => record.id || record.key}
                        pagination={false}
                        className={styles.customTable}
                    />
                </Spin>
            </div>
        </div>
    );
}

export default ScheduledTopups;