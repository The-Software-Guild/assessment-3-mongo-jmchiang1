import React, { useContext, useEffect, useRef } from "react";
import BugContext from "../context/bug/bugContext";
import "./CSS Styling/Bugs.css";
import Countdown from "react-countdown";
import moment from 'moment'

const Bugs = ({ bug }) => {
  const bugContext = useContext(BugContext);
  const { bugs, filtered, getBugs } = bugContext;
  const { filterBugs } = bugContext;
  const text = useRef("");

  useEffect(() => {
    getBugs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterBugs(e.target.value);
    } else {
      // clearFilter();
    }
  };

  //render out single bug with delete and edit button
  const SingleBug = ({ bug }) => {
    const bugContext = useContext(BugContext);
    const { deleteBug, setCurrent, clearCurrent } = bugContext;
    const { _id, name, description, date } = bug; //take out the following params from bug model
    
    const Completionist = () => <span>Please resolve, its been 3 days!</span>;

    const onDelete = () => {
      deleteBug(_id);
      clearCurrent();
    };

    return (
      //display name, description, and date
      <div className="bugs-list">
        <h3>Name: {name}</h3>
        <p>Description: {description}</p>
        <p>Date Created: {moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
        <p>Time until timer ends: {<Countdown date={ parseInt(moment(date).format('x')) + 259000000}>
          <Completionist />
          </Countdown>}
        </p>
        <div>
          {/* populates current bug data to form */}
          <button onClick={() => setCurrent(bug)}>Edit</button>
          {/* deletes current bug */}
          <button onClick={onDelete}>Completed </button>
        </div>
        {/* <Timer/> */}
      </div>
    );
  };

  return (
    <>
      <form>
        <h2>Bugs Listed Here</h2>
        <input
          ref={text}
          type="text"
          placeholder="Filter Bugs"
          onChange={onChange}
        />
      </form>
      {/* if bug object exist and is not 0... */}
      {bugs && Object.keys(bugs).length !== 0 ? (
        <div>
          {/* if filterd, display filtered bugs, else display everything */}
          {filtered !== null
            ? filtered.map((bug) => <SingleBug key={bug._id} bug={bug} />)
            : bugs.map((bug) => <SingleBug key={bug._id} bug={bug} />)}
        </div>
      ) : (
        <h3>Please add bugs...</h3>
      )}
    </>
  );
};

export default Bugs;
