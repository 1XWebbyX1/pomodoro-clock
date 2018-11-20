var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} //REDUX___________________________________________________________________________ ;

var PLAY = 'PLAY';
var BREAK = 'BREAK';
var UPDATE = 'UPDATE';
var REFRESH = 'REFRESH';
var initialState = {
  breakLength: 5, //var for length of break
  sessionLength: 25, //var for length of session
  time: '25:00', //time-left
  play: true, //boolean to detect play or pause state
  break: false //boolean to detect break or session



  //action creaters_____________________________________________________________________
};function playState(play, time) {
  return {
    type: PLAY,
    play: play,
    time: time };

}

function breakState(breakk) {
  return {
    type: BREAK,
    break: breakk };

}

function updateLength(breakLength, sessionLength, time) {
  return {
    type: UPDATE,
    breakLength: breakLength,
    sessionLength: sessionLength,
    time: time };

}

function refresh() {
  return {
    type: REFRESH };

}
//-------------------------------------------------------------------------------------


//reducer for action creaters_____________________________________________________________
function reducer() {var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;var action = arguments[1];
  switch (action.type) {
    case PLAY:return { breakLength: state.breakLength, sessionLength: state.sessionLength, time: action.time, play: action.play, break: state.break };
    case BREAK:return { breakLength: state.breakLength, sessionLength: state.sessionLength, time: state.time, play: state.play, break: action.break };
    case UPDATE:return { breakLength: action.breakLength, sessionLength: action.sessionLength, time: action.time, play: state.play, break: state.break };
    case REFRESH:return { breakLength: 5, sessionLength: 25, time: "25:00", play: true, break: false };
    default:return state;}

}
//----------------------------------------------------------------------------------------------


//REdux store-------------------------------------------

var store = Redux.createStore(reducer);
//-------------------------------------------------------------------------------------------





//REACT__________________________________________


//Clock Component_____________________________________________
var Clock = function (_React$Component) {_inherits(Clock, _React$Component);function Clock() {_classCallCheck(this, Clock);return _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).apply(this, arguments));}_createClass(Clock, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', { 'class': 'clock' },
          React.createElement('p', { id: 'text' }, 'SESSION'),
          React.createElement('time', { id: 'time' }, this.props.time),
          React.createElement('i', { onClick: this.props.onClick, 'class': 'refresh fa fa-refresh', 'aria-hidden': 'true' })));


    } }]);return Clock;}(React.Component);

//-------------------------------------------------------------

//Label Component for session and break length______________________________________________
var Label = function (_React$Component2) {_inherits(Label, _React$Component2);function Label() {_classCallCheck(this, Label);return _possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).apply(this, arguments));}_createClass(Label, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', { id: this.props.id, 'class': 'label' },
          React.createElement('p', { 'class': 'head' }, this.props.text),
          React.createElement('hr', { 'class': 'line' }),
          React.createElement('p', { 'class': 'length' }, this.props.length),
          React.createElement('i', { id: 'inc', 'class': 'inc fa fa-plus', onClick: this.props.onClick, 'aria-hidden': 'true' }),
          React.createElement('i', { 'class': 'dec fa fa-minus', onClick: this.props.onClick, 'aria-hidden': 'true' })));


    } }]);return Label;}(React.Component);






