import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import { load } from '../actions/MealActions';
import { setFilter } from '../actions/FlterActions'
import DateFnsUtils from "@date-io/date-fns";

import UserMealList from '../components/UserMealList'
import Calander from '../components/Calander'

class UserDetails extends Component {
  //this page will display a calander. each date with a meal will appear with a special icon
  //when clicking on a specific date, a table will appear (below the calander) with all the meals of the chosen date
  //the table will show all attended meals and hosted meals of the chosen day
  //for any meal of which the current user is a host - the table will enable view, edit (remove???)
  //for any meal of which the current user is an attendee - the table will enable view and remove

  componentDidMount() {
    this.props.setFilter({ ...this.props.filter, userId: this.props.match.params.id })
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.filter) !== JSON.stringify(this.props.filter)) {
      this.loadMeals();
    }
  }

  loadMeals() {
    this.props.load(this.props.filter);
  }

  onDateChange = (newDate) => {
    this.props.setFilter({ ...this.props.filter, at: Date.parse(newDate) })
  }

  filterMealsForCurrUser = () => {
    const { id } = this.props.match.params

    const hostMeals = this.props.meals.filter(meal => meal.hostedBy._id === id)

    let attendedMeals = [];
    for (let i = 0; i < this.props.meals.length; i++) {
      for (let j = 0; j < this.props.meals[i].attendees.length; j++) {
        if (this.props.meals[i].attendees[j]._id === id) {
          attendedMeals.push(this.props.meals[i])
        }
      }
    }
    return { hostMeals, attendedMeals };
  }

  mealsToShow = () => {
    const { id } = this.props.match.params
    const attended = [];
    const host = [];
    this.props.meals.forEach(meal => {
      if (meal.hostedBy.id === id) {
        host.push(meal);
      } else {
        attended.push(meal);
      }
    })
    return { host, attended }
  }

  onCreateMeal = () => {
    this.props.history.push('/meal/edit');
  }

  render() {
    const { host, attended } = this.mealsToShow();
    return <div>
      UserDetails
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Calander date={this.props.filter.at} onDateChange={this.onDateChange}></Calander>
      </MuiPickersUtilsProvider>
      <button className="create-new-meal btn" onClick={this.onCreateMeal}>CREATE MEAL</button>
      {this.props.meals.length > 0 && <UserMealList attended={attended} host={host}></UserMealList>}
    </div>
  }
}

const mapStateToProps = state => ({
  meals: state.meal.meals,
  filter: state.filter.filter
});

const mapDispatchToProps = {
  load,
  setFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
