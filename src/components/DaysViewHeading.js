import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { persianNumber, englishNumber } from '../utils/persian';
import { leftArrow, rightArrow } from '../utils/assets';
import jmoment from 'moment-jalaali';

let persianMonths = [
  'فروردين',
  'ارديبهشت',
  'خرداد',
  'تير',
  'مرداد',
  'شهريور',
  'مهر',
  'آبان',
  'آذر',
  'دي',
  'بهمن',
  'اسفند'
];
export default class Heading extends Component {
  static propTypes = {
    month: PropTypes.object.isRequired,
    isGregorian: PropTypes.bool
  };

  static contextTypes = {
    styles: PropTypes.object,
    nextMonth: PropTypes.func.isRequired,
    prevMonth: PropTypes.func.isRequired,
    setCalendarMode: PropTypes.func.isRequired
  };

  handleMonthClick(event) {
    const { setCalendarMode } = this.context;
    event.preventDefault();
    setCalendarMode('monthSelector');
  }
  render() {
    const { nextMonth, prevMonth } = this.context;
    const { month, styles } = this.props;
    let persianMonth = parseInt(englishNumber(jmoment(month).format('jM'))) - 1;
    return (
      <div className={styles.heading}>
        <button className={styles.title} onClick={this.handleMonthClick.bind(this)}>
          {this.props.isGregorian
            ? month.locale('en').format('MMMM YYYY')
            : persianMonths[persianMonth] + persianNumber(month.locale('fa').format('jYYYY'))}
        </button>
        {this.props.timePicker}
        <button
          type="button"
          title={this.props.isGregorian ? 'previous month' : 'ماه قبل'}
          className={styles.next}
          onClick={prevMonth}
          dangerouslySetInnerHTML={leftArrow}
        />
        <button
          type="button"
          title={this.props.isGregorian ? 'next month' : 'ماه بعد'}
          className={styles.prev}
          onClick={nextMonth}
          dangerouslySetInnerHTML={rightArrow}
        />
      </div>
    );
  }
}
