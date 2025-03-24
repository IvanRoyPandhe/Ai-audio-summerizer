import React from 'react';
import './Pricing.css';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for trying out our services',
      features: [
        '30 minutes of recording per month',
        'Basic AI summarization',
        'Text export only',
        'Standard support'
      ],
      buttonText: 'Start Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '29',
      description: 'Ideal for students and educators',
      features: [
        'Unlimited recording time',
        'Advanced AI summarization',
        'Multiple export formats',
        'Priority support',
        'Custom organization',
        'Collaboration features'
      ],
      buttonText: 'Get Pro',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For institutions and organizations',
      features: [
        'Everything in Pro plan',
        'Custom AI model training',
        'API access',
        'Dedicated support',
        'Advanced analytics',
        'Custom integration'
      ],
      buttonText: 'Contact Us',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="pricing">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2>Simple Pricing</h2>
          <p>Choose the plan that fits your needs</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div 
              className={`pricing-card ${plan.popular ? 'popular' : ''}`} 
              key={index}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="period">/mo</span>}
                </div>
                <p className="plan-description">{plan.description}</p>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <span className="feature-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`plan-button ${plan.popular ? 'popular' : ''}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-faq">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I change plans later?</h4>
              <p>Yes, you can upgrade or downgrade your plan at any time.</p>
            </div>
            <div className="faq-item">
              <h4>Is there a free trial?</h4>
              <p>Yes, all paid plans come with a 14-day free trial.</p>
            </div>
            {/* Add more FAQ items as needed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
