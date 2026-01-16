import React, { useMemo } from "react";
import { Input, Select, Button, Checkbox } from "antd";
import {
  SearchOutlined,
  ReadOutlined,
  BankOutlined,
  TeamOutlined,
  WalletOutlined,
  CalendarOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import styles from "./AccountFilters.module.scss";

const AccountFilters = ({ filter, updateFilter, total, dataCount }) => {
  // Validate balance range
  const balanceRangeError = useMemo(() => {
    const min = parseFloat(filter.MinBalance);
    const max = parseFloat(filter.MaxBalance);
    
    if (filter.MinBalance && min < 0) {
      return "Balance cannot be negative";
    }
    if (filter.MaxBalance && max < 0) {
      return "Balance cannot be negative";
    }
    if (!isNaN(min) && !isNaN(max) && min > max) {
      return "Max balance must be greater than or equal to min balance";
    }
    return null;
  }, [filter.MinBalance, filter.MaxBalance]);

  // Validate age range
  const ageRangeError = useMemo(() => {
    const min = parseFloat(filter.MinAge);
    const max = parseFloat(filter.MaxAge);
    
    if (filter.MinAge && min < 0) {
      return "Age cannot be negative";
    }
    if (filter.MaxAge && max < 0) {
      return "Age cannot be negative";
    }
    if (!isNaN(min) && !isNaN(max) && min > max) {
      return "Max age must be greater than or equal to min age";
    }
    return null;
  }, [filter.MinAge, filter.MaxAge]);

  const hasActiveFilters = () => {
    return (
      (filter.Search && filter.Search.trim() !== '') ||
      (filter.EducationLevel && filter.EducationLevel.length > 0) ||
      (filter.SchoolingStatus && filter.SchoolingStatus !== '') ||
      (filter.ResidentialStatus && filter.ResidentialStatus.length > 0 && !filter.ResidentialStatus.includes('ALL')) ||
      filter.MinBalance || filter.MaxBalance ||
      filter.MinAge || filter.MaxAge
    );
  };

  const handleClearFilters = () => {
    updateFilter({
      Search: '',
      EducationLevel: [],
      SchoolingStatus: '',
      ResidentialStatus: [],
      MinBalance: '',
      MaxBalance: '',
      MinAge: '',
      MaxAge: ''
    });
  };

  return (
    <div className={styles.filterCard}>
      <div className={styles.searchWrapper}>
        <Input
          prefix={<SearchOutlined style={{ color: "#94a3b8", fontSize: '18px', marginRight: '8px' }} />}
          placeholder="Search by name or NRIC..."
          className={styles.mainSearch}
          value={filter.Search}
          onChange={(e) => updateFilter({ Search: e.target.value })}
        />
      </div>

      <div className={styles.filtersRow}>
        <div className={styles.filterItem}>
          <span className={styles.label}><ReadOutlined /> Education Level</span>
          <Select
            mode="multiple"
            showSearch={false}
            placeholder="All Levels"
            maxTagCount={0}
            maxTagPlaceholder={(omitted) => omitted.length === 1 ? omitted[0].label : `${omitted.length} selected`}
            popupClassName="my-custom-dropdown"
            className={styles.filterSelect}
            value={filter.EducationLevel || []}
            onChange={(val) => updateFilter({ EducationLevel: val })}
            options={[
              { value: "Primary", label: "Primary" },
              { value: "Secondary", label: "Secondary" },
              { value: "Post-Secondary", label: "Post-Secondary" },
              { value: "Tertiary", label: "Tertiary" },
              { value: "Postgraduate", label: "Postgraduate" }
            ]}
            optionRender={(option) => (
              <div className={styles.customOption}>
                <Checkbox checked={filter.EducationLevel?.includes(option.value)} />
                <span style={{ marginLeft: '8px' }}>{option.label}</span>
              </div>
            )}
          />
        </div>

        <div className={styles.filterItem}>
          <span className={styles.label}><BankOutlined /> Schooling Status</span>
          <Select
            placeholder="All Students"
            className={styles.filterSelect}
            popupClassName="my-custom-dropdown"
            value={filter.SchoolingStatus}
            onChange={(val) => updateFilter({ SchoolingStatus: val })}
            options={[
              { value: "", label: "All Students" },
              { value: "0", label: "In School" },
              { value: "1", label: "Not In School" }
            ]}
            optionRender={(option) => (
              <div className={styles.customOption} style={{ paddingLeft: '24px' }}>
                <span>{option.label}</span>
              </div>
            )}
          />
        </div>

        <div className={styles.filterItem}>
          <span className={styles.label}><TeamOutlined /> Residential Status</span>
          <Select
            mode="multiple"
            showSearch={false}
            placeholder="All Statuses"
            maxTagCount={0}
            maxTagPlaceholder={(omitted) => omitted.length === 1 ? omitted[0].label : `${omitted.length} selected`}
            popupClassName="my-custom-dropdown"
            className={styles.filterSelect}
            value={filter.ResidentialStatus || []}
            onChange={(val) => updateFilter({ ResidentialStatus: val })}
            options={[
              { value: "Singapore Citizen", label: "Singapore Citizen" },
              { value: "Permanent Resident", label: "Permanent Resident" },
              { value: "Non-Resident", label: "Non-Resident" }
            ]}
            optionRender={(option) => (
              <div className={styles.customOption}>
                <Checkbox checked={filter.ResidentialStatus?.includes(option.value)} />
                <span style={{ marginLeft: '8px' }}>{option.label}</span>
              </div>
            )}
          />
        </div>

        <div className={`${styles.filterItem} ${styles.rangeItem}`}>
          <span className={styles.label}><WalletOutlined /> Balance Range ($)</span>
          <div className={styles.rangeGroup}>
            <Input
              type="number"
              min={0}
              placeholder="Min"
              className={`${styles.rangeInput} ${balanceRangeError ? styles.errorInput : ''}`}
              value={filter.MinBalance}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || parseFloat(value) >= 0) {
                  updateFilter({ MinBalance: value });
                }
              }}
              status={balanceRangeError ? "error" : ""}
            />
            <span className={styles.separator}>-</span>
            <Input
              type="number"
              min={0}
              placeholder="Max"
              className={`${styles.rangeInput} ${balanceRangeError ? styles.errorInput : ''}`}
              value={filter.MaxBalance}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || parseFloat(value) >= 0) {
                  updateFilter({ MaxBalance: value });
                }
              }}
              status={balanceRangeError ? "error" : ""}
            />
          </div>
          {balanceRangeError && (
            <span className={styles.errorText}>{balanceRangeError}</span>
          )}
        </div>

        <div className={`${styles.filterItem} ${styles.rangeItem}`}>
          <span className={styles.label}><CalendarOutlined /> Age Range</span>
          <div className={styles.rangeGroup}>
            <Input
              type="number"
              min={0}
              placeholder="Min"
              className={`${styles.rangeInput} ${ageRangeError ? styles.errorInput : ''}`}
              value={filter.MinAge}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || parseFloat(value) >= 0) {
                  updateFilter({ MinAge: value });
                }
              }}
              status={ageRangeError ? "error" : ""}
            />
            <span className={styles.separator}>-</span>
            <Input
              type="number"
              min={0}
              placeholder="Max"
              className={`${styles.rangeInput} ${ageRangeError ? styles.errorInput : ''}`}
              value={filter.MaxAge}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || parseFloat(value) >= 0) {
                  updateFilter({ MaxAge: value });
                }
              }}
              status={ageRangeError ? "error" : ""}
            />
          </div>
          {ageRangeError && (
            <span className={styles.errorText}>{ageRangeError}</span>
          )}
        </div>
      </div>

      <div className={styles.filterFooter}>
        <span className={styles.showingText}>Showing {dataCount || 0} of {total} accounts</span>
        {hasActiveFilters() && (
          <Button
            type="link"
            danger
            icon={<CloseOutlined />}
            className={styles.clearBtn}
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccountFilters;
