import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getById, add } from '../actions/MealActions';
import ImageGallery from '../components/ImageGallery';
import MealPageNav from '../components/MealPageNav';
import MealPayment from '../components/MealPayment';
import ShowHideText from '../components/ShowHideText';
import MealMenu from '../components/MealMenu';
import AttendeesList from '../components/AttendeesList';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import MealMap from '../components/MealMap';

class MealDetails extends Component {
  state = { displayReviewForm: 'hide' };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getById(id);
  }

  onOccuranceRegistration = registration => {
   
    if (this.props.loggedInUser) {
      const { loggedInUser } = this.props;
      const meal = { ...this.props.meal };
      let occurrence = meal.occurrences.find(current => current.id === registration.id);
     
      console.log('meal', meal);
      console.log('occurrence', occurrence);
      console.log('meal.capacity', meal.capacity);
      console.log('parseInt(registration.numOfAttendees)', parseInt(registration.numOfAttendees));

      if (occurrence && meal.capacity >= occurrence.total + parseInt(registration.numOfAttendees)) {
      
        occurrence.attendees = [...occurrence.attendees, { _id: loggedInUser._id, fullName: loggedInUser.fullName, imgUrl: loggedInUser.imgUrl, numOfAttendees: registration.numOfAttendees }];
        occurrence.total = occurrence.total + registration.numOfAttendees;
        meal.occurrences = [...this.props.meal.occurrences, occurrence];
        this.props.add(meal);
      }
    }
  };

  onDisplayReviewForm = ev => {
    ev.preventDefault();
    if (this.props.loggedInUser) this.setState({ displayReviewForm: '' });
  };

  onCloseReviewForm = ev => {
    ev.preventDefault();
    this.setState({ displayReviewForm: 'hide' });
  };

  onSaveReviewForm = async review => {
    this.setState({ displayReviewForm: 'hide' });

    if (this.props.loggedInUser) {
      const { loggedInUser } = this.props;
      const meal = { ...this.props.meal };

      const newReview = {
        byUser: { _id: loggedInUser._id, fullName: loggedInUser.fullName, imgUrl: loggedInUser.imgUrl },
        txt: review.txt,
        rate: review.rate,
        at: Date.now(),
      };

      meal.reviews = [...meal.reviews, newReview];
      await this.props.add(meal);
    }
  };

  render() {
    const meal = this.props.meal;
    return (
      <div className='container meal-details-page-container'>
        {meal && (
          <React.Fragment>
            <div className='page-title'>
              <h2>{meal.title}</h2>
            </div>
            <ImageGallery images={meal.imgUrls}></ImageGallery>
            <div className='meal-details-container flex'>
              <div className='left-box flex-shrink-70'>
                <MealPageNav meal={meal}></MealPageNav>
                <h3>A word about the experience</h3>
                <ShowHideText text={meal.description} showRows={3}></ShowHideText>
                <h3 id='menu'>Our menu</h3>
                <MealMenu menu={meal.menu} onSelectedMenu={this.onSelectedMenu} />
                <h3>Meet the other guests</h3>
                <AttendeesList attendees={meal.attendees}></AttendeesList>
                <div className='reviews-title-wrapper'>
                  <h3 id='reviews'>Reviews</h3>
                  <a className='btn-round' title='Review Us' href='' onClick={this.onDisplayReviewForm}>
                    <i className='icon-medium fas fa-plus'></i>
                  </a>
                </div>
                <div className={this.state.displayReviewForm}>
                  <ReviewForm onSaveReviewForm={this.onSaveReviewForm} onCloseReviewForm={this.onCloseReviewForm}></ReviewForm>
                </div>
                {this.props.meal.reviews && <ReviewList reviews={this.props.meal.reviews}></ReviewList>}
                <h3 id='location'>Location</h3>
                <MealMap location={meal.location}></MealMap>
              </div>
              <div className='right-box flex-shrink-30'>
                <MealPayment loggedInUser={this.props.loggedInUser} meal={meal} onOccuranceRegistration={this.onOccuranceRegistration}></MealPayment>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
  meal: state.meal.selectedMeal,
  
  

});

const mapDispatchToProps = {
  getById,
  add,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealDetails);
