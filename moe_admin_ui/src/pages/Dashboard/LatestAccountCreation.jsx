import React, { useState, useEffect } from 'react';
import { Spin, Table } from 'antd';
import { FundViewOutlined } from '@ant-design/icons';
import { dashboardService } from '../../services/dashboardService';
import styles from './LatestAccountCreation.module.scss';

const LatestAccountCreation = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchActivities = async () => {
        setLoading(true);
        try {
            const response = await dashboardService.getLatestAccountCreation();
            setData(response || []);
        } catch (error) {
            console.error("Failed to fetch Latest Account Creation: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const formatDateTime = (isoString) => {
        if (!isoString) return { date: '-', time: '-' };
        const dateObj = new Date(isoString);
        return {
            date: dateObj.toLocaleDateString('en-GB'),
            time: dateObj.toLocaleTimeString('en-GB', { hour12: false }).split(':').slice(0, 2).join(':')
        };
    };

    // const data = [
    //     {
    //         key: '1',
    //         name: 'Lim Jia Hui',
    //         email: 'jiahui.lim@yahoo.com',
    //         createdDate: '14/01/26',
    //         createdTime: '09:15:00',
    //     },
    //     {
    //         key: '2',
    //         name: 'Julian Tan',
    //         email: 'julian.tan@email.com',
    //         createdDate: '13/01/26',
    //         createdTime: '14:30:00',
    //     },
    //     {
    //         key: '3',
    //         name: 'KAIN TRAN',
    //         email: 'FDLSJDF@GMAIL.COM',
    //         createdDate: '12/01/26',
    //         createdTime: '11:00:00',
    //     },
    //     {
    //         key: '4',
    //         name: 'Huy Dao',
    //         email: 'c-tracy.tran@avepoint.com',
    //         createdDate: '12/01/26',
    //         createdTime: '10:45:00',
    //     },
    //     {
    //         key: '5',
    //         name: 'Thu Trang',
    //         email: 'trangthhu@gmail.com',
    //         createdDate: '12/01/26',
    //         createdTime: '08:20:00',
    //     },
    // ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className={styles.nameText}>{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <span className={styles.emailText}>{text}</span>,
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => {
                const { date, time } = formatDateTime(createdAt);
                return (
                    <div className={styles.dateTime}>
                        <span className={styles.date}>{date}</span>
                        <span className={styles.time}>{time}</span>
                    </div>
                );
            },
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleInfo}>
                    <div className={styles.iconWrapper}>
                        <FundViewOutlined />
                    </div>
                    <div>
                        <h3 className={styles.title}>Latest Account Creation</h3>
                        <p className={styles.subTitle}>Latest account creations</p>
                    </div>
                </div>
            </div>

            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={(record) => record.accountId}
                    pagination={false}
                    className={styles.customTable}
                />
            </Spin>
        </div>
    );
};

export default LatestAccountCreation;