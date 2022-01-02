import React, { useContext, useEffect, useRef } from "react";
import BugContext from "../context/bug/bugContext";
import "./CSS Styling/Bugs.css";
import Countdown from "react-countdown";
import moment from "moment";

const Bugs = () => {
  const bugContext = useContext(BugContext);
  const { bugs, filtered, getBugs, filterBugs } = bugContext;
  const text = useRef("");
  console.log("text",text); //returns {current: input} - filterBugs input 

  useEffect(() => {
    getBugs();  //get all bugs from server
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filtered === null) {  //if no filter, filter text is empty 
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {  //filter bugs
      filterBugs(e.target.value);
    }
  };

  //render out single bug with delete and edit button
  const SingleBug = ({ bug }) => {
    const bugContext = useContext(BugContext);
    const { deleteBug, setCurrent, clearCurrent } = bugContext;
    const { _id, name, description, date } = bug; //take out the following params from bug model

    //execute this function when countdown timer ends
    const Completionist = () => (
      <span style={{ color: "red", fontWeight: "bold" }}>
        Please resolve, its been 3 days!
      </span>
    );

    //conditional render timer
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        return <Completionist />;
      } else {
        return (
          <div style={{ display: "flex" }}>
            <p>
              Days: {days} | Hours: {hours} | Miniutes: {minutes} | Seconds:{" "}
              {seconds}
            </p>
          </div>
        );
      }
    };

    //delete single bug
    const onDelete = () => {
      deleteBug(_id);
      clearCurrent();
    };

    return (
      //display name, description, and date
      <div className="bugs-list">
        <h3> Name: {name}</h3>
        <p> <span>Description:</span> {description}</p>
        <p>
          <span>Date Created:</span> {moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
        </p>
        <p>
          <span>Time until timer ends:{" "}</span>
          {
            <Countdown
              date={parseInt(moment(date).format("x")) + 259000000}
              renderer={renderer}
            />
          }
        </p>
        <div className="edit-resolve-button">
          {/* populates current bug data to form */}
          <button className="edit-button" onClick={() => setCurrent(bug)}>Edit</button>
          {/* deletes current bug */}
          <button className="complete-button" onClick={onDelete}>Resolve</button>
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
