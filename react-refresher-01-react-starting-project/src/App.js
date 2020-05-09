import React, { useState } from "react";

import './App.css';
import GoalList from './components/goal-list/goal-list';
import NewGoal from './components/new-goal/new-goal';

const App = () => {

  const [courseGoals, setCourseGoals] = useState([
    { id:'cg1', text: 'Finish the Course' },
    { id:'cg2', text: 'Learn all about the Course Main Topic' },
    { id:'cg3', text: 'Help other students int the Course Q&A' }
  ]);

  const addNewGoalHandler = (newGoal) => {
    //setCourseGoals(courseGoals.concat(newGoal)); //can be used when the update operation only sets the value, without referring previous value
    setCourseGoals(prevCourseGoals => prevCourseGoals.concat(newGoal)); //recommended form when updating state operation depends on the previous state
  }

  return (
    <div className="course-goals">
      <h2>Course Goals</h2>
      <NewGoal onAddGoal={addNewGoalHandler}/>
      <GoalList goals={courseGoals}/>
    </div>
  );
};

export default App;
