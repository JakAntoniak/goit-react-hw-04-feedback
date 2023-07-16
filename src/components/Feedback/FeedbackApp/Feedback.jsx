import { useState } from 'react';
import { Statistics } from '../Statistics/Feedback-statistics';
import { Notification } from '../Notification/Notification';
import { Section } from '../Section/Section';
import PropTypes from 'prop-types';
import FeedbackOptions from '../FeedbackOptions/Buttons';

export const Feedback = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = e => {
    if (e.target.textContent === 'Good') {
      setGood(good + 1);
    }
    if (e.target.textContent === 'Neutral') {
      setNeutral(neutral + 1);
    }
    if (e.target.textContent === 'Bad') {
      setBad(bad + 1);
    }
  };

  const countTotalFeedback = () => {
    const total = good + neutral + bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const positivePercentage = Math.ceil((good / total) * 100);
    return positivePercentage ? positivePercentage : '-%';
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions onLeaveFeedback={onLeaveFeedback} />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};

Feedback.propTypes = {
  good: PropTypes.number,
  neutral: PropTypes.number,
  bad: PropTypes.number,
};
