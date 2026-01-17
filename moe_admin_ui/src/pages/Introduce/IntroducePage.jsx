import React, { useEffect } from 'react'; 
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined, UserOutlined, SafetyOutlined, CheckCircleFilled } from '@ant-design/icons';
import EduLogo from '../../assets/icon/EduLogo';
import IntroduceLayout from '../../layouts/IntroduceLayout';
import styles from './IntroducePage.module.scss';

// 2. Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const IntroducePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 50, 
    });


    document.documentElement.style.scrollSnapType = 'y mandatory';
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollSnapType = '';
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <IntroduceLayout>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        {/* data-aos="fade-down": Bay từ trên xuống */}
        <div className={styles.hero__badge} data-aos="fade-down">
          <EduLogo /> Education Account System
        </div>
        
        {/* data-aos="fade-up": Bay từ dưới lên */}
        <h1 className={styles.hero__title} data-aos="fade-up" data-aos-delay="200">
          Empowering Education for <br />
          <span className={styles.hero__title_highlight}>Every Singaporean</span>
        </h1>

        <p className={styles.hero__desc} data-aos="fade-up" data-aos-delay="400">
          A comprehensive education account system for Singapore Citizens aged 16-30. 
          Access your education funds, pay course fees, and track your learning journey.
        </p>

        <div className={styles.hero__actions} data-aos="zoom-in" data-aos-delay="600">
          <Button 
            type="primary" 
            size="large" 
            icon={<ArrowRightOutlined />} 
            className={styles.hero__btn_teal}
            onClick={() => navigate('/login')} 
          >
            Access e-Service Portal
          </Button>
          
          <Button 
            size="large" 
            icon={<UserOutlined />}
            className={styles.hero__btn_white}
            onClick={() => navigate('/admin/login')}
          >
            Admin Portal
          </Button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.steps}>
        <div className={styles.steps__header} data-aos="fade-up">
          <h2>How It Works</h2>
          <p>Simple, secure, and designed for your educational success</p>
        </div>
        
        <div className={styles.steps__grid}>
          {[
            { id: 1, title: 'Automatic Activation', desc: 'Your education account is automatically created when you turn 16.', aos: 'fade-right' },
            { id: 2, title: 'Receive Credits', desc: 'Periodic top-ups are credited to your account based on government schemes.', aos: 'fade-up' },
            { id: 3, title: 'Pay Course Fees', desc: 'Use your balance or other payment methods to pay for approved courses.', aos: 'fade-left' }
          ].map((item, index) => (
            <div 
              key={item.id} 
              className={styles.steps__card} 
              data-aos={item.aos}
              data-aos-delay={index * 200} 
            >
              <div className={styles.steps__number}>{item.id}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PORTALS */}
      <section className={styles.portals}>
        <div className={styles.portals__container}>
            
            {/* e-Service Portal - Bay từ trái sang */}
            <div 
              className={`${styles.portals__item} ${styles['portals__item--user']}`}
              data-aos="fade-right"
              data-aos-offset="200"
            >
              <div className={styles.portals__icon}><UserOutlined /></div>
              <h3 className={styles.portals__title}>e-Service Portal</h3>
              <p className={styles.portals__desc}>For account holders to view balance, transactions, and pay course fees.</p>
              <ul className={styles.portals__list}>
                <li><CheckCircleFilled className={styles.portals__check} /> View account balance</li>
                <li><CheckCircleFilled className={styles.portals__check} /> Pay course fees</li>
                <li><CheckCircleFilled className={styles.portals__check} /> Transaction history</li>
                <li><CheckCircleFilled className={styles.portals__check} /> Update profile</li>
              </ul>
              <span className={styles.portals__link} onClick={() => navigate('/login')} style={{cursor: 'pointer'}}>
                Access Portal <ArrowRightOutlined />
              </span>
            </div>

            {/* Admin Portal - Bay từ phải sang */}
            <div 
              className={`${styles.portals__item} ${styles['portals__item--admin']}`}
              data-aos="fade-left"
              data-aos-offset="200"
            >
              <div className={styles.portals__icon}><SafetyOutlined /></div>
              <h3 className={styles.portals__title}>Admin Portal</h3>
              <p className={styles.portals__desc}>For administrators to manage accounts, courses, and process fees.</p>
              <ul className={styles.portals__list}>
                <li><CheckCircleFilled className={styles.portals__check} /> Account management</li>
                <li><CheckCircleFilled className={styles.portals__check} /> Batch top-ups</li>
                <li><CheckCircleFilled className={styles.portals__check} /> Course management</li>
                <li><CheckCircleFilled className={styles.portals__check} /> Fee processing</li>
              </ul>
              <span className={styles.portals__link} onClick={() => navigate('/admin/login')} style={{cursor: 'pointer'}}>
                Access Portal <ArrowRightOutlined />
              </span>
            </div>

        </div>
      </section>
    </IntroduceLayout>
  );
};

export default IntroducePage;