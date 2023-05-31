import React, { PureComponent } from 'react'
import AgeComponents from './Age.components'
import "./style.css"
export default class AgeContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      day: '',
      month: '',
      year: '',
      dayOtp: '',
      monthOtp: '',
      yearOtp: '',
      errorMessages: {
        day: '',
        month: '',
        year:'',
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validate()) {
      const { day, month,year } = this.state;
      const currentDate = new Date();

      const currentYear=currentDate.getFullYear();
      let calculatedYear=currentYear - parseInt(year);

      const currentMonth = 1 + currentDate.getMonth();
      let calculatedMonth = currentMonth - parseInt(month);

      const currentDay = currentDate.getDate();
      let calculatedDay = currentDay - parseInt(day);
      if (calculatedDay < 0) {
        const prevMonthDays = this.getMonthDays(currentMonth - 1, currentYear);
        calculatedMonth--;
        calculatedDay += prevMonthDays;
      }

      if (calculatedMonth < 0) {
        calculatedYear--;
        calculatedMonth += 12;
      }

      this.setState({
        dayOtp: calculatedDay,
        monthOtp: calculatedMonth,
        yearOtp: calculatedYear,
      });
    }
  };

  validate = () => {
    const { day, month,year } = this.state;
    let isValid = true;

    if (!day) {
      this.setState((prevState) => ({
        errorMessages: {
          ...prevState.errorMessages,
          day: 'This field is required.',
        },
      }));
      isValid = false;
    } else {
      this.setState((prevState) => ({
        errorMessages: {
          ...prevState.errorMessages,
          day: '',
        },
      }));
    }

    if (!month) {
      this.setState((prevState) => ({
        errorMessages: {
          ...prevState.errorMessages,
          month: 'This field is required.',
        },
      }));
      isValid = false;
    } else if (month > 12) {
      this.setState((prevState) => ({
        errorMessages: {
          ...prevState.errorMessages,
          month: 'Must be a valid month.',
        },
      }));
      isValid = false;
    } else {
      this.setState((prevState) => ({
        errorMessages: {
          ...prevState.errorMessages,
          month: '',
        },
      }));
    }
    if (!year) {
      this.setState((prevState) => ({
        errorMessages: {
          ...prevState.errorMessages,
          year: 'This field is required.',
        },
      }));
      isValid = false;
    } else {
      this.setState((prevState) => ({
        errorMessages: {
          ...prevState.errorMessages,
          year: '',
        },
      }));
    }

    return isValid;
  };

  getMonthDays = (month,year) => {
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 1 && this.isLeapYear(year)) {
      return 29;
    }
    return months[month];
  };
  isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };
  render() {
    const { day, month, year, dayOtp, monthOtp, yearOtp, errorMessages } = this.state;
    return (
      <div >
        <AgeComponents 
        day={day}
        month={month}
        year={year}
        dayOtp={dayOtp}
        monthOtp={monthOtp}
        yearOtp={yearOtp}
        errorMessages={errorMessages}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        
        />
      </div>
    )
  }
}
