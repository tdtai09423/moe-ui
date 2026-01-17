import React, { useState, useEffect } from "react";
import { Input, Select, Button, Checkbox, DatePicker } from "antd";
import {
  SearchOutlined,
  BankOutlined,
  DesktopOutlined,
  CreditCardOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  DollarOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { courseService } from "../../../../services/courseService";
import styles from "./CourseFilter.module.scss";

const CourseFilter = ({ filter, updateFilter, total, dataCount }) => {
  const [providersList, setProvidersList] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await courseService.getProviders();
        setProvidersList(res || []);
      } catch (error) {
        console.error("Failed to load providers", error);
      }
    };
    fetchProviders();
  }, []);

  const hasActiveFilters = () => {
    return (
      (filter.SearchTerm && filter.SearchTerm.trim() !== "") ||
      (filter.Provider && filter.Provider.length > 0) ||
      (filter.ModeOfTraining && filter.ModeOfTraining.length > 0) ||
      (filter.Status && filter.Status.length > 0) ||
      (filter.PaymentType && filter.PaymentType.length > 0) ||
      (filter.BillingCycle && filter.BillingCycle.length > 0) ||
      filter.StartDate ||
      filter.EndDate ||
      filter.TotalFeeMin ||
      filter.TotalFeeMax
    );
  };

  const handleClearFilters = () => {
    updateFilter({
      SearchTerm: "",
      Provider: [],
      ModeOfTraining: [],
      Status: [],
      PaymentType: [],
      BillingCycle: [],
      StartDate: null,
      EndDate: null,
      TotalFeeMin: "",
      TotalFeeMax: "",
    });
  };

  const modes = ["Online", "In-Person", "Hybrid"];
  const paymentTypes = ["Recurring", "One-time"];
  const billingCycles = ["Monthly", "Quarterly", "Biannually", "Yearly"];
  const statuses = ["Active", "Inactive"];

  return (
    <div className={styles.filterCard}>
      <div className={styles.searchWrapper}>
        <Input
          prefix={<SearchOutlined style={{ color: "#94a3b8", fontSize: "18px", marginRight: "8px" }} />}
          placeholder="Search by course name, provider and course ID..."
          className={styles.mainSearch}
          value={filter.SearchTerm}
          onChange={(e) => updateFilter({ SearchTerm: e.target.value })}
        />
      </div>

      <div className={styles.filtersRow}>
        <div className={styles.filterItem}>
          <span className={styles.label}>
            <BankOutlined /> Provider
          </span>
          <Select
            mode="multiple"
            showSearch={false}
            placeholder="All Providers"
            maxTagCount={0}
            maxTagPlaceholder={(omitted) =>
              omitted.length === 1 ? omitted[0].label : `${omitted.length} selected`
            }
            popupClassName="my-custom-dropdown"
            className={styles.filterSelect}
            value={filter.Provider || []}
            onChange={(val) => updateFilter({ Provider: val })}
            options={providersList.map((p) => ({
              value: p.providerId,
              label: p.providerName,
            }))}
            optionRender={(option) => (
              <div className={styles.customOption}>
                <Checkbox checked={filter.Provider?.includes(option.value)} />
                <span style={{ marginLeft: "8px" }}>{option.label}</span>
              </div>
            )}
          />
        </div>

        <div className={styles.filterItem}>
          <span className={styles.label}>
            <DesktopOutlined /> Mode of Training
          </span>
          <Select
            mode="multiple"
            showSearch={false}
            placeholder="All Modes"
            maxTagCount={0}
            maxTagPlaceholder={(omitted) =>
              omitted.length === 1 ? omitted[0].label : `${omitted.length} selected`
            }
            popupClassName="my-custom-dropdown"
            className={styles.filterSelect}
            value={filter.ModeOfTraining || []}
            onChange={(val) => updateFilter({ ModeOfTraining: val })}
            options={modes.map((m) => ({ value: m, label: m }))}
            optionRender={(option) => (
              <div className={styles.customOption}>
                <Checkbox checked={filter.ModeOfTraining?.includes(option.value)} />
                <span style={{ marginLeft: "8px" }}>{option.label}</span>
              </div>
            )}
          />
        </div>

        <div className={styles.filterItem}>
          <span className={styles.label}>
            <CheckCircleOutlined /> Status
          </span>
          <Select
            mode="multiple"
            showSearch={false}
            placeholder="All Statuses"
            maxTagCount={0}
            maxTagPlaceholder={(omitted) =>
              omitted.length === 1 ? omitted[0].label : `${omitted.length} selected`
            }
            popupClassName="my-custom-dropdown"
            className={styles.filterSelect}
            value={filter.Status || []}
            onChange={(val) => updateFilter({ Status: val })}
            options={statuses.map((s) => ({ value: s, label: s }))}
            optionRender={(option) => (
              <div className={styles.customOption}>
                <Checkbox checked={filter.Status?.includes(option.value)} />
                <span style={{ marginLeft: "8px" }}>{option.label}</span>
              </div>
            )}
          />
        </div>

        <div className={styles.filterItem}>
          <span className={styles.label}>
            <CreditCardOutlined /> Payment Type
          </span>
          <Select
            mode="multiple"
            showSearch={false}
            placeholder="All Types"
            maxTagCount={0}
            maxTagPlaceholder={(omitted) =>
              omitted.length === 1 ? omitted[0].label : `${omitted.length} selected`
            }
            popupClassName="my-custom-dropdown"
            className={styles.filterSelect}
            value={filter.PaymentType || []}
            onChange={(val) => updateFilter({ PaymentType: val })}
            options={paymentTypes.map((p) => ({ value: p, label: p }))}
            optionRender={(option) => (
              <div className={styles.customOption}>
                <Checkbox checked={filter.PaymentType?.includes(option.value)} />
                <span style={{ marginLeft: "8px" }}>{option.label}</span>
              </div>
            )}
          />
        </div>

        <div className={styles.filterItem}>
          <span className={styles.label}>
            <SyncOutlined /> Billing Cycle
          </span>
          <Select
            mode="multiple"
            showSearch={false}
            placeholder="All Cycles"
            maxTagCount={0}
            maxTagPlaceholder={(omitted) =>
              omitted.length === 1 ? omitted[0].label : `${omitted.length} selected`
            }
            popupClassName="my-custom-dropdown"
            className={styles.filterSelect}
            value={filter.BillingCycle || []}
            onChange={(val) => updateFilter({ BillingCycle: val })}
            options={billingCycles.map((c) => ({ value: c, label: c }))}
            optionRender={(option) => (
              <div className={styles.customOption}>
                <Checkbox checked={filter.BillingCycle?.includes(option.value)} />
                <span style={{ marginLeft: "8px" }}>{option.label}</span>
              </div>
            )}
          />
        </div>

        <div className={styles.filterItem}>
          <span className={styles.label}>
            <CalendarOutlined /> Start Date
          </span>
          <DatePicker
            className={styles.datePicker}
            placeholder="Select date"
            format="DD/MM/YYYY"
            value={filter.StartDate}
            onChange={(date) => updateFilter({ StartDate: date })}
          />
        </div>

        <div className={styles.filterItem}>
          <span className={styles.label}>
            <CalendarOutlined /> End Date
          </span>
          <DatePicker
            className={styles.datePicker}
            placeholder="Select date"
            format="DD/MM/YYYY"
            value={filter.EndDate}
            onChange={(date) => updateFilter({ EndDate: date })}
          />
        </div>

        <div className={`${styles.filterItem} ${styles.rangeItem}`}>
          <span className={styles.label}>
            <DollarOutlined /> Fee Range ($)
          </span>
          <div className={styles.rangeGroup}>
            <Input
              type="number"
              min={0}
              placeholder="Min"
              className={styles.rangeInput}
              value={filter.TotalFeeMin}
              onChange={(e) => updateFilter({ TotalFeeMin: e.target.value })}
            />
            <span className={styles.separator}>-</span>
            <Input
              type="number"
              min={0}
              placeholder="Max"
              className={styles.rangeInput}
              value={filter.TotalFeeMax}
              onChange={(e) => updateFilter({ TotalFeeMax: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className={styles.filterFooter}>
        <span className={styles.showingText}>
          Showing {dataCount || 0} of {total} courses
        </span>
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

export default CourseFilter;
