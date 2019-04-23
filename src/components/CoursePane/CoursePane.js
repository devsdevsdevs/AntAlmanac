import React, {Component, Fragment} from "react";
import loadingGif from "./loading.mp4";
import querystring from "querystring";
import CourseRenderPane from "./CourseRenderPane";
import {IconButton} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";

class CoursePane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseData: [],
      loading: 2,
      termName: null,
      deptName: null,
      showDismissButton: true
    };
  }

  handleToggleDismissButton = () => {
    if (this.state.showDismissButton)
      this.setState({showDismissButton: false});
    else
      this.setState({showDismissButton: true});
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      this.state !== nextState ||
      nextProps.formData !== this.props.formData ||
      nextProps.view !== this.props.view
    );
  }

  static flatten(data) {
    return data.reduce((accumulator, school) => {
      accumulator.push(school);

      school.departments.forEach(dept => {
        accumulator.push(dept);

        dept.courses.forEach(course => {
          accumulator.push(course);
        });
      });

      return accumulator;
    }, []);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      dept,
      term,
      ge,
      courseNum,
      courseCode,
      instructor,
      units,
      endTime,
      startTime,
      coursesFull,
      building
    } = this.props.formData;

    if (prevProps.formData !== this.props.formData) {
      this.setState({loading: 1});
      //TODO: Name parity
      const params = {
        department: dept,
        term: term,
        GE: ge,
        courseNum: courseNum,
        courseCodes: courseCode,
        instructorName: instructor,
        units: units,
        endTime: endTime,
        startTime: startTime,
        fullCourses: coursesFull,
        building: building
      };
      const url =
        "https://2r7p77ujv6.execute-api.us-west-1.amazonaws.com/latest/api/websoc/?" +
        querystring.stringify(params);

      fetch(url)
        .then(resp => {
          return resp.json();
        })
        .then(jsonObj =>
          this.setState({
            courseData: CoursePane.flatten(jsonObj),
            loading: 2,
            termName: term,
            deptName: dept
          })
        );
    }
  }


  render() {
    const {loading, courseData} = this.state;

    if (loading === 2) {
      return (
        <Fragment>
          {this.state.showDismissButton ? <div
            style={{
              position: "sticky",
              width: 50,
              top: 0,
              zIndex: 3,
              marginBottom: 8
            }}
          >
            <IconButton
              onClick={this.props.onDismissSearchResults}
              style={{backgroundColor:"rgba(236, 236, 236, 1)"}}
            >
              <ArrowBack/>
            </IconButton>
          </div> : <Fragment/>}
          <CourseRenderPane
            onAddClass={this.props.onAddClass}
            onToggleDismissButton={this.handleToggleDismissButton}
            courseData={courseData}
            view={this.props.view}
            deptName={this.state.deptName}
            termName={this.state.termName}
          />
        </Fragment>
      );
    } else if (loading === 1) {
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <video autoPlay loop>
            <source src={loadingGif} type="video/mp4"/>
          </video>
        </div>
      );
    }
  }
}

export default CoursePane;