//main component rendering everything together________________________________________________
var Back = function (_React$Component3) {_inherits(Back, _React$Component3);
  function Back(props) {_classCallCheck(this, Back);var _this3 = _possibleConstructorReturn(this, (Back.__proto__ || Object.getPrototypeOf(Back)).call(this,
    props));
    _this3.handleChange = _this3.handleChange.bind(_this3);
    _this3.handlePlay = _this3.handlePlay.bind(_this3);
    _this3.handleRefresh = _this3.handleRefresh.bind(_this3);
    _this3.switch = _this3.switch.bind(_this3);
    _this3.timer = _this3.timer.bind(_this3);
    _this3.genTime = _this3.genTime.bind(_this3);return _this3;
  }


  //generate time string from minutes and seconds----------------------
  _createClass(Back, [{ key: 'genTime', value: function genTime(minutes, seconds) {
      time = '' + minutes + ':' + seconds;
      return time;
    }
    //------------------------------------------------------------------





    //switch between session and break_____________________________________________________________________
  }, { key: 'switch', value: function _switch() {
      this.stopAnimation();
      clearInterval(this.timer); //clear current running interval

      this.props.mapBreakState(!this.props.break); //update break state with boolean negation

      //update text and time with break state
      this.props.break ? $('#text').text('BREAK') : $('#text').text('SESSION');
      time = this.props.break ? this.genTime(this.props.breakLength, "00") : this.genTime(this.props.sessionLength, "00");


      this.props.mapPlayState(this.props.play, time); //update time state
      this.start(); //setting an interval again with new time
    }
    //------------------------------------------------------------------------------------------------------







    //the timer function responsible for time left component __________________________________________________
    //called every second
  }, { key: 'timer', value: function timer() {
      seconds = Number(this.props.time.split(':')[1]); //get current time in seconds and minutes
      minutes = Number(this.props.time.split(':')[0]);
      regex = /^\d{2}$/; //regex to check double digit



      //if timer reaches end -- switch
      if (minutes == 0 && seconds == 0) {
        this.switch();
      }
      //--------


      //if timer is not ending --update seconds and minutes
      if (seconds != 0) {
        seconds -= 1;
      } else {
        seconds = 59; //to create a cycle starting from 59
        minutes = minutes - 1; // minutes will be updated when seconds come to 0
      }


      //update time string depending on double or single digit seconds__
      if (regex.test(seconds)) {
        //ternary expression to check if minutes are single or double digit
        time = regex.test(minutes) ? this.genTime(minutes, seconds) : this.genTime('0' + minutes, seconds);
      } else
      {
        //ternary expression to check if minutes are single or double digit
        time = regex.test(minutes) ? this.genTime(minutes, '0' + seconds) : this.genTime('0' + minutes, '0' + seconds);
      }
      //-----------------------


      //update the time state
      this.props.mapPlayState(this.props.play, time);




      this.animate = function () {
        $('.clock').css('border', '4px solid #013235');
        $('.clock').css('box-shadow', '0px 3px 5px #FF6D00 inset');
        if (minutes == 0 && !this.props.play) {
          $('#time').addClass('beat-animation');
        }
      };


      this.stopAnimation = function () {
        $('.clock').css('border', '4px solid #0d252d');
        $('.clock').css('box-shadow', '0px 3px 5px rgba(244, 244, 244, 0.3) inset');
        $('#time').removeClass('beat-animation');
      };


      //animation when time is less than 10 minutes
      if (!regex.test(minutes)) {
        this.animate();
      } else
      {
        this.stopAnimation();
      }
    }
    //--------------------------------------------------------------------------------------------------








    //handle Play button click___________________________________________________________________
  }, { key: 'handlePlay', value: function handlePlay() {
      // toggle play pause button
      $('#play').toggleClass('fa-play');
      $('#play').toggleClass('fa-pause');
      this.props.mapPlayState(!this.props.play, this.props.time); //toogle play-pause boolean on click 

      this.animate;
      this.stopAnimation;

      //set up an interval for timer function 
      if (this.props.play) {
        this.start = setInterval(function () {
          this.timer();
        }.bind(this), 1000); //update seconds every second
      } else
      {
        clearInterval(this.start); //if pause state -- clear the interval and stop animation
        $('#time').removeClass('beat-animation');
      }
    }

    //---------------------------------------------------------------------------------------------------



    //handle change of session or break length on label___________________________________________________________
  }, { key: 'handleChange', value: function handleChange(e) {
      targetId = e.target.id; //get the id of icon that was clicked
      parentId = e.target.parentElement.id; // get the id of its parent (session/ break)
      currentBr = this.props.breakLength; //get current length of break and session
      currentSe = this.props.sessionLength;

      //active only when clock is paused______________________________________________________________-
      if (this.props.play) {
        //if id is for increment_________________________________________________________________
        if (targetId == 'inc') {
          if (parentId == 'session-label') {
            //increment only if length is between 0 and 60
            if (currentSe >= 0 && currentSe < 60) {
              //update session time only when not on break
              time = !this.props.break ? this.genTime(this.props.sessionLength + 1, '00') : this.props.time;
              // send update to store
              this.props.mapUpdate(this.props.breakLength, this.props.sessionLength + 1, time);
            }
          } else
          {// for break-label
            if (currentBr >= 0 && currentBr < 60) {
              // update time on break and change in break length
              time = !this.props.break ? this.props.time : this.genTime(this.props.breakLength + 1, '00');
              this.props.mapUpdate(this.props.breakLength + 1, this.props.sessionLength, time);
            }
          }
        } else {
          if (parentId == 'session-label') {
            //decrement only if length is between 0 and 60
            if (currentSe > 0 && currentSe <= 60) {
              //update time only if not on break
              time = !this.props.break ? this.genTime(this.props.sessionLength - 1, '00') : this.props.time;
              // update time witch change in session length
              this.props.mapUpdate(this.props.breakLength, this.props.sessionLength - 1, time);
            }
          } else
          {//for break-label
            if (currentBr > 0 && currentBr <= 60) {
              //update time on break and change in break length
              time = !this.props.break ? this.props.time : this.genTime(this.props.breakLength - 1, '00');
              this.props.mapUpdate(this.props.breakLength - 1, this.props.sessionLength, time);
            }
          }
        }
      }
    }



    //refresh to initial state___________________________________________________
  }, { key: 'handleRefresh', value: function handleRefresh() {
      $('#text').text('SESSION');
      $('.fa-pause').removeClass('fa-pause').addClass('fa-play', 200);
      this.stopAnimation();
      $('.clock').css('border', '4px solid #0d252d');
      clearInterval(this.start);
      this.props.reload();

    }
    //----------------------------------------------------------------------------
  }, { key: 'render', value: function render()

    {
      return (
        React.createElement('div', { 'class': 'back' },
          React.createElement('i', { id: 'play', 'class': 'fa fa-play', 'aria-hidden': 'true', onClick: this.handlePlay }),
          React.createElement(Label, { id: 'session-label', text: 'SESSION LENGTH', length: this.props.sessionLength, onClick: this.handleChange }),
          React.createElement(Label, { id: 'break-label', text: 'BREAK LENGTH', length: this.props.breakLength, onClick: this.handleChange }),
          React.createElement(Clock, { time: this.props.time, onClick: this.handleRefresh })));


    } }]);return Back;}(React.Component);



