export const listAccColumn = [
    { title: 'Name ↑↓', dataIndex: 'name', key: 'name' },
    { 
      title: 'NRIC', 
      dataIndex: 'nric', 
      key: 'nric',
      render: (text) => <span >{text}</span> 
    },
    { title: 'Age ↑↓', dataIndex: 'age', key: 'age' },
    { 
      title: 'Balance ↑↓', 
      dataIndex: 'balance', 
      key: 'balance',
      render: (val) => <span >${val.toLocaleString()}</span>
    },
    { title: 'Education ↑↓', dataIndex: 'education', key: 'education' },
    { title: 'Residential Status', dataIndex: 'status', key: 'status' },
    { title: 'Created ↑↓', dataIndex: 'created', key: 'created' },
    { 
      title: 'Courses', 
      dataIndex: 'courses', 
      key: 'courses',
      render: (count) => <span>📖 {count}</span>
    },
  ];