//mapping props from Redux state store___________________________________________
var mapStateToProps = function mapStateToProps(state) {
  return {
    breakLength: state.breakLength,
    sessionLength: state.sessionLength,
    time: state.time,
    play: state.play,
    break: state.break };

};
//---------------------------------------------------------------------------------

//dispatch changes to redux_____________________________________________________________
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    mapPlayState: function mapPlayState(play, time) {
      dispatch(playState(play, time));
    },
    mapBreakState: function mapBreakState(breakk) {
      dispatch(breakState(breakk));
    },
    mapUpdate: function mapUpdate(breakLength, sessionLength, time) {
      dispatch(updateLength(breakLength, sessionLength, time));
    },
    reload: function reload() {console.log('m');
      dispatch(refresh());
    } };

};
//------------------------------------------------------------------------------------------

var connect = ReactRedux.connect;

var Container = connect(mapStateToProps, mapDispatchToProps)(Back);

//create a provider --------
var Provider = ReactRedux.Provider;var

AppWrapper = function (_React$Component4) {_inherits(AppWrapper, _React$Component4);function AppWrapper() {_classCallCheck(this, AppWrapper);return _possibleConstructorReturn(this, (AppWrapper.__proto__ || Object.getPrototypeOf(AppWrapper)).apply(this, arguments));}_createClass(AppWrapper, [{ key: 'render', value: function render()
    {
      return (
        React.createElement(Provider, { store: store },
          React.createElement(Container, null)));


    } }]);return AppWrapper;}(React.Component);





//render the app________________________________________________
ReactDOM.render(React.createElement(AppWrapper, null), document.getElementById('app'));